import React, {Component} from 'react';
import { Alert, Picker, View, ScrollView, TextInput, BackHandler} from 'react-native';
import {Header, Button, FormLabel, FormInput, Text}  from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import { MAIN_COLOR, WIN_WIDTH, RAMP_ADD_CAR_NAV, ADD_CAR_URL, HOME_NAV} from '../constants';
import {resetCarInfo, setActiveScreen, setCarInfo} from '../actions';
import Hotel from '../components/Hotel';
import Transient from '../components/Transient';
import Monthly from '../components/Monthly';
import Barcode from '../components/Barcode';
import Footer from '../components/Footer';
import RampLocation from '../components/RampLocation';
import CarPicker from '../components/CarPicker';

class RampAddCar extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.props.setCarInfo({
      uid: this.props.user.id,
      name: this.props.user.name
    });
  }

  componentWillMount () {
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress', 
      () => {
        if(this.props.nav.active_screen != HOME_NAV) {
          this.props.setActiveScreen(HOME_NAV);
          this.props.nav.navigate(HOME_NAV);

          return true;
        }

        return false;
      }
    );

    this.props.setActiveScreen(RAMP_ADD_CAR_NAV);
  }

  componentWillUnmount () {
    this.backHandlerListener.remove();
  }

  render() {
    const {setCarInfo, user, car, nav} = this.props;

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          
        <Header
          centerComponent={{ text: 'RAMP GUY', style: { color: '#fff' } }}
        />

          <View style={{margin: 15}}>
            <RampLocation value={this.props.car.location} onChange={(val) => this.props.setCarInfo({location: val})}/>
          </View>

          <FormLabel>CAR CATEGORY</FormLabel>
          <Picker
            style={{margin: 15}}
            selectedValue={car.car_category}
            onValueChange={(val) => this._onCarCatgoryChange(val)}>
            <Picker.Item label="TRANSIENT" value="transient" />
            <Picker.Item label="HOTEL" value="hotel" />
            <Picker.Item label="MONTHLY" value="monthly" />
          </Picker>

          <FormLabel>OPTION</FormLabel>
          <Picker
            style={{ margin: 15 }}
            selectedValue={car.opt}
            onValueChange={(val) => setCarInfo({ opt: val })}>
            <Picker.Item label="DELIVERY" value="delivery" />
            <Picker.Item label="PICKUP" value="pickup" />
          </Picker>

          {car.car_category === 'hotel' && <Hotel />}
          {car.car_category === 'transient' && <Transient />}
          {car.car_category === 'monthly' && <Monthly />}

          <Barcode />

          <FormLabel>CAR PLATE NO</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ plateno: val })} value={car.plateno} />

          <FormLabel>CAR MAKE&MODEL</FormLabel>
          <View style={{margin: 15}}>
            <CarPicker value={car.model} onValueChange={(val) => setCarInfo({model: val})} />
          </View>

          <FormLabel>COMMENT </FormLabel>
          <TextInput
            enablesReturnKeyAutomatically={true}
            returnKeyType='next'
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid='transparent'
            style={{ margin: 15, padding: 5, height: 100, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => setCarInfo({ comment: text })}
            value={car.comment} />

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
        <Footer />
      </View>
    );
  }

  _onCarCatgoryChange(category) {
    this.props.setCarInfo({car_category: category});

    if(category === 'transient')
      this.props.setCarInfo({name: this.props.user.name});
  }

  _save() {
    this.setState(() => ({loading: true}));
    axios.post(ADD_CAR_URL, this.props.car).then(({data}) => {
      this.setState(() => ({ loading: false }));
      if(data.error) {
        Alert.alert(data.msg, JSON.stringify(data.data));
        return;
      }

      this.props.resetCarInfo();
      this.props.navigation.navigate(HOME_NAV);
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
  }
}

const mapStateToProps = ({ car, user, nav }) => ({ car, user, nav });

export default connect(mapStateToProps, { resetCarInfo, setCarInfo, setActiveScreen })(RampAddCar);