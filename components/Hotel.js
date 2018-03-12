import React, {Component} from 'react';
import { View, Platform, DatePickerIOS, DatePickerAndroid, Text} from 'react-native';
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
    chosenDate: new Date(),
  }

  render() {
    const {setCarInfo, car, error} = this.props;

    return (
      <View>
        <Barcode />
        {this.state.hasValidTicket  && <FormValidationMessage>{has(error, 'ticketno') && error.ticketno}</FormValidationMessage>}
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
        data.data && this.props.setCarInfo(data.data);
      }
      this.setState(() => ({ ...this.state, loading: false, hasValidTicket }));
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
  }

  _hotelForm() {
    const {setCarInfo, car, error} = this.props;
    
    return (
      <View>
        <Option />
        <FormLabel>HOTEL NAME</FormLabel>
        <View style={{margin:15}}>
          <RampLocation value={car.name} setSelectedLocation={(val) => setCarInfo({ name: val })} />
        </View>
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
        {Platform.OS === 'ios' ? this._iosDatePicker() : this._androidDatePicker()}
        
        <FormValidationMessage>{has(error,'checkout_date') && error.checkout_date}</FormValidationMessage>
        <CarDetailsInput />
        <Comment />
        <SubmitBtn />
      </View>
    )
  }

  _iosDatePicker() {
    return (<DatePickerIOS
      date={new Date(this.props.car.checkout_date)}
      mode="date"
      onDateChange={this._updateCheckoutDate}
    />);
  }

  _updateCheckoutDate(newDate) {

    const date = newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`

    const month = newDate.getMonth() > 9 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`

    this.props.setCarInfo({ checkout_date: `${newDate.getFullYear()}-${month}-${date}` })
    this.setState({ chosenDate: newDate});
  }

  _androidDatePicker() {
    return (<View style={{ flexDirection: 'row', width: WIN_WIDTH }}>
      <View style={{ width: WIN_WIDTH * 0.8 }}>
        <FormInput onChangeText={(val) => this.props.setCarInfo({ checkout_date: val })} value={this.props.car.checkout_date} />
      </View>
      <View style={{ width: WIN_WIDTH * 0.2 }}>
        <Icon
          name='calendar'
          type='font-awesome'
          onPress={this._datePicker} />
      </View>
    </View>);
  }

  _datePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open();
      const date = `${year}-${("0" + (month+1)).slice(-2)}-${("0" + day).slice(-2)}`;
      this.props.setCarInfo({ checkout_date: date });
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
}

const mapStateToProps = ({ car, error }) => ({ car, error });

export default connect(mapStateToProps, { setCarInfo})(Hotel);