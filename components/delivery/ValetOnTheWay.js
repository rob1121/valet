import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Alert} from 'react-native';
import axios from 'axios';
import {toUpper} from 'lodash';
import {Header, Button, Icon, List, ListItem} from 'react-native-elements';
import Barcode from 'react-native-barcode-builder';
import {assignCars} from '../../actions';
import { MAIN_COLOR, PARKING_STATUS_UPDATE_URL } from '../../constants';
import Confirm from '../Confirm';

class ValetOnTheWay extends Component {
  state = {
    laoding: false
  }

  render() {
    const {active_task} = this.props.car_assign;
    
    return (
      <View>
        <Header
          centerComponent={{ text: toUpper(active_task.status_title), style: { color: '#fff' } }}
        />
        <Barcode value={active_task.ticketno} format="CODE128" />
        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            title={active_task.ticketno || '-'}
            subtitle='Ticket No.'
          />
          
          <ListItem
            title={active_task.requestor || '-'}
            subtitle='Requestor'
          />
          
          <ListItem
            title={active_task.driver}
            subtitle='Driver'
          />
        </List>
        <Button
          loading={this.state.loading}
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{backgroundColor: MAIN_COLOR}}
          title='UPDATE STATUS'
          onPress={() => <Confirm 
            title='Task Confirmation'
            subtitle='Are you sure you have completed this task?' 
            onPress={() => this._updateStatus()} />}
        />
      </View>
    )
  }

  _updateStatus() {
    this.setState(() => ({loading: true}));
    axios.post(PARKING_STATUS_UPDATE_URL, this.props.car_assign.active_task)
    .then(({data}) => {
      this.setState(() => ({loading: false}));
      this.props.assignCars(data);
    }).catch((error) => {
      console.log(error);
      this.setState(() => ({loading: false}));
    });
  }
}

const mapStateToProps = ({ car_assign }) => ({ car_assign });

export default connect(mapStateToProps, {assignCars})(ValetOnTheWay);
