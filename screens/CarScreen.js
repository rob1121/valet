import React from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class CarScreen extends React.Component {
  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'TASK', style: { color: '#fff' } }}
          leftComponent={
          <Icon
            name='arrow-back'
            color='#fff'
            onPress={() => this.props.navigation.navigate('Home')}
          />}
        />
      </View>
    );
  }
}