import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text} from 'react-native';
import { LOGIN_URL, HTTP_HEADER, MAIN_COLOR } from '../constants';
import { connect } from 'react-redux';
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
    const { TextStyle, TextInputStyle, MainContainer} = styles;
    return (
      <View style={MainContainer}>
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
        <Button title="Click Here To Login" 
          onPress={() => this._login()} 
          color={MAIN_COLOR} 
        />
      </View>           
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex:1,
    margin: 10,
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
});

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, { setUser, setUsername, setPassword })(LoginScreen)