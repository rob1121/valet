import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { findIndex } from 'lodash';
import axios from 'axios';
import { isEmpty, map, filter } from 'lodash';
import { connect } from 'react-redux';
import { 
  setFilters, 
  assignCars,
} from '../actions';

import { 
  CAR_ASSIGN_URL,
  ALL_INDEX,
  CAR_ASSIGN_FILTER_URL,
} from '../constants';

class CarAvailable extends Component 
{
  componentWillMount() {
    this._fetchCarFilter()
    this._fetchCarsAssign();
  }

  _fetchCarFilter() {
  axios.get(CAR_ASSIGN_FILTER_URL)
    .then(({ data }) => { this.props.setFilters(data); })
    .catch((error) => {console.error(error);});
  }

  _fetchCarsAssign() {
    axios.post(CAR_ASSIGN_URL, { driver: this.props.user.name })
      .then(({ data }) => { this.props.assignCars(data); })
      .catch((error) => {console.error(error);});
  }

  _listItem(carsAssign) {
    const listItems = map(carsAssign, (task, i) => {
      const label = this.props.car_assign_filter[task.status_id];
      
      return (<ListItem
          key={i}
          title={`#${task.ticketno}: ${task.opt}`}
          subtitle={label}
          leftIcon={{ name: 'directions-car' }}
          onPress={() => this.props.nav.navigate('Car')}
        />);
    });

    return (<List containerStyle={styles.listContainerStyle}>
      {listItems}
    </List>);
  }

  render() {
    const { emptyTaskContainer} = styles;
    const { car_assign, nav, user} = this.props;

    return (
      <View style={{padding: 5}}>
          <Text style={{ marginBottom: 20 }} h6>Task for {this.props.user.name}:</Text>
          <ScrollView>
          {
            !isEmpty(car_assign.cars) 
              ? this._listItem(car_assign.cars) 
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

export default connect(mapStateToProps, { setFilters, assignCars })(CarAvailable)