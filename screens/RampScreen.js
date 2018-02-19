import React, {Component} from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {setActiveScreen, setSelectedLocation} from '../actions';
import {RAMP_NAV, HOME_NAV} from '../constants';
import Footer from '../components/Footer';
import RampLocation from '../components/RampLocation';

class RampScreen extends Component {
  componentWillMount() {
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress', 
      () => {
        if(this.props.nav.active_screen !== HOME_NAV) {
          this.props.setActiveScreen(HOME_NAV);
          this.props.nav.navigate(HOME_NAV);

          return true;
        }
        return false;
      }
    );

    this.props.setActiveScreen(RAMP_NAV);
  }

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }
  
  render() {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        <RampLocation onChange={(val) => this.props.setSelectedLocation(val)}/>
        <Footer />
      </View>
    );
  }
};

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {setActiveScreen, setSelectedLocation})(RampScreen)