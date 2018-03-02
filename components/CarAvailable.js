import React, { Component } from 'react';
import { View, ScrollView, Alert, RefreshControl } from 'react-native';
import { Text, List, ListItem, Header } from 'react-native-elements';
import axios from 'axios';
import { filter, toUpper, isEmpty, map } from 'lodash';
import {PARKING_STATUS_UPDATE_URL, CAR_ASSIGN_URL} from '../constants';
import {assignCars} from '../actions';
import { connect } from 'react-redux';
import RampLocation from '../components/RampLocation';

class CarAvailable extends Component 
{
  state = {
    refreshing: false,
    location: '',
  }

  _selectTask(task) {
    Alert.alert(
      'Task Confirmation',
      'Are you sure you want to proceed to this task?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this._updateStatus(task)},
      ]
    );
  }

  _fetchCarsAssign() {
    this.setState({ refreshing: true});
    axios.post(CAR_ASSIGN_URL, this.props.user).then(({ data }) => {
      this.props.assignCars(data);
      this.setState({ refreshing: false });
    }).catch((error) => { console.error(error); });
  }

  _updateStatus(task) {
    const {user} = this.props;

    axios.post(PARKING_STATUS_UPDATE_URL, {task, user}).then(({data}) => {
      this.props.assignCars(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  _listItem(carsAssign) {
    const listItems = map(carsAssign, (task, i) => {
      return (<ListItem
        key={i}
        title={`#${task.ticketno}: ${task.opt}`}
        subtitle={task.status_title}
        leftIcon={{ name: 'directions-car' }}
        onPress={() => this._selectTask(task)}
      />);
    });

    return (<List containerStyle={styles.listContainerStyle}>
      {listItems}
    </List>);
  }

  render() {
    const { emptyTaskContainer} = styles;
    const { car_assign, nav, user} = this.props;
    let carsAssign = car_assign.task_list;

    if(this.props.user.type == 'ramp') {
      carsAssign = filter(carsAssign, (task) => {
        return task.location.contains(this.state.location);
      });
    }

    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{ text: toUpper(`Task for ${user.name}`), style: { color: '#fff' } }}
        />
        <ScrollView 
          style={{marginTop: 20, marginBottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._fetchCarsAssign()}
            />
          }
        >
          {this.props.user.type == 'ramp' && <View style={{margin: 15}}>
            <RampLocation 
              value={this.state.location} 
              onChange={(val) => this.props.setState({...this.state, location: val})}
            />
          </View>}
          {!isEmpty(carsAssign) 
              ? this._listItem(carsAssign) 
              : <Text style={emptyTaskContainer}>No record found!.</Text>}
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

const mapStateToProps = ({ user, nav, car_assign }) => ({ user, nav, car_assign });

export default connect(mapStateToProps, {assignCars})(CarAvailable)