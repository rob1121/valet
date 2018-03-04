
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {FormLabel, FormInput} from 'react-native-elements';
import {setCarInfo} from '../../actions';
import CarPicker from '../CarPicker';

const CarDetailsInput = (props) => (
  <View>
    <FormLabel>CAR PLATE NO</FormLabel>
    <FormInput onChangeText={(val) => props.setCarInfo({ plateno: val })} value={props.car.plateno} />

    <FormLabel>CAR MAKE&MODEL</FormLabel>
    <View style={{margin: 15}}>
      <CarPicker value={props.car.model} onValueChange={(val) => props.setCarInfo({model: val})} />
    </View>
  </View>
);

const mapStateToProps =({car}) => ({car});

export default connect(mapStateToProps, {setCarInfo})(CarDetailsInput);