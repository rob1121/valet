import React, {Component} from 'react';
import {Picker, View, ScrollView} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Button, FormLabel, FormInput}  from 'react-native-elements';
import {connect} from 'react-redux';
import {MAIN_COLOR, RAMP_ADD_CAR_NAV, WIN_WIDTH} from '../constants';
import {setCarInfo} from '../actions';

class RampAddCar extends Component {
  componentWillMount() {
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

  render() {
    const {setCarInfo, user, car} = this.props;
    const {MainContainer} = styles;

    return (
      <View style={{flex: 1}}>
        <ScrollView scrollEnabled={false} contentContainerStyle={MainContainer}>
          <FormLabel>TICKET NO.</FormLabel>
          <FormInput onChangeText={(val) => setCarInfo({ticketno: val})} value={car.ticketno}/>

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

const mapStateToProps = ({ car, user }) => ({ car, user });

export default connect(mapStateToProps, { setCarInfo })(RampAddCar);