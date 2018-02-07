import React, {Component} from 'react';
import { View, Picker, Dimensions } from 'react-native';
import { Icon, Header, Text, Divider, List, ListItem, Button } from 'react-native-elements';
import { map, toLower } from 'lodash';
import { connect } from 'react-redux';
import { setSelectedFilter, setFilters } from '../actions';
import { MAIN_COLOR } from '../constants/index';

class CarScreen extends Component {
  componentWillMount() {
    const idx = this.props.car_assign.selected_index;
    this.props.setSelectedFilter(toLower(this.props.car_assign.cars[idx].status));
  }

  render() {
    const car = this.props.car_assign.cars[this.props.car_assign.selected_index];

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
        <Text h2 style={{textAlign:'center'}}>{car.opt}</Text>

        <List containerStyle={{marginBottom: 20}}>
        
          <ListItem
            hideChevron
            title={car.ticketno}
            subtitle='Ticket no.'
          />
          
          <ListItem
            hideChevron
            title={car.driver}
            subtitle='Driver'
          />

          <ListItem
            hideChevron
            title={(<Picker
              onValueChange={(val) => this.props.setSelectedFilter(val)}
              selectedValue={this.props.car_assign_filter.selected_filter}
            >
              {map(this.props.car_assign_filter.filters, (filter, idx) => {
                return <Picker.Item key={idx} label={filter} value={toLower(filter)} />
              })}
            </Picker>)}
            subtitle='Status'
          />
          
        </List>
        <Button
          backgroundColor={MAIN_COLOR}
          icon={{name: 'save'}}
          title='UPDATE' />
      </View>
    );
  }
}

const mapStateToProps = ({ user, car_assign_filter, car_assign }) => ({ user, car_assign_filter, car_assign });

export default connect(mapStateToProps, { setSelectedFilter, setFilters })(CarScreen)