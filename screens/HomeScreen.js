import React, { Component } from 'react';
import { View, BackHandler, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import {connect} from 'react-redux';
import { findIndex, isEmpty, filter} from 'lodash';
import axios from 'axios';
import { setCarSelectedIndex, setActiveScreen, logoutUser, assignCars} from '../actions';
import {HOME_NAV, LOGIN_NAV, CAR_ASSIGN_URL} from '../constants';
import Footer from '../components/Footer';
import CarAvailable from '../components/CarAvailable';
import RampLocation from '../components/RampLocation';
import CarScreen from './CarScreen';
class HomeScreen extends Component 
{
  componentWillMount() {
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

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  _fetchCarsAssign() {
    axios.post(CAR_ASSIGN_URL, { driver: this.props.user.name }).then(({data}) => {
      const index = findIndex(data, (c) => (c.active == 1));
      if(index > -1) {
        this.props.setCarSelectedIndex(index);
      } else {
        this.props.assignCars(data);
        console.log(data);
      } 
    }).catch((error) => { console.error(error); });
  }

  render() {
    let Body = (<Text>No Record  Found...</Text>);
           
    // if (this.props.car_assign.selected_index > -1) {
      // Body = this.props.car_assign.selected_index > -1 ? <CarScreen /> : <CarAvailable />;
    // }
    return (
      <View style={{ flex: 1 }}>
        {Body}
        <Footer />
      </View>
    );
  }

  _setActiveScreen() {
    return false;
  }
}
const mapStateToProps = ({ nav, car_assign, user }) => ({ nav, car_assign, user });

export default connect(mapStateToProps, { setCarSelectedIndex, setActiveScreen, logoutUser, assignCars})(HomeScreen);
