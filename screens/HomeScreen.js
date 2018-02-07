import React, { Component } from 'react';
import { Alert, View, Picker, ScrollView } from 'react-native';
import { Text, Divider, Icon, List, ListItem } from 'react-native-elements';
import axios from 'axios';
import { map, size, filter, toLower, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { 
  setCarSelectedIndex, 
  assignCars, 
  setStatus, 
  setSelectedFilter, 
  setFilters 
} from '../actions';

import { 
  CAR_ASSIGN_URL,
  CAR_ASSIGN_FILTER_URL,
  MAIN_COLOR 
} from '../constants';

class HomeScreen extends Component 
{
  componentDidMount() {
    this.props.setSelectedFilter('');
    this._fetchFilters();
    this._fetchCarsAssign();
  }

  _fetchCarsAssign() {
    axios.get(CAR_ASSIGN_URL, { params: { driver: 'Rafael Rodriguez' } })
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
    return (<List containerStyle={{ marginTop: 0, marginBottom: 20 }}>
      {
        map(carsAssign, (task, i) => (
          <ListItem
            key={i}
            title={`#${task.ticketno}: ${task.opt}`}
            subtitle={task.status}
            leftIcon={{ name: 'directions-car' }}
            onPress={() => this._gotoSelectedCarAssign(i)}
          />
        ))
      }
    </List>);
  }

  render() {
    const selectedFilter = toLower(this.props.car_assign_filter.selected_filter);
    const carsAssign = filter(this.props.car_assign.cars, (assignment) => {
      return toLower(assignment.status).contains(selectedFilter);
    });

    return (
      <View>
        <Header 
          title='HOME' 
          navigation={this.props.navigation}
        />

        <View>
          <Text h6>Filter:</Text>
          <Picker 
            onValueChange={(val) => this.props.setSelectedFilter(val)}
            selectedValue={this.props.car_assign_filter.selected_filter}
          >
            {
              map(this.props.car_assign_filter.filters, (filter, idx) => {
                return <Picker.Item key={idx} label={filter} value={filter} />
              })
            }
            <Picker.Item key={size(this.props.car_assign_filter.filters)} label='ALL' value='' />
          </Picker>

          <Divider style={{ backgroundColor: MAIN_COLOR }} />
          <ScrollView>
          {
            !isEmpty(carsAssign)
              ? this._listItem(carsAssign) 
              : <Text style={{ marginTop: 20, color: '#000', textAlign: 'center' }}>No record found!.</Text>
          }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ user, car_assign, car_assign_filter }) => ({ user, car_assign, car_assign_filter });

export default connect(mapStateToProps, { setCarSelectedIndex, assignCars, setStatus, setSelectedFilter, setFilters })(HomeScreen)