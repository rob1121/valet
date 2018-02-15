import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import {setActiveScreen} from '../actions';
import {RAMP_NAV} from '../constants';
import Footer from '../components/Footer';

class RampScreen extends Component {
  state = {
    hasCameraPermission: null,
    data: '',
    type: '',
  }
  
  async componentWillMount() {
    this.props.setActiveScreen(RAMP_NAV);
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
        
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          </View>
          
          <View style={{ flex: 1, padding: 5 }}>
            <Text>Data: {this.state.data}</Text>
            <Text>Type: {this.state.type}</Text>
          </View>
          <Footer />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.setState(() => ({ ...this.state, type, data }));
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {setActiveScreen})(RampScreen)