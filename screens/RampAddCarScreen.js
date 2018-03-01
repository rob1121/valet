import React, {Component} from 'react';
import { Alert, Picker, View, ScrollView, TextInput, BackHandler} from 'react-native';
import {Header, Button, FormLabel, FormInput, Icon, Divider}  from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import { MAIN_COLOR, WIN_WIDTH, RAMP_ADD_CAR_NAV, ADD_CAR_URL, HOME_NAV} from '../constants';
import {setActiveScreen, setCarInfo} from '../actions';
import Hotel from '../components/Hotel';
import Transient from '../components/Transient';
import Monthly from '../components/Monthly';
import Footer from '../components/Footer';

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
    const {MainContainer} = styles;

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          
        <Header
            centerComponent={{ text: 'RAMP GUY', style: { color: '#fff' } }}
          />

          <FormLabel>CAR CATEGORY</FormLabel>
          <Picker
            style={{marginLeft: 10}}
            selectedValue={car.car_category}
            onValueChange={(val) => this._onCarCatgoryChange(val)}>
            <Picker.Item label="TRANSIENT" value="transient" />
            <Picker.Item label="HOTEL" value="hotel" />
            <Picker.Item label="MONTHLY" value="monthly" />
          </Picker>

          {car.car_category === 'hotel' && <Hotel />}
          {car.car_category === 'transient' && <Transient />}
          {car.car_category !== 'monthly' && <Monthly />}

          <FormLabel>NAME</FormLabel>
          {this._inputTypeBaseOnCagetory(car.car_category)}

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

      this.props.navigation.navigate(HOME_NAV);
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
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

export default connect(mapStateToProps, { setCarInfo, setActiveScreen })(RampAddCar);