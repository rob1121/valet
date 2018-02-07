import React, {Component} from 'react';
import { View, Picker, Dimensions } from 'react-native';
import { Icon, Header, Text, Divider } from 'react-native-elements';
import { map, toLower } from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSelectedFilter, setFilters } from '../actions';
import { CAR_ASSIGN_FILTER_URL } from '../constants/index';

class CarScreen extends Component {

  componentWillMount() {
    this._fetchFilters();
    this.props.setSelectedFilter(this.props.navigation.state.params.car_assign.status);
  }

  _fetchFilters() {
    axios.get(CAR_ASSIGN_FILTER_URL)
      .then(({ data }) => { this.props.setFilters(data); })
      .catch((error) => { console.error(error); });
  }

  render() {
    const {user, car_assign} = this.props.navigation.state.params;
    return (
      <View>
        <Header
          centerComponent={{ text: 'TASK', style: { color: '#fff' } }}
          leftComponent={
          <Icon
            name='arrow-back'
            color='#fff'
            onPress={() => this.props.navigation.navigate('Home')}
          />}
        />

        <Text h2 style={{textAlign:'center'}}>{car_assign.opt}</Text>

        <Divider style={{marginTop: 20, marginBottom: 20}}/>

        <Text style={{marginBottom: 10}}>Driver: {car_assign.driver}</Text>
        <Text style={{marginBottom: 10}}>Ticket no.: {car_assign.ticketno}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{ width: Dimensions.get('window').width}}>
            <Text>Status:</Text>
          <Picker
            style={{width: 250}}
            onValueChange={(val) => this.props.setSelectedFilter(val)}
            selectedValue={this.props.car_assign_filter.selected_filter}
          >
            {map(this.props.car_assign_filter.filters, (filter, idx) => {
              return <Picker.Item key={idx} label={filter} value={toLower(filter)} />
            })}
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ car_assign_filter }) => ({ car_assign_filter });

export default connect(mapStateToProps, { setSelectedFilter, setFilters })(CarScreen)