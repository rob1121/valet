import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ScrollView from './ScrollView';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'Home',
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>Home Screen</Text>
        <Button
          title="Task List"
          onPress={() => this.props.navigation.navigate('Car')}
        />
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
