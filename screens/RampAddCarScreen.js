import React, {Component} from 'react';
import {Picker, View, ScrollView, TextInput, Keyboard} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Button, FormLabel, FormInput, Icon, Divider}  from 'react-native-elements';
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
          header: null
        };
      } else {
        retVal = {
          title: 'VALET INSERT',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: MAIN_COLOR }
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

  _inputTypeBaseOnCagetory(category) {
    const { car, setCarInfo } = this.props;
    let fInputField = '';

    if (car.car_category === 'monthly') {
      fInputField = (<FormInput onChangeText={(val) => setCarInfo({ name: val })} value={car.name} />);
    } else if (car.car_category === 'transient') {
      fInputField = (<FormInput onChangeText={(val) => setCarInfo({ name: user.name })} value={car.name} />);
    } else if (car.car_category === 'hotel') {
      fInputField = (<Picker
        style={{ marginLeft: 10 }}
        selectedValue={car.name}
        onValueChange={(val) => setCarInfo({ name: val })}>
        <Picker.Item label="hotel1" value="hotel1" />
        <Picker.Item label="hotel2" value="hotel2" />
        <Picker.Item label="hotel3" value="hotel3" />
      </Picker>);
    }

    return fInputField;
  }

  render() {
    const {setCarInfo, user, car, nav} = this.props;
    const {MainContainer} = styles;

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={MainContainer}>

          <FormLabel>
            TICKET NO.
          </FormLabel>

        <View style={{ flexDirection: 'row', width: WIN_WIDTH }}>

            <View style={{ width: WIN_WIDTH*0.8 }}>
          <FormInput onChangeText={(val) => setCarInfo({ticketno: val})} value={car.ticketno}/>

            </View>

            <View style={{ width: WIN_WIDTH * 0.2 }}>
            <Icon
              iconStyle={{marginTop: 10 }}
              name='barcode-scan'
              type='material-community'
              onPress={() => nav.navigate(BAR_CODE_NAV)}
              />
            </View>
          </View>

          <FormLabel>CAR CATEGORY</FormLabel>
          <Picker
            style={{marginLeft: 10}}
            selectedValue={car.car_category}
            onValueChange={(val) => this._onCarCatgoryChange(val)}>
            <Picker.Item label="TRANSIENT" value="transient" />
            <Picker.Item label="HOTEL" value="hotel" />
            <Picker.Item label="MONTHLY" value="monthly" />
          </Picker>

          <FormLabel>NAME</FormLabel>
          {this._inputTypeBaseOnCagetory(car.car_category)}

          <FormLabel>OPTION</FormLabel>
          <Picker
            style={{marginLeft: 10}}
            selectedValue={car.opt}
            onValueChange={(val) => setCarInfo({opt: val})}>
            <Picker.Item label="DELIVERY" value="delivery" />
            <Picker.Item label="PICKUP" value="pickup" />
          </Picker>

          <Divider />

          <FormLabel>CAR PLATE NO</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ platno: val })} value={car.platno} />

          <FormLabel>CAR MAKE</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ make: val })} value={car.make} />

          <FormLabel>CAR MODEL</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ model: val })} value={car.model} />

          <FormLabel>CAR MODEL</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ model: val })} value={car.model} />

          <FormLabel>CAR MODEL</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ model: val })} value={car.model} />

          <FormLabel>CAR MODEL</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ model: val })} value={car.model} />

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