import React, { Component } from 'react';
import {
  View, 
  Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store/index';
import {MAIN_COLOR} from './constants';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CarScreen from './screens/CarScreen';
import RampScreen from './screens/RampScreen';

export default class App extends Component {
  render() {
    
    const navOption = {
      header: null,
    };

    const navOptionWithHeader = (title) => ({
      title: title,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: MAIN_COLOR},
      headerTitleStyle: {textAlign: 'center', alignSelf:'center'}
    });
    
    const MainNavigation = StackNavigator({
      Login: { 
        screen: LoginScreen, 
        navigationOptions: navOption,
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: {...navOptionWithHeader('HOME'), headerLeft: null},
      },
      Ramp: { 
        screen: RampScreen,
        navigationOptions: {...navOptionWithHeader('RAMP'), headerLeft: null},
      },
      Car: { 
        screen: CarScreen,
        navigationOptions: navOptionWithHeader('CAR'),
      },
    });
  
    return (
      <Provider store={store} >
          <MainNavigation />
      </Provider>
    );
  }
}