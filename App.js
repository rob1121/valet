import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CarScreen from './screens/CarScreen';

export default class App extends Component {
  render() {
    const navOption = ({ navigation }) => ({
      drawerLockMode: 'locked-closed',
      drawerLabel: () => null,
    });

    const MainNavigation = DrawerNavigator({
      LoginScreen: {
        screen: LoginScreen,
        navigationOptions: navOption,
      },
      Home: { screen: HomeScreen },
      Car: { 
        screen: CarScreen,
        navigationOptions: navOption,
      },
    }, {drawerWidth: 300});
  
    return (
      <Provider store={store} >
          <MainNavigation />
      </Provider>
    );
  }
}