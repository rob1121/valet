import React, {Component} from 'react';
<<<<<<< HEAD
import { Alert, Platform, PickerIOS, Picker, View, ScrollView, TextInput, BackHandler} from 'react-native';
=======
import { Alert, Picker, PickerIOS, Platform, View, ScrollView, TextInput, BackHandler} from 'react-native';
>>>>>>> 2ae122dc0b248e091dbd1e9f9ac7d8ffcfd812fc
import {Header, Button, FormLabel, FormInput, Text, FormValidationMessage}  from 'react-native-elements';
import {connect} from 'react-redux';
import {has} from 'lodash';
import { WIN_WIDTH, RAMP_ADD_CAR_NAV, HOME_NAV} from '../constants';
import {setErrors, resetCarInfo, setActiveScreen, setCarInfo} from '../actions';
import Hotel from '../components/Hotel';
import Transient from '../components/Transient';
import Monthly from '../components/Monthly';
import Footer from '../components/Footer';

class RampAddCar extends Component {

  componentWillMount () {
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress', 
      () => {
        if(this.props.nav.active_screen != HOME_NAV) {
          this.props.setActiveScreen(HOME_NAV);
          this.props.nav.navigate(HOME_NAV);

          return true;
        }

        return false;
      }
    );

    this.props.setCarInfo({uid: this.props.user.id});
    this.props.setActiveScreen(RAMP_ADD_CAR_NAV);
  }

  componentWillUnmount () {
    this.backHandlerListener.remove();
  }

  render() {
    const {car} = this.props;

    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          
        <Header
          centerComponent={{ text: 'TICKETING', style: { color: '#fff' } }}
        />
          <FormLabel>TICKET TYPE</FormLabel>
          {Platform.os === 'ios' ? this._pickerIOS() : this._pickerAndroid()}

          {car.ticket_type === 'hotel' && <Hotel />}
          {car.ticket_type === 'transient' && <Transient />}
          {car.ticket_type === 'monthly' && <Monthly />}
        </ScrollView>
        <Footer />
      </View>
    );
  }

  _pickerIOS() {
    const {car} = this.props;
    return (
      <PickerIOS
        style={{margin: 15}}
        selectedValue={car.ticket_type}
        onValueChange={(val) => this._onTicketTypeChange(val)}>
        <PickerIOS.Item label="TRANSIENT" value="transient" />
        <PickerIOS.Item label="HOTEL" value="hotel" />
        <PickerIOS.Item label="MONTHLY" value="monthly" />
      </PickerIOS>
    );
  }

  _pickerAndroid() {
    const {car} = this.props;
    return (
      <Picker
        style={{margin: 15}}
        selectedValue={car.ticket_type}
        onValueChange={(val) => this._onTicketTypeChange(val)}>
        <Picker.Item label="TRANSIENT" value="transient" />
        <Picker.Item label="HOTEL" value="hotel" />
        <Picker.Item label="MONTHLY" value="monthly" />
      </Picker>
    );
  }

  _onTicketTypeChange(category) {
    this.props.resetCarInfo();
    this.props.setErrors({});
    this.props.setCarInfo({ticket_type: category, uid: this.props.user.id});
  }
}

const mapStateToProps = ({ car, user, nav }) => ({ car, user, nav });

export default connect(mapStateToProps, { setErrors, resetCarInfo, setCarInfo, setActiveScreen })(RampAddCar);