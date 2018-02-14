import React, { Component } from 'react';
import { Alert, View, Picker, ScrollView, Text } from 'react-native';
import { Divider, } from 'react-native-elements';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarFilter from '../components/CarFilter';
import CarAvailable from '../components/CarAvailable';
import RampLocation from '../components/RampLocation';

class HomeScreen extends Component 
{
  render() {
    const {user} = this.props;

    return (
      <View style={{flex: 1}}>
        <Header 
          title='HOME'
          navigation={this.props.navigation}
        />
        {user.type === 'ramp' && <RampLocation />}
        <CarFilter />
        <Divider style={{marginBottom: 20}}/>
        <CarAvailable />
        <Footer />
      </View>
    );
  }
}

const styles = {
  listContainerStyle: { 
    marginTop: 0, 
    marginBottom: 20 
  },

  emptyTaskContainer: { 
    marginTop: 20, 
    color: '#000', 
    textAlign: 'center' 
  },
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(HomeScreen)