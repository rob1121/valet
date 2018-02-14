import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { map, size } from 'lodash';
import { connect } from 'react-redux';
import { 
  setSelectedFilter, 
  setFilters 
} from '../actions';
import { 
  CAR_ASSIGN_FILTER_URL,
  ALL_INDEX,
} from '../constants';

class CarFilter extends Component 
{
  componentDidMount() {
    this.props.setSelectedFilter(ALL_INDEX);
    this._fetchFilters();
  }

  _fetchFilters() {
    axios.get(CAR_ASSIGN_FILTER_URL)
      .then(({ data }) => {this.props.setFilters(data);})
      .catch((error) => {console.error(error);});
  }

  render() {
    const { car_assign_filter, setSelectedFilter} = this.props;
    const { selected_filter, filters } = car_assign_filter;

    return (
      <View>
          <Text h6>Filter:</Text>
          <Picker 
            onValueChange={(val) => setSelectedFilter(val)}
            selectedValue={selected_filter}
          >
            {
              map(filters.all, (filter, idx) => {
                return <Picker.Item key={idx} label={filter.label} value={filter.value} />
              })
            }
            <Picker.Item key={size(filters.all)} label='ALL' value={ALL_INDEX} />
          </Picker>
      </View>
    );
  }
}

const mapStateToProps = ({ car_assign_filter }) => ({ car_assign_filter });

export default connect(mapStateToProps, { setSelectedFilter, setFilters })(CarFilter);