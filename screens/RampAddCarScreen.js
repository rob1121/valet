import React, {Component} from 'react';
import { Alert, Picker, View, ScrollView, TextInput, Keyboard, BackHandler, Image, TouchableOpacity} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Button, FormLabel, FormInput, Icon, Divider}  from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import { MAIN_COLOR, CAMERA_NAV, VIEW_PHOTO_NAV, DEFAULT_IMG, RAMP_ADD_CAR_NAV, BAR_CODE_NAV, WIN_WIDTH, RAMP_NAV, ADD_CAR_URL} from '../constants';
import {setActiveScreen, setCarInfo} from '../actions';
import RampLocation from '../components/RampLocation';

class RampAddCar extends Component {
  state = {
    loading: false
  }

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

  componentWillMount () {
    this.props.navigation.setParams({isKeyboardActive: false});
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this._keyboardDidShow());
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._keyboardDidHide());
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress', 
      () => {
        this.props.setActiveScreen(RAMP_NAV);
        this.props.nav.navigate(RAMP_NAV);

        return true;
      }
    );
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.backHandlerListener.remove();
  }

  render() {
    const {setCarInfo, user, car, nav} = this.props;
    const {MainContainer} = styles;

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{margin: 15}}>
            <RampLocation onChange={(val) => this.props.setCarInfo({name: val})}/>
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

          {car.car_category === 'transient' && this._inputContactNumber()}
          {car.car_category !== 'monthly' && this._ticketScanner()}

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

          {this._maybeRenderImage()}
          <View style={{ marginBottom: 200, marginTop: 20 }}>
            <Button
              loading={this.state.loading}
              backgroundColor={MAIN_COLOR}
              icon={{name: 'save'}}
              title='CREATE TICKET' 
              onPress={() => this._save()}
            />
            
          </View>
        </ScrollView>
      </View>
    );
  }

  _onCarCatgoryChange(category) {
    this.props.setCarInfo({car_category: category});

    if(category === 'transient')
      this.props.setCarInfo({name: this.props.user.name});
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

  _save() {
    this.setState(() => ({loading: true}));
    axios.post(ADD_CAR_URL, this.props.car).then(({data}) => {
      this.setState(() => ({ loading: false }));
      if(data.error) {
        Alert.alert(data.msg);
        return;
      }

      this.props.navigation.navigate(RAMP_NAV);
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
  }

  _ticketScanner() {
    return (
      <View>
        <FormLabel>
          TICKET NO.
        </FormLabel>

        <View style={{ flexDirection: 'row', width: WIN_WIDTH }}>
          <View style={{ width: WIN_WIDTH*0.8 }}>
            <FormInput onChangeText={(val) => this.props.setCarInfo({ticketno: val})} value={this.props.car.ticketno}/>
          </View>

          <View style={{ width: WIN_WIDTH * 0.2 }}>
          <Icon
            iconStyle={{marginTop: 10 }}
            name='barcode-scan'
            type='material-community'
            onPress={() => this.props.nav.navigate(BAR_CODE_NAV)}
            />
          </View>
        </View>
      </View>
    )
  }

  _inputContactNumber() {
    return (
      <View>
        <FormLabel>CONTACT NUMBER</FormLabel>
        <FormInput onChangeText={(val) => this.props.setCarInfo({ customercontactno: val })} value={this.props.car.customercontactno} />
      </View>
    );
  }

  _maybeRenderImage = () => {
    let { image } = this.props.car;
    const epoch = Math.round((new Date()).getTime() / 1000);
    
    if (!image) {
      return;
    }
    
    return (
      <TouchableOpacity onPress={() => this._imgPickerOption()} style={{ margin: 15, width: 250, height: 250, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)', borderRadius: 5 }} >
        <Image source={{ uri: `${image}?epoch=${epoch}` }} style={{ width: 250, height: 250 }}  />
      </TouchableOpacity>
    );
  };

  _imgPickerOption() {
    Alert.alert(
      'Upload Image',
      'Pick action',
      [
        { text: 'Zoom', onPress: () => this.props.nav.navigate(VIEW_PHOTO_NAV) },
        { text: 'Capture', onPress: () => this.props.nav.navigate(CAMERA_NAV) },
        { text: 'Remove', onPress: () => console.log('Ask me later pressed') },
      ],
      { cancelable: false }
    )
  };
}

const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex:1,
    paddingTop: WIN_WIDTH / 2,
  },
};

const mapStateToProps = ({ car, user, nav }) => ({ car, user, nav });

export default connect(mapStateToProps, { setCarInfo, setActiveScreen })(RampAddCar);