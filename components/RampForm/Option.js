import React, {Component} from 'react';
import {View, Picker, PickerIOS, Platform} from 'react-native';
import {connect} from 'react-redux';
import {FormLabel} from 'react-native-elements';
import {setCarInfo} from '../../actions';

class  Option extends Component {
  render() {
    return Platform.os === 'ios' ? this._pickerIOS() : this._pickerAndroid();
  }

  _pickerIOS() {
    return (
      <View>
        <FormLabel>OPTION</FormLabel>
        <PickerIOS
          style={{ margin: 15 }}
          selectedValue={this.props.car.opt}
          onValueChange={(val) => this.props.setCarInfo({ opt: val })}>
          <PickerIOS.Item label="DELIVERY" value="Delivery" />
          <PickerIOS.Item label="PICKUP" value="Pickup" />
        </PickerIOS>
      </View>
    );
  }

  _pickerAndroid() {
    return (
      <View>
        <FormLabel>OPTION</FormLabel>
        <Picker
          style={{ margin: 15 }}
          selectedValue={this.props.car.opt}
          onValueChange={(val) => this.props.setCarInfo({ opt: val })}>
          <Picker.Item label="DELIVERY" value="Delivery" />
          <Picker.Item label="PICKUP" value="Pickup" />
        </Picker>
      </View>
    );
  }
} 

const mapStateToProps =({car}) => ({car});

export default connect(mapStateToProps, {setCarInfo})(Option);