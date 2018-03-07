import React, {Component} from 'react';
import { Picker, View, DatePickerAndroid, Text} from 'react-native';
import {FormLabel, FormInput, Icon, FormValidationMessage, Button}  from 'react-native-elements';
import {connect} from 'react-redux';
import {has} from 'lodash';
import axios from 'axios';
import {WIN_WIDTH, MAIN_COLOR, SEARCH_TICKET_URL} from '../constants';
import {setCarInfo} from '../actions';
import Barcode from './Barcode';
import Option from './RampForm/Option';
import CarDetailsInput from './RampForm/CarDetailsInput';
import Comment from './RampForm/Comment';
import SubmitBtn from './RampForm/SubmitBtn';
import RampLocation from './RampLocation';

class Hotel extends Component {
  state = {
    hasValidTicket: false,
    loading: false,
  }

  render() {
    const {setCarInfo, car, error} = this.props;

    return (
      <View>
        <Barcode />
        {
          this.state.hasValidTicket 
          ? this._hotelForm()
          : <Button 
            loading={this.state.loading} 
            backgroundColor={MAIN_COLOR} 
            icon={{name: 'search'}} 
            title='SEARCH' 
            onPress={() => this._searchTicket()} />
        }
      </View>
    );
  }

  _searchTicket() {
    this.setState(() => ({loading: true}));
    axios.post(SEARCH_TICKET_URL, {ticketno: this.props.car.ticketno}).then(({data}) => {
      let hasValidTicket = false;
      if(data.error) {
        alert(data.msg);
      } else {
        hasValidTicket = true;
        this.props.setCarInfo(data.data);
      }
      this.setState(() => ({ ...this.state, loading: false, hasValidTicket }));
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
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

  _hotelForm() {
    const {setCarInfo, car, error} = this.props;
    
    return (
      <View>
        <Option />
        <FormLabel>HOTEL NAME</FormLabel>
        <RampLocation value={car.name} setSelectedLocation={(val) => setCarInfo({ name: val })} />
        <FormValidationMessage>{has(error, 'name') && error.name}</FormValidationMessage>
        
        <FormLabel>GUEST NAME</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ guest_name: val })} value={car.guest_name} />
          <FormValidationMessage>{has(error,'guest_name') && error.guest_name}</FormValidationMessage>

        <FormLabel>FOLIO NUMBER</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ folio_number: val })} value={car.folio_number} />
          <FormValidationMessage>{has(error,'folio_number') && error.folio_number}</FormValidationMessage>

        <FormLabel>ROOM NUMBER</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ room_number: val })} value={car.room_number} />
          <FormValidationMessage>{has(error,'room_number') && error.room_number}</FormValidationMessage>

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
        <FormValidationMessage>{has(error,'checkout_date') && error.checkout_date}</FormValidationMessage>
        <CarDetailsInput />
        <Comment />
        <SubmitBtn />
      </View>
    )
  }
}

const mapStateToProps = ({ car, error }) => ({ car, error });

export default connect(mapStateToProps, { setCarInfo})(Hotel);