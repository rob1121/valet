import React, {Component} from 'react';
import { Image, ScrollView, TextInput, View, Alert, Text} from 'react-native';
import { Button } from 'react-native-elements';
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
    const { LogoStyle, TextStyle, TextInputStyle, MainContainer, SubMainContainer, ButtonStyle} = styles;
    return (
      <ScrollView scrollEnabled={false} contentContainerStyle={MainContainer}>
        <View style={SubMainContainer}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image source={require('../assets/icon.png')} style={LogoStyle} />
          </View>
          <Text style={TextStyle}>Beach Front Parking</Text>
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
            onPress={() => this._login()}
            title='LOG IN'
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff' ,
  }
};

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, { setUser, setUsername, setPassword })(LoginScreen)