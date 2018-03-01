import React from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {connect} from 'react-redux';
import {FormInput, FormLabel} from 'react-native-elements';
import {setCarInfo, setActiveScreen} from '../actions';
import {RAMP_ADD_CAR_NAV} from '../constants';

class Barcode extends React.Component {
  state = {
    hasCameraPermission: null,
    showBarcode: false,
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text style={{color:'red'}}>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text style={{color:'red'}}>No access to camera</Text>;
    } else {
      return (
        
      <View>
        <FormLabel>
          TICKET NO.
        </FormLabel>

        <View style={{ flexDirection: 'row', width: WIN_WIDTH }}>
          <View style={{ width: WIN_WIDTH*0.8 }}>
            <FormInput onChangeText={(val) => this.props.setCarInfo({ticketno: val})} value={this.props.car.ticketno}/>
          </View>

          <View style={{ width: WIN_WIDTH * 0.2 }}>
          <Icon
            iconStyle={{marginTop: 10 }}
            name='barcode-scan'
            type='material-community'
            onPress={() => this.setState({...this.state, showBarcode: true})}
            />
          </View>

          {this.state.showBarcode && <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
          />}
        </View>
      </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.props.setCarInfo({ticketno: data});
    this.setState(() => ({...this.state, showBarcode: val}));
  }
}

const mapStateToProps = ({ car }) => ({ car });

export default connect(mapStateToProps, {setActiveScreen, setCarInfo})(Barcode)