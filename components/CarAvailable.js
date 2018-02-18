import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { findIndex } from 'lodash';
import axios from 'axios';
import { isEmpty, map, filter } from 'lodash';
import { connect } from 'react-redux';
import { 
  setCarSelectedIndex, 
  assignCars,
} from '../actions';

import { 
  CAR_ASSIGN_URL,
  CAR_ASSIGN_FILTER_URL,
  ALL_INDEX,
} from '../constants';

class CarAvailable extends Component 
{
  componentDidMount() {
    this._fetchCarsAssign();
  }

  _fetchCarsAssign() {
    axios.get(CAR_ASSIGN_URL, { params: { driver: this.props.user.name } })
      .then(({ data }) => { this.props.assignCars(data); })
      .catch((error) => {console.error(error);});
  }

  _gotoSelectedCarAssign(idx) {
    this.props.setCarSelectedIndex(idx);
    this.props.nav.navigate('Car');
  }

  _listItem(carsAssign) {
    const { filters } = this.props.car_assign_filter;
    const listItems = map(carsAssign, (task, i) => {
      const index = findIndex(filters.all, (f) => f.value === task.status_id);
      const label = index === -1 ? '-' : filters.all[index].label;

      return (<ListItem
          key={i}
          title={`#${task.ticketno}: ${task.opt}`}
          subtitle={label}
          leftIcon={{ name: 'directions-car' }}
          onPress={() => this._gotoSelectedCarAssign(i)}
        />);
    });

    return (<List containerStyle={styles.listContainerStyle}>
      {listItems}
    </List>);
  }

  render() {
    const { emptyTaskContainer} = styles;
    const { car_assign_filter, car_assign, nav, user} = this.props;
    const { selected_filter, filters } = car_assign_filter;
    const carsAssign = filter(car_assign.cars, (assignment) => {
      if (selected_filter === ALL_INDEX) return true; //select all
      return assignment.status_id === selected_filter;
    });

    return (
      <View style={{padding: 5}}>
          <Text style={{ marginBottom: 20 }} h6>Task for {this.props.user.name}:</Text>
          <ScrollView>
          {
            !isEmpty(carsAssign) 
              ? this._listItem(carsAssign) 
              : <Text style={emptyTaskContainer}>No record found!.</Text>
          }
          </ScrollView>
      </View>
    );
  }
}

const styles = {
  listContainerStyle: { 
    marginTop: 0, 
    marginBottom: 20 
  },

  emptyTaskContainer: { 
    marginTop: 20, 
    color: '#000', 
    textAlign: 'center' 
  },
};

const mapStateToProps = ({ user, nav, car_assign, car_assign_filter }) => ({ user, nav, car_assign, car_assign_filter });

export default connect(mapStateToProps, { setCarSelectedIndex, assignCars })(CarAvailable)