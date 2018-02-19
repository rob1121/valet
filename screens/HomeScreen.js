import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { Divider } from 'react-native-elements';
import {connect} from 'react-redux';
import { setActiveScreen, logoutUser} from '../actions';
import {HOME_NAV, LOGIN_NAV} from '../constants';
import Footer from '../components/Footer';
import CarFilter from '../components/CarFilter';
import CarAvailable from '../components/CarAvailable';
import RampLocation from '../components/RampLocation';

class HomeScreen extends Component 
{
  _setActiveScreen() {
    this.props.setActiveScreen(HOME_NAV);

    return false;
  }

  componentWillMount() {
    this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => this._setActiveScreen());

    this.props.setActiveScreen(HOME_NAV);
  }

  componentWillUnmount() {
    this.backHandlerListener.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CarFilter />
        <Divider style={{marginBottom: 20}}/>
        <CarAvailable />
        <Footer />
      </View>
    );
  }

  _setActiveScreen() {
    return true;
  }
}
const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, { setActiveScreen, logoutUser})(HomeScreen);
