import React, {Component} from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput}  from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import {setCarInfo} from '../actions';

class Transient extends Component {
  render() {
    const {setCarInfo, car} = this.props;

    return (
      <View>
        <FormLabel>NAME</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ name: val })} value={car.name} />

        <FormLabel>CONTACT NO.</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ contact_no: val })} value={car.contact_no} />
      </View>
    );
  }
}

const mapStateToProps = ({ car }) => ({ car });

export default connect(mapStateToProps, { setCarInfo})(Transient);