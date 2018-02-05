import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScrollView from './ScrollView';

export default class CarScreen extends React.Component {
  static navigationOptions = {
    title: 'Car List',
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
