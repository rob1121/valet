import React, {Component} from 'react';
import {Modal, View, Picker, PickerIOS, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Text, FormLabel, Button, Icon} from 'react-native-elements';
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
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ textAlign: 'center' }}>{toUpper(this.props.value)}</Text>
          <Icon
            iconStyle={{ marginLeft: 15, textAlign: 'center' }}
            name='edit'
            onPress={() => this.setState(() => ({ ...this.state, showModal: true }))}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => {
              this.setState(() => ({ ...this.state, showModal: false }))
            }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {Platform.os === 'ios' ? this._pickerIOS() : this._pickerAndroid()}
              <Button
                backgroundColor={MAIN_COLOR}
                title='DONE'
                onPress={() => this.setState(() => ({ ...this.state, showModal: false }))}
              />
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          </Modal>
        </View>
      </View>
    )
  }

  _pickerIOS() {
    return (
          <PickerIOS
            style={{ margin: 15 }}
            selectedValue={this.props.car.opt}
            onValueChange={(val) => this.props.setCarInfo({ opt: val })}>
            <PickerIOS.Item label="DELIVERY" value="Delivery" />
            <PickerIOS.Item label="PICKUP" value="Pickup" />
          </PickerIOS>
    );
  }

  _pickerAndroid() {
    return (
        <Picker
          style={{ margin: 15 }}
          selectedValue={this.props.car.opt}
          onValueChange={(val) => this.props.setCarInfo({ opt: val })}>
          <Picker.Item label="DELIVERY" value="Delivery" />
          <Picker.Item label="PICKUP" value="Pickup" />
        </Picker>
    );
  }
} 

const mapStateToProps =({car}) => ({car});

export default connect(mapStateToProps, {setCarInfo})(Option);