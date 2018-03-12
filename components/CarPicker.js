import React, {Component} from 'react';
import {Picker, Modal, PickerIOS, View, Platform} from 'react-native';
import {Button, FormInput} from 'react-native-elements';
import axios from 'axios';
import {map, toUpper} from 'lodash';
import {CAR_LIST_URL, MAIN_COLOR} from '../constants';

export default class CarPicker extends Component {
  state = {
    cars: {},
    showModal: false,
  }

  componentDidMount() {
    axios.get(CAR_LIST_URL)
    .then(({data}) => {
      this.setState(() => ({cars: data}))
    }).catch((error) => console.log(error));
  }

  render() {
    return (
      <View>
        {Platform.os === 'ios' 
          ? <FormInput value={this.props.value} onFocus={() => this.setState(() => ({...this.state, showModal: true}))} /> 
          : this._pickerAndroid()}
        {Platform.os === 'ios' && this._pickerIOS()}
      </View>
    );
  }

  _pickerAndroid() {
    return (
      <Picker
        selectedValue={this.props.value}
        onValueChange={(itemValue) => this.props.onValueChange(itemValue)}>
        <Picker.Item label='N/A' value='' />
        {map(this.state.cars, (item, index) => {
          return <Picker.Item key={index} label={toUpper(`${item.make}|${item.model}`)} value={item.model} />
        })}
      </Picker>
    );
  }

  _pickerIOS() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showModal}
        onRequestClose={() => {
          this.setState(() => ({ ...this.state, showModal: false }))
        }}>
        <View style={{ flex: 3, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        <View style={{ flex: 1, padding: 15 }}>
          <PickerIOS
            selectedValue={this.props.value}
            onValueChange={(itemValue) => this.props.onValueChange(itemValue)}>
            <PickerIOS.Item label='N/A' value='' />
            {map(this.state.cars, (item, index) => {
              return <PickerIOS.Item key={index} label={toUpper(`${item.make}|${item.model}`)} value={item.model} />
            })}
          </PickerIOS>

          <Button
            backgroundColor={MAIN_COLOR}
            title='DONE'
            onPress={() => this.setState(() => ({ ...this.state, showModal: false }))}
          />
        </View>
      </Modal>
    );
  }
}