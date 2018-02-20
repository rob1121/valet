import React, {Component} from 'react';
import { 
  View,
  Picker,
  TextInput,
  Alert,
  ScrollView,
  BackHandler
} from 'react-native';
import { 
  Text,
  List,
  ListItem,
  Button, 
} from 'react-native-elements';
import { 
  setStatusId ,
  setActiveScreen
} from '../actions';
import { 
  MAIN_COLOR, 
  WIN_WIDTH,
  CAR_ASSIGN_UPDATE_URL,
  VALET_ON_THE_WAY,
  HOME_NAV,
} from '../constants';

import { 
  map, 
  toLower 
} from 'lodash';
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Barcode from 'react-native-barcode-builder';

class CarScreen extends Component {

  componentWillMount() {
    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        this.props.setActiveScreen(HOME_NAV);
        this.props.nav.navigate(HOME_NAV);

        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  _updateDB() {
    const {cars, selected_index} = this.props.car_assign;
    const car = cars[selected_index];
    this.props.setStatusId({status_id: VALET_ON_THE_WAY});
    axios.post(CAR_ASSIGN_UPDATE_URL, car)
      .then(({ data }) => {
        this.props.nav.navigate(HOME_NAV);
      }).catch((error) => { console.warn(error); });
  }

  render() {
    const {MainContainer} = styles;
    const {
      car_assign,
      setStatusId,
    } = this.props;
    
    const car = car_assign.cars[car_assign.selected_index];

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text>BARCODE: </Text>
          {car.ticketno && <Barcode value={car.ticketno} format="CODE128" />}
          <List>
            <ListItem
              hideChevron
              title={car.ticketno || '-'}
              subtitle='Ticket no.'
            />

            <ListItem
              hideChevron
              title={car.requestor || '-'}
              subtitle='Requestor'
            />

            <ListItem
              hideChevron
              title={car.driver || '-'}
              subtitle='Driver'
            />
          </List>

          <View style={{ marginBottom: 200, marginTop: 20 }}>
            <Button
              backgroundColor={MAIN_COLOR}
              icon={{name: 'car', type: 'material-community'}}
              title='SELECT THIS TASK'
              onPress={() => this._updateDB()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex:1,
    paddingTop: WIN_WIDTH / 2,
  },
};


const mapStateToProps = ({ nav, car_assign }) => ({ nav, car_assign });

export default connect(mapStateToProps, { setStatusId, setActiveScreen })(CarScreen)