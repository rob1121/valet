import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { Divider } from 'react-native-elements';
import {connect} from 'react-redux';
import { setActiveScreen, logoutUser} from '../actions';
import {HOME_NAV, LOGIN_NAV} from '../constants';
import Footer from '../components/Footer';
import CarAvailable from '../components/CarAvailable';
import RampLocation from '../components/RampLocation';

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

    this.props.setActiveScreen(HOME_NAV);
  }

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CarAvailable />
        <Footer />
      </View>
    );
  }

  _setActiveScreen() {
    return false;
  }
}
const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, { setActiveScreen, logoutUser})(HomeScreen);
