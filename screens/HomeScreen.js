import React, { Component } from 'react';
import { Alert, View, Picker, ScrollView } from 'react-native';
import { Text, Divider, Icon, List, ListItem } from 'react-native-elements';
import { findIndex } from 'lodash';
import axios from 'axios';
import { map, size, filter, toLower, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { 
  setCarSelectedIndex, 
  assignCars,
  setSelectedFilter, 
  setFilters 
} from '../actions';

import { 
  CAR_ASSIGN_URL,
  CAR_ASSIGN_FILTER_URL,
  ALL_INDEX,
} from '../constants';

class HomeScreen extends Component 
{
  componentDidMount() {
    this.props.setSelectedFilter(ALL_INDEX);
    this._fetchFilters();
    this._fetchCarsAssign();
  }

  _fetchCarsAssign() {
    axios.get(CAR_ASSIGN_URL, { params: { driver: this.props.user.name } })
      .then(({ data }) => {this.props.assignCars(data.data);})
      .catch((error) => {console.error(error);});
  }

  _fetchFilters() {
    axios.get(CAR_ASSIGN_FILTER_URL)
      .then(({ data }) => {this.props.setFilters(data);})
      .catch((error) => {console.error(error);});
  }

  _gotoSelectedCarAssign(idx) {
    this.props.setCarSelectedIndex(idx);
    this.props.navigation.navigate('Car');
  }

  _listItem(carsAssign) {
    const { filters } = this.props.car_assign_filter;
    const listItems = map(carsAssign, (task, i) => {
      const index = findIndex(filters, (f) => f.value === task.status_id);
      const label = index === -1 ? '-' : filters[index].label;

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
    const { car_assign_filter, setSelectedFilter, car_assign, navigation} = this.props;
    const { selected_filter, filters } = car_assign_filter;
    const carsAssign = filter(car_assign.cars, (assignment) => {
      if (selected_filter === ALL_INDEX) return true; //select all
      return assignment.status_id === selected_filter;
    });

    return (
      <View>
        <Header 
          title='HOME' 
          navigation={navigation}
        />

        <View>
          <Text h6>Filter:</Text>
          <Picker 
            onValueChange={(val) => setSelectedFilter(val)}
            selectedValue={selected_filter}
          >
            {
              map(filters, (filter, idx) => {
                return <Picker.Item key={idx} label={filter.label} value={filter.value} />
              })
            }
            <Picker.Item key={size(filters)} label='ALL' value={ALL_INDEX} />
          </Picker>

          <Divider style={{ marginBottom: 20 }} />
          <Text style={{ marginBottom: 20 }}>Task for {this.props.user.name}:</Text>
          <ScrollView>
          {
            !isEmpty(carsAssign) 
              ? this._listItem(carsAssign) 
              : <Text style={emptyTaskContainer}>No record found!.</Text>
          }
          </ScrollView>
        </View>
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

const mapStateToProps = ({ user, car_assign, car_assign_filter }) => ({ user, car_assign, car_assign_filter });

export default connect(mapStateToProps, { setCarSelectedIndex, assignCars, setSelectedFilter, setFilters })(HomeScreen)