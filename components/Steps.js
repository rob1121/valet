import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import {VALET_ON_THE_WAY, ARRIVED_AT_THE_GARAGE, VEHICLE_ON_THE_WAY, REQUEST_COMPLETED} from '../constants';
import ValetOnTheWay from './delivery/ValetOnTheWay';
import ArrivedAtGarage from './delivery/ArrivedAtGarage';
import VehicleOnTheWay from './pickup/VehicleOnTheWay';
import RequestCompleted from './pickup/RequestCompleted';

class Steps extends Component 
{
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._taskStatus()}
      </View>
    );
  }

  _taskStatus() {
    let retVal = <Text>No Active Task</Text>;
    
    switch(this.props.car_assign.active_task.status_id) {
      case VALET_ON_THE_WAY: {
        return <ValetOnTheWay />;
      }
      case ARRIVED_AT_THE_GARAGE: {
        return <ArrivedAtGarage />;
      }
      case VEHICLE_ON_THE_WAY: {
        return <VehicleOnTheWay />;
      }
      case REQUEST_COMPLETED: {
        return <RequestCompleted />;
      }
    }
    
    return retVal;
  }
}
const mapStateToProps = ({ car_assign }) => ({ car_assign });

export default connect(mapStateToProps)(Steps);
