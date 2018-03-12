import React, {Component} from 'react';
import {Modal, View, Picker, PickerIOS, Platform} from 'react-native';
import {connect} from 'react-redux';
import {FormLabel, Button} from 'react-native-elements';
import {setCarInfo} from '../../actions';
import {MAIN_COLOR} from '../../constants';

class  Option extends Component {
  state = {
    showModal: false,
  }

  render() {
    return (
      <View>
        <FormLabel>OPTION</FormLabel>
        {Platform.os === 'ios' 
          ? <FormInput value={this.props.car.opt} onFocus={() => this.setState(() => ({...this.state, showModal: true}))} />
          : this._pickerAndroid()}
        {Platform.os === 'ios' && this._pickerIOS()}
      </View>
    )
  }

  _pickerIOS() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showModal}
        onRequestClose={() => {
          this.setState(() => ({ ...this.state, showModal: flase }))
        }}>
        <View style={{ flex: 3, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        <View style={{ flex: 1, padding: 15 }}>
          <PickerIOS
            style={{ margin: 15 }}
            selectedValue={this.props.car.opt}
            onValueChange={(val) => this.props.setCarInfo({ opt: val })}>
            <PickerIOS.Item label="DELIVERY" value="Delivery" />
            <PickerIOS.Item label="PICKUP" value="Pickup" />
          </PickerIOS>

          <Button
            backgroundColor={MAIN_COLOR}
            title='DONE'
            onPress={() => this.setState(() => ({ ...this.state, showModal: flase }))}
          />
        </View>
      </Modal>
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