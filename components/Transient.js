import React, {Component} from 'react';
import {View} from 'react-native';
import {FormValidationMessage, FormLabel, FormInput}  from 'react-native-elements';
import {connect} from 'react-redux';
import {has} from 'lodash';
import axios from 'axios';
import {setCarInfo} from '../actions';
import Option from './RampForm/Option';
import Barcode from './Barcode';
import CarDetailsInput from './RampForm/CarDetailsInput';
import Comment from './RampForm/Comment';
import SubmitBtn from './RampForm/SubmitBtn';
import RampLocation from './RampLocation';

class Transient extends Component {
  render() {
    const {setCarInfo, car, error} = this.props;

    return (
      <View>
        <Option />
        <Barcode />
        <FormLabel>HOTEL NAME</FormLabel>
        <RampLocation value={car.name} setSelectedLocation={(val) => setCarInfo({ name: val })} />
        <FormValidationMessage>{has(error, 'name') && error.name}</FormValidationMessage>

        <FormLabel>CONTACT NO.</FormLabel>
        <FormInput 
          onChangeText={(val) => setCarInfo({ contact_no: val })} 
          value={car.contact_no}
          placeholder='09xxxxxxxxx'
          dataDetectorTypes='phoneNumber'
          keyboardType='phone-pad' />
        <FormValidationMessage>{has(error, 'contact_no') && error.contact_no}</FormValidationMessage>

        <CarDetailsInput />
        <Comment />
        <SubmitBtn />
      </View>
    );
  }
}

const mapStateToProps = ({ car, error }) => ({ car, error });

export default connect(mapStateToProps, { setCarInfo})(Transient);