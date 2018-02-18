import React, { Component } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import {connect} from 'react-redux';
import onBack from 'react-native-onback';
import {setActiveScreen} from '../actions';
import {HOME_NAV} from '../constants';
import Footer from '../components/Footer';
import CarFilter from '../components/CarFilter';
import CarAvailable from '../components/CarAvailable';
import RampLocation from '../components/RampLocation';

class HomeScreen extends Component 
{
  componentWillMount() {  
    this.props.setActiveScreen(HOME_NAV);
  }

  componentDidMount() {
    onBack(() => {
      this.props.setActiveScreen(HOME_NAV);
    }, this);
  }

  componentWillUnmount() {
    onBack.unmount(this);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <CarFilter />
        <Divider style={{marginBottom: 20}}/>
        <CarAvailable />
        <Footer />
      </View>
    );
  }
}

export default connect(null, {setActiveScreen})(HomeScreen);
