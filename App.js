import React, { Component } from 'react';
import { BackHandler} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store/index';
import {MAIN_COLOR, RAMP_ADD_CAR_NAV} from './constants';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RampScreen from './screens/RampScreen';
import RampAddCarScreen from './screens/RampAddCarScreen';
import BarCodeScreen from './screens/BarCodeScreen';
import ViewPhotoScreen from './screens/ViewPhotoScreen';

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
        navigationOptions: { ...navOption, headerLeft: null}
      },
      Ramp: { 
        screen: RampScreen,
        navigationOptions: ({navigation}) => ({
          ...navOptionWithHeader('RAMP'), 
          headerLeft: null,
          headerRight: <Icon name='add' color='#fff' iconStyle={{marginRight: 15}} onPress={() => navigation.navigate(RAMP_ADD_CAR_NAV)}/>
        }),
      },
      RampAddCar: {
        screen: RampAddCarScreen,
        navigationOptions: navOptionWithHeader('VALET INSERT'),
      },
      BarCode: {
        screen: BarCodeScreen,
        navigationOptions: navOptionWithHeader('BAR CODE SCANNER'),
      },
      ViewPhoto: {
        screen: ViewPhotoScreen,
        navigationOptions: navOptionWithHeader('VIEW'),
      }
    });
  
    return (
      <Provider store={store} >
          <MainNavigation />
      </Provider>
    );
  }
}