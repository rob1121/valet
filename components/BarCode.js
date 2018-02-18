import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {connect} from 'react-redux';
import {setCarInfo} from '../actions';
import {RAMP_ADD_CAR_NAV} from '../constants';

class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.props.setCarInfo({ticketno: data});
    this.props.nav.navigate(RAMP_ADD_CAR_NAV);
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {setCarInfo})(BarcodeScanner)