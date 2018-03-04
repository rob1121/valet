import React, {Component} from 'react';
import {View} from 'react-native';
import {FormValidationMessage, FormLabel, FormInput, Button}  from 'react-native-elements';
import {connect} from 'react-redux';
import {has} from 'lodash';
import axios from 'axios';
import {SEARCH_MONTHLY_USER_URL, MAIN_COLOR} from '../constants';
import {setCarInfo} from '../actions';
import Option from './RampForm/Option';
import CarDetailsInput from './RampForm/CarDetailsInput';
import Comment from './RampForm/Comment';
import SubmitBtn from './RampForm/SubmitBtn';

class Monthly extends Component {
  state = {
    hasValidUser: false,
    loading: false,
  }

  render() {
    const {setCarInfo, car, error} = this.props;

    return (
      <View>

        <FormLabel>CONTACT NO.</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ contact_no: val })} value={car.contact_no} />
        <FormValidationMessage>{has(error, 'contact_no') && error.contact_no}</FormValidationMessage>
        {
          this.state.hasValidUser 
            ? this._monthlyForm()
            : <Button 
            loading={this.state.loading} 
            backgroundColor={MAIN_COLOR} 
            icon={{name: 'search'}} 
            title='SEARCH'  
            onPress={() => this._searchUser()} />
        }
      </View>
    );
  }

  _searchUser() {
    this.setState(() => ({loading: true}));
    axios.post(SEARCH_MONTHLY_USER_URL, {
      contact_no: this.props.car.contact_no, 
      location: this.props.location_filter.selected_location,
    }).then(({data}) => {
      let hasValidUser = false;
      if(data.error) {
        alert(data.msg);
      } else {
        hasValidUser = true;
        this.props.setCarInfo(data.data);
      }
      this.setState(() => ({ ...this.state, loading: false, hasValidUser }));
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });

  }

  _monthlyForm() {
    const {setCarInfo, car, error} = this.props;
    return (
      <View>
        <Option />
        <FormLabel>NAME</FormLabel>
        <FormInput onChangeText={(val) => setCarInfo({ name: val })} value={car.name} />
        <FormValidationMessage>{has(error, 'name') && error.name}</FormValidationMessage>

        <CarDetailsInput />
        <Comment />
        <SubmitBtn />
      </View>

    )
  }
}

const mapStateToProps = ({ car, error, location_filter }) => ({ car, error, location_filter });

export default connect(mapStateToProps, { setCarInfo})(Monthly);