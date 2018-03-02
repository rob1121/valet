import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { map, size } from 'lodash';
import { connect } from 'react-redux';
import { 
  setLocations 
} from '../actions';
import { 
  LOCATION_FILTER_URL,
  ALL_INDEX,
} from '../constants';

class LocationFilter extends Component 
{
  componentDidMount() {
    this._fetchLocations();
  }

  _fetchLocations() {
    axios.get(LOCATION_FILTER_URL)
      .then(({ data }) => {this.props.setLocations(data);})
      .catch((error)   => {console.error(error);});
  }

  render() {
    const { location_filter} = this.props;
    const { locations } = location_filter;

    return (
      <View>
          <Text h6>Location:</Text>
          <Picker 
            onValueChange={(val) => this.props.onChange(val)}
            selectedValue={this.props.value}
          >
            <Picker.Item label='' value='' />
            {
              map(locations, (filter, idx) => {
                return <Picker.Item key={idx} label={filter.label} value={filter.value} />
              })
            }
            <Picker.Item key={size(locations)} label='ALL' value='' />
          </Picker>
      </View>
    );
  }
}

const mapStateToProps = ({ location_filter }) => ({ location_filter });

export default connect(mapStateToProps, { setLocations })(LocationFilter);