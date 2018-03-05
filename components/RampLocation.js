import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { map, size } from 'lodash';
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
    axios.get(LOCATION_FILTER_URL)
      .then(({ data }) => {
        this.setState(() => ({ list: data}));
        if(this.props.value == '')
          this.props.setSelectedLocation(data[0].value);
      })
      .catch((error)   => {console.error(error);});
  }

  render() {
    const { value, setSelectedLocation} = this.props;

    return (
      <View style={{margin: 15}}>
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
      </View>
    );
  }
}

export default LocationFilter;