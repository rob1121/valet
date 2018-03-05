import React, {Component} from 'react';
import { Alert, Picker, View, ScrollView, TextInput, BackHandler} from 'react-native';
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
    const {setCarInfo, car} = this.props;

    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          
        <Header
          centerComponent={{ text: 'TICKETING', style: { color: '#fff' } }}
        />
          <FormLabel>TICKET TYPE</FormLabel>
          <Picker
            style={{margin: 15}}
            selectedValue={car.ticket_type}
            onValueChange={(val) => this._onTicketTypeChange(val)}>
            <Picker.Item label="TRANSIENT" value="transient" />
            <Picker.Item label="HOTEL" value="hotel" />
            <Picker.Item label="MONTHLY" value="monthly" />
          </Picker>

          {car.ticket_type === 'hotel' && <Hotel />}
          {car.ticket_type === 'transient' && <Transient />}
          {car.ticket_type === 'monthly' && <Monthly />}
        </ScrollView>
        <Footer />
      </View>
    );
  }

  _onTicketTypeChange(category) {
    this.props.resetCarInfo();
    this.props.setCarInfo({ticket_type: category, uid: this.props.user.id});
  }
}

const mapStateToProps = ({ car, user, nav }) => ({ car, user, nav });

export default connect(mapStateToProps, { setErrors, resetCarInfo, setCarInfo, setActiveScreen })(RampAddCar);