import React, {Component} from 'react';
import { StyleSheet, View, Button, Text} from 'react-native';

export default class Profile extends Component 
{
  static navigationOptions =
  {
     title: 'ProfileActivity',
   
  };

  render()
   {
 
     const {goBack} = this.props.navigation;
 
      return(
         <View style = { styles.MainContainer }>
 
            <Text style = {styles.TextComponentStyle}> { JSON.stringify(this.props.navigation) } </Text>
 
            <Button title="Click here to Logout" onPress={ () => goBack(null) } />
 
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
 
 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 }
});