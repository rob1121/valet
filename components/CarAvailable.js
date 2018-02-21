import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { findIndex } from 'lodash';
import axios from 'axios';
import { isEmpty, map } from 'lodash';
import { connect } from 'react-redux';

import { 
} from '../constants';

class CarAvailable extends Component 
{
  _listItem(carsAssign) {
    const listItems = map(carsAssign, (task, i) => {
      return (<ListItem
          key={i}
          title={`#${task.ticketno}: ${task.opt}`}
          subtitle={task.status_title}
          leftIcon={{ name: 'directions-car' }}
          onPress={() => this.props.nav.navigate('Car')}
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
      <View style={{padding: 5}}>
          <Text style={{ marginBottom: 20 }} h6>Task for {this.props.user.name}:</Text>
          <ScrollView>
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

export default connect(mapStateToProps)(CarAvailable)