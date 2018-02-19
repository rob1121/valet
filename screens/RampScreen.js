import React, {Component} from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {setActiveScreen} from '../actions';
import {RAMP_NAV, HOME_NAV} from '../constants';
import Footer from '../components/Footer';
import RampLocation from '../components/RampLocation';

class RampScreen extends Component {
  _setActiveScreen() {
    this.props.setActiveScreen(RAMP_NAV);

    return false;
  }

  componentWillMount() {
    this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => this._setActiveScreen());

    this.props.setActiveScreen(RAMP_NAV);
  }

  componentWillUnmount() {
    this.backHandlerListener.removeEventListener('hardwareBackPress');
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        <RampLocation />
        <Footer />
      </View>
    );
  }
};

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {setActiveScreen})(RampScreen)