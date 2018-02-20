import React, { Component } from 'react';
import {
  View,
  Image,
  BackHandler
} from 'react-native';
import { setActiveScreen } from '../actions';
import {
  RAMP_ADD_CAR_NAV
} from '../constants';
import { connect } from 'react-redux';

class ViewPhotoScreen extends Component {


  componentWillMount() {
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        this.props.setActiveScreen(RAMP_ADD_CAR_NAV);
        this.props.nav.navigate(RAMP_ADD_CAR_NAV);

        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  render() {
    let { image } = this.props.car;
    const epoch = Math.round((new Date()).getTime() / 1000);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: `${image}?epoch=${epoch}` }} style={{ width: 250, height: 250 }} />
      </View>
    );
  }
};


const mapStateToProps = ({ nav, car }) => ({ nav, car });

export default connect(mapStateToProps, { setActiveScreen })(ViewPhotoScreen)