import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';
import { Alert } from 'react-native';

const color = '#fff';

export default class HeaderComponent extends Component {
  _logout() {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.props.navigation.navigate('LoginScreen') },
      ],
      { cancelable: false }
    );
  }

  render() {
    const {navigation, title} = this.props;

    return (
      <Header
        centerComponent={{ text: title, style: { color } }}
        leftComponent={
          <Icon name='menu'
            color={color}
            onPress={() => navigation.navigate('DrawerToggle')}
          />
        }
        rightComponent={
          <Icon name='sign-out'
            type='font-awesome'
            color={color} 
            onPress={() => this._logout()}
          />
        }
      />
    );
  }
}