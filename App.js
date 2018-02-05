import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CarScreen from './screens/CarScreen';

const App = () => {
  const MainNavigation = StackNavigator({
    Main: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    Car: { screen: CarScreen },
  });

  return (
    <Provider store={store} >
        <MainNavigation />
      </Provider>
  );
};


export default App;
