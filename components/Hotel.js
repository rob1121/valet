import React, {Component} from 'react';
import { Picker, View, DatePickerAndroid} from 'react-native';
import {FormLabel, FormInput, Icon}  from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import {setCarInfo} from '../actions';
import {WIN_WIDTH} from '../constants';

class Hotel extends Component {
  render() {
    const {setCarInfo, car} = this.props;

    return (
      <View>
        
        <FormLabel>CUSTOMER</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ customer: val })} value={car.customer} />

        <FormLabel>GUESS NAME</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ guess_name: val })} value={car.guess_name} />

        <FormLabel>FOLIO NUMBER</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ folio_number: val })} value={car.folio_number} />

        <FormLabel>ROOM NUMBER</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ room_number: val })} value={car.room_number} />

        <FormLabel>CHECKOUT DATE</FormLabel>
        
        <View style={{ flexDirection: 'row', width: WIN_WIDTH }}>
          <View style={{ width: WIN_WIDTH*0.8 }}>
            <FormInput onChangeText={(val) => setCarInfo({ checkout_date: val })} value={car.checkout_date} />
          </View>
          <View style={{ width: WIN_WIDTH * 0.2 }}>
            <Icon
              name='calendar'
              type='font-awesome'
              onPress={this._datePicker} />
          </View>
        </View>
      </View>
    );
  }

  _datePicker = async () => {
    try {
  const {action, year, month, day} = await DatePickerAndroid.open();
  const date = `${("0" + month).slice(-2)}/${("0" + day).slice(-2)}/${year}`;
  this.props.setCarInfo({ checkout_date: date });
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
  }
}

const mapStateToProps = ({ car }) => ({ car });

export default connect(mapStateToProps, { setCarInfo})(Hotel);