import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MainScreen extends Component
{
  static navigationOptions = {
    title: 'Homes',
  }

  render()
  {
    return (
      <View style={{flex: 1 }}>
        <Text>Main View</Text>
      </View>
    );
  }
}
