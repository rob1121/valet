import React, { Component } from 'react';
import { Modal, View, Picker, PickerIOS, Platform } from 'react-native';
import { Text, Button } from 'react-native-elements';
import {MAIN_COLOR} from '../constants';
import axios from 'axios';
import { map, size } from 'lodash';
import { connect } from 'react-redux';
import { 
  LOCATION_FILTER_URL,
} from '../constants';

class LocationFilter extends Component 
{
  state = {
    list: {},
    showModal: false,
  }

  componentDidMount() {
    this._fetchLocations();
  }

  _fetchLocations() {
    const params = {
      base: this.props.user.base,
    };

    axios.get(LOCATION_FILTER_URL, {params})
      .then(({ data }) => {
        this.setState(() => ({ list: data}));
        if(this.props.value == '')
          this.props.setSelectedLocation(data[0].value);
      })
      .catch((error)   => {console.error(error);});
  }

  render() {

    return (
      <View>
        {Platform.os === 'ios' 
        ? <FormInput value={this.props.value} onFocus={() => this.setState(() => ({...this.state, showModal: true}))} />
        : this._pickerAndroid()}
        {Platform.os === 'ios' && this._pickerIOS()}
      </View>
    );
  }


  _pickerIOS() {
    const { value, setSelectedLocation} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showModal}
        onRequestClose={() => {
          this.setState(() => ({ ...this.state, showModal: flase }))
        }}>
        <View style={{ flex: 3, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        <View style={{ flex: 1, padding: 15 }}>
          <PickerIOS 
            style={{ margin: 15 }}
            onValueChange={(val) => setSelectedLocation(val)}
            selectedValue={value}
          >
            {
              map(this.state.list, (filter, idx) => {
                return <PickerIOS.Item key={idx} label={filter.label} value={filter.value} />
              })
            }
          </PickerIOS>

          <Button
            backgroundColor={MAIN_COLOR}
            title='DONE'
            onPress={() => this.setState(() => ({ ...this.state, showModal: flase }))}
          />
        </View>
      </Modal>
    );
  }


  _pickerAndroid() {
    const { value, setSelectedLocation} = this.props;
    return (
      <Picker
        onValueChange={(val) => setSelectedLocation(val)}
        selectedValue={value}
      >
        {
          map(this.state.list, (filter, idx) => {
            return <Picker.Item key={idx} label={filter.label} value={filter.value} />
          })
        }
      </Picker>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps)(LocationFilter);