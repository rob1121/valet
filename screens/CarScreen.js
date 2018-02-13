import React, {Component} from 'react';
import { 
  View,
  Picker,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { 
  Icon,
  Header,
  Text,
  Divider,
  List,
  ListItem,
  Button, 
} from 'react-native-elements';
import { 
  setComment, 
  setStatusId 
} from '../actions';
import { 
  MAIN_COLOR, 
  CAR_ASSIGN_UPDATE_URL 
} from '../constants';
import { 
  map, 
  toLower 
} from 'lodash';
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

class CarScreen extends Component {
  _updateDB() {
    const {cars, selected_index} = this.props.car_assign;
    const car = cars[selected_index];

    axios.get(CAR_ASSIGN_UPDATE_URL, {params: car})
      .then(({ data }) => {
        Alert.alert(data.msg);
        this.props.navigation.navigate('Home');
      }).catch((error) => { console.warn(error); });
  }

  render() {
    const {MainContainer} = styles;
    const {
      car_assign,
      navigation,
      setStatusId,
      car_assign_filter,
      setComment,
    } = this.props;
    
    const car = car_assign.cars[car_assign.selected_index];
    const  options = car_assign_filter.filters[toLower(car.opt)];

    return (
      <View style={{flex: 1}}>
      
        <Header
          centerComponent={{ text: car.opt, style: { color: '#fff' } }}
          leftComponent={
          <Icon
            name='arrow-back'
            color='#fff'
            onPress={() => navigation.navigate('Home')}
          />}
        />
        <ScrollView scrollEnabled={false} contentContainerStyle={MainContainer}>
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

            <ListItem
              hideChevron
              title={(<Picker
                onValueChange={(id) => setStatusId(id)}
                selectedValue={car.status_id}
              >
                {map(options, (filter, idx) => {
                  return <Picker.Item key={idx} label={filter.label} value={filter.value} />
                })}
              </Picker>)}
              subtitle='Status'
            />
            
          </List>

          <View style={{margin: 20}}>
            <Text>Comment:</Text>
            <TextInput
              returnKeyType='next'
              style={{padding: 5}}
              multiline={true}
              numberOfLines={8}
              onChangeText={(text) => setComment(text)}
              value={car.comment}
            />
          </View>

          <View style={{ marginBottom: 200, marginTop: 20 }}>
            <Button
              backgroundColor={MAIN_COLOR}
              icon={{name: 'save'}}
              title='UPDATE'
              onPress={() => this._updateDB()}
            />
          </View>
          <KeyboardSpacer/>
        </ScrollView>  
        <Footer />
      </View>
    );
  }
};

const styles = {
  MainContainer: {
    justifyContent: 'center',
    flex:1,
    paddingTop: Dimensions.get('window').width / 2,
  },
};


const mapStateToProps = ({ user, car_assign_filter, car_assign }) => ({ user, car_assign_filter, car_assign });

export default connect(mapStateToProps, { setComment, setStatusId })(CarScreen)