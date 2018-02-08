import React, {Component} from 'react';
import { ScrollView, TextInput, View, Alert, TouchableOpacity, Text} from 'react-native';
import { LOGIN_URL, HTTP_HEADER, MAIN_COLOR } from '../constants';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import { setUsername, setPassword, setUser } from '../actions';

class LoginScreen extends Component 
{
  _login() {
    const { username, password }  = this.props.user;
    
    axios.get(LOGIN_URL,{
      params: {
        username, 
        password,
      }}).then(({data}) => {
      if(data.error) {
        Alert.alert(data.msg);
        return;
      }

      this.props.setUser(data.data);
      this.props.navigation.navigate('Home');

    }).catch((error) => {
      console.error(error);
    });
      
  }

  render() {
    const { TextStyle, TextInputStyle, MainContainer, button} = styles;
    return (
      <ScrollView scrollEnabled={false} contentContainerStyle={MainContainer}>
        <Text style= {TextStyle}>User Login Form</Text>
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
        <TouchableOpacity
          onPress={() => this._login()} 
          style={button} 
        >
        <Text style={{color:'#fff'}}> Click Here To Login </Text>
      </TouchableOpacity>
        <KeyboardSpacer/>
      </ScrollView>           
    );
  }
}
 
const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex:1,
    margin: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    padding: 10
  },
  
  TextInputStyle: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 5 , 
  },
  
  TextStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center', 
    marginBottom: 15
  },
};

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, { setUser, setUsername, setPassword })(LoginScreen)