import React, {Component} from 'react';
import {  View } from 'react-native';
import { connect } from 'react-redux';
import onBack from 'react-native-onback';
import {setActiveScreen} from '../actions';
import {RAMP_NAV} from '../constants';
import Footer from '../components/Footer';
import RampLocation from '../components/RampLocation';

class RampScreen extends Component {
  async componentWillMount() {
    this.props.setActiveScreen(RAMP_NAV);
  }

  componentDidMount() {
    onBack(() => {
      this.props.setActiveScreen(RAMP_NAV);
    }, this);
  }

  componentWillUnmount() {
    onBack.unmount(this);
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