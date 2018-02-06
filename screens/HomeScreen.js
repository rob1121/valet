import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Header from '../components/Header';
import ScrollView from './ScrollView';

export default class HomeScreen extends Component 
{
  render() {
    return (
      <View>
        <Header 
          title='HOME' 
          navigation={this.props.navigation}
        />

        <View>
          <ScrollView />
          <Button title="Click Here To Login"
            onPress={() => this.props.navigation.navigate('Car')}
            color={'#222'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});