import React, { Component } from 'react';
import { View, Picker, PickerIOS, Platform } from 'react-native';
import { Text } from 'react-native-elements';
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

    return Platform.os === 'ios' ? this._pickerAndroid() : this._pickerAndroid();
  }


  _pickerIOS() {
    const { value, setSelectedLocation} = this.props;
    return (
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