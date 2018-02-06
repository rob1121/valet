import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';
import { MAIN_COLOR } from '../constants';
import ScrollView from './ScrollView';

export default class CarScreen extends React.Component {
  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'TASK', style: { color: '#fff' } }}
          leftComponent={<HeaderBackButton tintColor='#fff' onPress={() => this.props.navigation.navigate('Home')} />}
        />


        <ScrollView />
      </View>
    );
  }
}