
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {has, toUpper} from 'lodash';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {setCarInfo} from '../../actions';
import CarPicker from '../CarPicker';

const CarDetailsInput = (props) => (
  <View>
    <FormLabel>CAR PLATE NO</FormLabel>
    <FormInput onChangeText={(val) => props.setCarInfo({ car_plate_no: val })} value={toUpper(props.car.car_plate_no)}/>
        <FormValidationMessage>{has(props.error, 'car_plate_no') && props.error.car_plate_no}</FormValidationMessage>

    <FormLabel>CAR MAKE&MODEL</FormLabel>
    <View style={{margin: 15}}>
      <CarPicker value={props.car.car_model} onValueChange={(val) => props.setCarInfo({car_model: val})} />
    </View>
        <FormValidationMessage>{has(props.error, 'model') && props.error.car_model}</FormValidationMessage>
  </View>
);

const mapStateToProps =({car, error}) => ({car, error});

export default connect(mapStateToProps, {setCarInfo})(CarDetailsInput);