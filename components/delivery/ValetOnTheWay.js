import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import axios from 'axios';
import {Button, Icon, List, ListItem} from 'react-native-elements';
import Barcode from 'react-native-barcode-builder';
import { MAIN_COLOR, PARKING_STATUS_UPDATE_URL } from '../../constants';

class ValetOnTheWay extends Component {
  render() {
    const {active_task} = this.props.car_assign;
    
    return (
      <View>
        <Barcode value={active_task.ticketno} format="CODE128" />
        <List containerStyle={{marginBottom: 20}}>
          <ListItem
            title={active_task.ticketno}
            subtitle='ticket no.'
          />
          
          <ListItem
            title={active_task.requestor}
            subtitle='Requestor'
          />
          
          <ListItem
            title={active_task.requestor}
            subtitle='Requestor'
          />
          
          <ListItem
            title={active_task.status_title}
            subtitle='status'
          />
        </List>
        <Button
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{backgroundColor: MAIN_COLOR}}
          title='DONE'
          onPress={() => this._updateStatus()}
        />
      </View>
    )
  }

  _updateStatus() {
    axios.post(PARKING_STATUS_UPDATE_URL, params);
  }
}

const mapStateToProps = ({ car_assign }) => ({ car_assign });

export default connect(mapStateToProps)(ValetOnTheWay);
