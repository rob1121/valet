import React from 'react';
import { View, Picker, PickerIOS} from 'react-native';
import {connect} from 'react-redux';
import {FormLabel} from 'react-native-elements';
import {setCarInfo} from '../../actions';

const Option = (props) => (
  <View>
    <FormLabel>OPTION</FormLabel>
    {
      Platform.OS === 'ios' 
      ? <PickerIOS
          style={{ margin: 15 }}
          selectedValue={props.car.opt}
          onValueChange={(val) => props.setCarInfo({ opt: val })}>
          <PickerIOS.Item label="DELIVERY" value="Delivery" />
          <PickerIOS.Item label="PICKUP" value="Pickup" />
        </PickerIOS>
      : <Picker
          style={{ margin: 15 }}
          selectedValue={props.car.opt}
          onValueChange={(val) => props.setCarInfo({ opt: val })}>
          <Picker.Item label="DELIVERY" value="Delivery" />
          <Picker.Item label="PICKUP" value="Pickup" />
        </Picker>
    }
  </View>
);

const mapStateToProps =({car}) => ({car});

export default connect(mapStateToProps, {setCarInfo})(Option);