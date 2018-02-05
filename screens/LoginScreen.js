import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text} from 'react-native';
import { connect } from 'react-redux';
import { setUsername, setPassword } from '../actions';

class LoginScreen extends Component 
{
    // Setting up Login Activity title.
    static navigationOptions = {
       title: 'Login',
    };

      _login = () =>{
 
        const { username, password }  = this.props.user ;
        
        
       fetch('https://reactnativecode.000webhostapp.com/User_Login.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           username,
           password,
         })
        
       }).then((response) => response.json())
        .then((responseJson) => {
  
          // If server response message same as Data Matched
        if(responseJson === 'Data Matched')
          {
  
              //Then open Profile activity and send user username to profile activity.
              this.props.navigation.navigate('Home');
  
          }
          else{
  
            Alert.alert(responseJson);
          }
  
        }).catch((error) => {
          console.error(error);
        });
        
         }

         render() {
          return (
       
      <View style={styles.MainContainer}>
        <Text style= {styles.TextComponentStyle}>User Login Form</Text>
  
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User username"
  
          onChangeText={username => this.props.setUsername({username})}
  
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
  
          style={styles.TextInputStyleClass}
        />
  
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
  
          onChangeText={password => this.props.setPassword({password})}
  
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
  
          style={styles.TextInputStyleClass}
  
          secureTextEntry={true}
        />
  
        <Button title="Click Here To Login" onPress={this._login} color="#2196F3" />
      </View>
                  
          );
        }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
},
 
TextInputStyleClass: {
 
textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',
 
 // Set border Radius.
 borderRadius: 5 ,
 
},
 
 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 }
});

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, { setUsername, setPassword })(LoginScreen)