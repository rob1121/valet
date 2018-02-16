import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store/index';
import {MAIN_COLOR, RAMP_ADD_CAR_NAV} from './constants';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CarScreen from './screens/CarScreen';
import RampScreen from './screens/RampScreen';
import RampAddCarScreen from './screens/RampAddCarScreen';
import BarCodeScreen from './screens/BarCodeScreen';

export default class App extends Component {
  render() {
    
    const navOption = {
      header: null,
    };

    const navOptionWithHeader = (title) => ({
      title: title,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: MAIN_COLOR}
    });
    
    const MainNavigation = StackNavigator({
      Login: { 
        screen: LoginScreen, 
        navigationOptions: navOption,
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: {...navOptionWithHeader('HOME'), headerLeft: null}
      },
      Ramp: { 
        screen: RampScreen,
        navigationOptions: ({navigation}) => ({
          ...navOptionWithHeader('RAMP'), 
          headerLeft: null,
          headerRight: <Icon name='add' color='#fff' iconStyle={{marginRight: 15}} onPress={() => navigation.navigate(RAMP_ADD_CAR_NAV)}/>
        }),
      },
      Car: { 
        screen: CarScreen,
        navigationOptions: navOptionWithHeader('CAR'),
      },
      RampAddCar: {
        screen: RampAddCarScreen,
      },
      BarCode: {
        screen: BarCodeScreen,
        navigationOptions: navOptionWithHeader('BAR CODE SCANNER'),
      }
    });
  
    return (
      <Provider store={store} >
          <MainNavigation />
      </Provider>
    );
  }
}