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
        transitionConfig: () => ({
          transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
          },
          screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.99, index],
              outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateY }] };
          },
        }),
      },
    }, {drawerWidth: 300});
  
    return (
      <Provider store={store} >
          <MainNavigation />
      </Provider>
    );
  }
}