import React, {Component} from 'react';
import {Picker, View, ScrollView, TextInput, Keyboard} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Button, FormLabel, FormInput, Icon}  from 'react-native-elements';
import {connect} from 'react-redux';
import {MAIN_COLOR, RAMP_ADD_CAR_NAV, BAR_CODE_NAV, WIN_WIDTH} from '../constants';
import {setCarInfo} from '../actions';

class RampAddCar extends Component {
  static navigationOptions = ({ navigation }) => {
    let retVal = {
      title: 'VALET INSERT',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: MAIN_COLOR}
    };

    if(navigation.state.params != undefined) {
      if(navigation.state.params.isKeyboardActive) {
        retVal = {
          title: 'VALET INSERT',
          header: null
        };
      }
    
      return retVal;
    }
};

  componentDidMount() {
    this.props.setCarInfo({
      uid: this.props.user.id,
      name: this.props.user.name
    });
  }

  _onCarCatgoryChange(category) {
    this.props.setCarInfo({car_category: category});

    if(category === 'transient')
      this.props.setCarInfo({name: this.props.user.name});
  }

  componentWillMount () {
    this.props.navigation.setParams({isKeyboardActive: false});
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this._keyboardDidShow());
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._keyboardDidHide());
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.props.navigation.setParams({isKeyboardActive: true});
  }

  _keyboardDidHide () {
    this.props.navigation.setParams({isKeyboardActive: false});
  }

  render() {
    const {setCarInfo, user, car, nav} = this.props;
    const {MainContainer} = styles;

    return (
      <View style={{flex: 1}}>
        <ScrollView scrollEnabled={false} contentContainerStyle={MainContainer}>
          <FormLabel>TICKET NO.</FormLabel>
          
          <View style={{ flexDirection: 'row', width: WIN_WIDTH }}>
            <TextInput onChangeText={(val) => setCarInfo({ticketno: val})} value={car.ticketno} inlineImageLeft='home' style={{margin: 15, width: '80%'}} />
      
            <Icon
              name='barcode-scan'
              type='material-community'
              onPress={() => nav.navigate(BAR_CODE_NAV)}
            />
          </View>
          <FormLabel>CAR CATEGORY</FormLabel>
          <Picker
            style={{marginLeft: 10}}
            selectedValue={car.car_category}
            onValueChange={(val) => this._onCarCatgoryChange(val)}>
            <Picker.Item label="TRANCIENT" value="transient" />
            <Picker.Item label="HOTEL" value="hotel" />
          </Picker>

          <FormLabel>NAME</FormLabel>
          {car.car_category === 'transient' && <FormInput onChangeText={(val) => setCarInfo({name: user.name})} value={car.name}/>}
          {car.car_category === 'hotel' && <Picker
            style={{marginLeft: 10}}
            selectedValue={car.name}
            onValueChange={(val) => setCarInfo({name: val})}>
            <Picker.Item label="TRANCIENT" value="transient" />
            <Picker.Item label="HOTEL" value="hotel" />
          </Picker>}

          <FormLabel>OPTION</FormLabel>
          <Picker
            style={{marginLeft: 10}}
            selectedValue={car.opt}
            onValueChange={(val) => setCarInfo({opt: val})}>
            <Picker.Item label="DELIVERY" value="delivery" />
            <Picker.Item label="PICKUP" value="pickup" />
          </Picker>

          <View style={{ marginBottom: 200, marginTop: 20 }}>
            <Button
              backgroundColor={MAIN_COLOR}
              icon={{name: 'save'}}
              title='CREATE TICKET'
            />
          </View>
          <KeyboardSpacer/>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex:1,
    paddingTop: WIN_WIDTH / 2,
  },
};

const mapStateToProps = ({ car, user, nav }) => ({ car, user, nav });

export default connect(mapStateToProps, { setCarInfo })(RampAddCar);