import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, List, ListItem, Header } from 'react-native-elements';
import axios from 'axios';
import { toUpper, isEmpty, map } from 'lodash';
import {PARKING_STATUS_UPDATE_URL} from '../constants';
import {assignCars} from '../actions';
import { connect } from 'react-redux';

import { 
} from '../constants';

class CarAvailable extends Component 
{

  _selectTask(task) {
    Alert.alert(
      'Task Confirmation',
      'Are you sure you want to proceed to this task?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this._updateStatus(task)},
      ]
    );
  }

  _updateStatus(task) {
    axios.post(PARKING_STATUS_UPDATE_URL, task).then(({data}) => {
      this.props.assignCars(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  _listItem(carsAssign) {
    const listItems = map(carsAssign, (task, i) => {
      return (<ListItem
          key={i}
          title={`#${task.ticketno}: ${task.opt}`}
          subtitle={task.status_title}
          leftIcon={{ name: 'directions-car' }}
          onPress={() => this._selectTask(task)}
        />);
    });

    return (<List containerStyle={styles.listContainerStyle}>
      {listItems}
    </List>);
  }

  render() {
    const { emptyTaskContainer} = styles;
    const { car_assign, nav, user} = this.props;

    return (
      <View>
        <Header
          centerComponent={{ text: toUpper(`Task for ${this.props.user.name}`), style: { color: '#fff' } }}
        />
          <ScrollView style={{marginTop: 20}}>
          {
            !isEmpty(car_assign.task_list) 
              ? this._listItem(car_assign.task_list) 
              : <Text style={emptyTaskContainer}>No record found!.</Text>
          }
          </ScrollView>
      </View>
    );
  }
}

const styles = {
  listContainerStyle: { 
    marginTop: 0, 
    marginBottom: 20 
  },

  emptyTaskContainer: { 
    marginTop: 20, 
    color: '#000', 
    textAlign: 'center' 
  },
};

const mapStateToProps = ({ user, nav, car_assign }) => ({ user, nav, car_assign });

export default connect(mapStateToProps, {assignCars})(CarAvailable)