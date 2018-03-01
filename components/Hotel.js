import React, {Component} from 'react';
import { Picker, View, ScrollView, TextInput, BackHandler} from 'react-native';
import {FormLabel, FormInput}  from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import {setCarInfo} from '../actions';
import RampLocation from './RampLocation';
import Barcode from './Barcode';

class Hotel extends Component {
  render() {
    const {setCarInfo, car} = this.props;
    const {MainContainer} = styles;

    return (
      <View>
          <FormLabel>NAME</FormLabel>

          <FormLabel>OPTION</FormLabel>
          <Picker
            style={{marginLeft: 10}}
            selectedValue={car.opt}
            onValueChange={(val) => setCarInfo({opt: val})}>
            <Picker.Item label="DELIVERY" value="delivery" />
            <Picker.Item label="PICKUP" value="pickup" />
          </Picker>

          <View style={{margin: 15}}>
            <RampLocation value={this.props.car.customer} onChange={(val) => this.props.setCarInfo({customer: val})}/>
          </View>

          <View style={{margin: 15}}><Barcode /></View>

          <FormLabel>FOLIO NUMBER</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ folio_number: val })} value={car.folio_number} />

          <FormLabel>GUESS NAME</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ guess_name: val })} value={car.guess_name} />

          <FormLabel>ROOM NUMBER</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ room_number: val })} value={car.room_number} />

          <FormLabel>CHECKOUT DATE</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ checkout_date: val })} value={car.checkout_date} />

          <FormLabel>CAR PLATE NO</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ platno: val })} value={car.platno} />

          <FormLabel>CAR MAKE</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ make: val })} value={car.make} />

          <FormLabel>CAR MAKE</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ model: val })} value={car.model} />

          <FormLabel>CAR MODEL</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ model: val })} value={car.model} />

          <Text>Comment </Text>
          <TextInput
            enablesReturnKeyAutomatically={true}
            returnKeyType='next'
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid='transparent'
            style={{ padding: 5, height: 100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => setCarInfo({ comment: text })}
            value={active_task.comment} />
        <Footer />
      </View>
    );
  }
}

const mapStateToProps = ({ car }) => ({ car });

export default connect(mapStateToProps, { setCarInfo})(Hotel);