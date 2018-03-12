import React, { Component } from 'react';
import { Modal, View, Picker, PickerIOS, Platform } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import { MAIN_COLOR, WIN_WIDTH} from '../constants';
import axios from 'axios';
import { map, size, toUpper } from 'lodash';
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
      <View style={{flexDirection: 'row'}}>
        <Text style={{ textAlign: 'center'}}>{toUpper(this.props.value)}</Text>
            <Icon
          iconStyle={{ marginLeft: 15, textAlign: 'center'}}
              name='edit'
              onPress={() => this.setState(() => ({ ...this.state, showModal: true }))}
            />

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState(() => ({ ...this.state, showModal: false }))
          }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {Platform.os === 'ios' ? this._pickerIOS() : this._pickerAndroid()}
            <Button
              backgroundColor={MAIN_COLOR}
              title='DONE'
              onPress={() => this.setState(() => ({ ...this.state, showModal: false }))}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </Modal>
      </View>
    );
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