import React, {Component} from 'react';
import {Picker} from 'react-native';
import axios from 'axios';
import {map, toUpper} from 'lodash';
import {CAR_LIST_URL} from '../constants';

export default class CarPicker extends Component {
  state = {
    cars: {}
  }

  componentDidMount() {
    axios.get(CAR_LIST_URL)
    .then(({data}) => {
      this.setState(() => ({cars: data}))
    }).catch((error) => console.log(error));
  }

  render() {
    return (
      <Picker
        selectedValue={this.props.value}
        onValueChange={(itemValue) => this.props.onValueChange(itemValue)}>
        <Picker.Item label={'N/A'} value=''/>
        {
          this.state.cars &&
          map(this.state.cars, (item, index) => {
            return <Picker.Item key={index} label={toUpper(`${item.make}|${item.model}`)} value={item.model} />
          })
        }
      </Picker>
    );
  }
}