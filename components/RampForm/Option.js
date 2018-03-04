import React from 'react';
import {View, Picker} from 'react-native';
import {connect} from 'react-redux';
import {FormLabel} from 'react-native-elements';
import {setCarInfo} from '../../actions';

const Option = (props) => (
  <View>
    <FormLabel>OPTION</FormLabel>
    <Picker
      style={{ margin: 15 }}
      selectedValue={props.car.opt}
      onValueChange={(val) => props.setCarInfo({ opt: val })}>
      <Picker.Item label="DELIVERY" value="Delivery" />
      <Picker.Item label="PICKUP" value="Pickup" />
    </Picker>
  </View>
);

const mapStateToProps =({car}) => ({car});

export default connect(mapStateToProps, {setCarInfo})(Option);