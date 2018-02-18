import React, { Component } from 'react';
import {
  Notifications,
} from 'expo';
import { 
  ScrollView,
  TextInput,
  View,
  Alert,
  Text
} from 'react-native';
import {
  Avatar, 
  Button 
} from 'react-native-elements';
import { 
  LOGIN_URL, 
  MAIN_COLOR,
  LOGIN_NAV,
  HOME_NAV,
} from '../constants';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import { 
  setUsername, 
  setPassword, 
  setUser,
  setNavigation,
  setActiveScreen,
} from '../actions';
import {expoToken} from '../services';

class LoginScreen extends Component 
{
  state = {
    loading: false,
  }

  async _login() {
    const { username, password }  = this.props.user;
    const token = await expoToken();
    this.setState(() => ({loading: true}));
    axios.post(LOGIN_URL,{
      token,
      username, 
      password,
    }).then(({data}) => {

      this.setState(() => ({ loading: false }));
      if(data.error) {
        Alert.alert(data.msg);
        return;
      }

      this.props.setUser(data.data);
      this.props.navigation.navigate(HOME_NAV);
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
  }

  componentWillMount() {
    this.props.setNavigation(this.props.navigation);
    this.props.setActiveScreen(LOGIN_NAV);

    if(this.props.user.name) {
      this.props.nav.navigate(HOME_NAV);
    }
  }


  render() {
    const { TitleStyle, LogoContainer, LogoStyle, TextStyle, TextInputStyle, MainContainer, SubMainContainer, ButtonStyle} = styles;
    const { loading } = this.state;
    return (
      <ScrollView scrollEnabled={false} contentContainerStyle={MainContainer}>
        <View style={SubMainContainer}>
          <View style={LogoContainer}>
            <View 
              style={LogoStyle}
              >
            <Avatar
              rounded
              small
              source={require('../assets/icon.png')}
            />
            </View>
            <Text style={[TextStyle, TitleStyle]}>Beach Front Parking Inc</Text>
          </View>
          <TextInput
            placeholder="Enter User username"
            onChangeText={username => this.props.setUsername(username)}
            underlineColorAndroid='transparent'
            style={TextInputStyle}
          />

          <TextInput
            placeholder="Enter User Password"
            onChangeText={password => this.props.setPassword(password)}
            underlineColorAndroid='transparent'
            style={TextInputStyle}
            secureTextEntry={true}
          />
          <Button
            loading={loading}
            onPress={() => this._login()}
            title={!loading ? 'LOG IN' : null}
            buttonStyle={ButtonStyle}
            containerStyle={{ backgroundColor: 'green' }}
            textStyle={{ color: '#fff' }}
          />
          <KeyboardSpacer />
        </View>
      </ScrollView>           
    );
  }
}
 
const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  SubMainContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: MAIN_COLOR,
    padding: 10,
  },

  ButtonStyle: {
    marginTop: 20,
    backgroundColor: '#000',
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 25,
  },
  
  TextInputStyle: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5 , 
  },
  
  TextStyle: {
    fontSize: 20,
    color: "#fff",
    textAlign: 'center', 
    marginBottom: 15
  },

  LogoStyle: {
    borderWidth: 2,
    borderRadius: 25, 
    borderColor: '#fff',
},

  LogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },

  TitleStyle: {
    marginLeft: 10,
    marginTop: 10,
  }
};

const mapStateToProps = ({user, nav}) => ({user, nav});

export default connect(mapStateToProps, { setUser, setUsername, setPassword, setNavigation, setActiveScreen })(LoginScreen)