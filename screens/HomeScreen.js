import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {Notifications} from 'expo';
import { setActiveScreen, logoutUser, assignCars} from '../actions';
import {HOME_NAV, CAR_ASSIGN_URL} from '../constants';
import Footer from '../components/Footer';
import CarAvailable from '../components/CarAvailable';
import Steps from '../components/Steps';

class HomeScreen extends Component 
{
  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(() => this._notifListener());
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress', 
      () => {
        this.props.setActiveScreen(HOME_NAV);
        return true;
      }
    );

    this._fetchCarsAssign();
    this.props.setActiveScreen(HOME_NAV);
  }

  _notifListener() {
    axios.post(CAR_ASSIGN_URL, this.props.user).then(({ data }) => {
      this.props.assignCars(data);
    }).catch((error) => { console.error(error); });
  }

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  _fetchCarsAssign() {
    axios.post(CAR_ASSIGN_URL, this.props.user).then(({data}) => {
        this.props.assignCars(data);
    }).catch((error) => { console.error(error); });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.car_assign.has_active_task ? <Steps /> : <CarAvailable />}
        <Footer />
      </View>
    );
  }
}
const mapStateToProps = ({ nav, car_assign, user }) => ({ nav, car_assign, user });

export default connect(mapStateToProps, { setActiveScreen, logoutUser, assignCars})(HomeScreen);
