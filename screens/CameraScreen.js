
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import Exponent, { Permissions, Constants, ImagePicker, registerRootComponent } from 'expo';
import { connect } from 'react-redux';
import { setActiveScreen, updateActiveCar } from '../actions';
import { IMG_API_URL, RAMP_ADD_CAR_NAV, HOME_NAV } from '../constants';


class CameraScreen extends React.Component {
  state = {
    uploading: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    this.backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        this.props.setActiveScreen(RAMP_ADD_CAR_NAV);
        this.props.nav.navigate(RAMP_ADD_CAR_NAV);

        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandlerListener.remove();
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={() => this._takePhoto()} title="Take a photo" />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        if (!uploadResult.error) {
          console.log(this.props.user);
          this.props.updateActiveCar({ car_plate_no: 'qaqo', img_path: uploadResult.data.location });
          this.props.nav.navigate(HOME_NAV);
        } else {
          alert(uploadResult.msg);
        }
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const epoch = Math.round((new Date()).getTime() / 1000);
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo_${epoch}.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(IMG_API_URL, options);
}

const mapStateToProps = ({ nav, user }) => ({ nav, user });

export default connect(mapStateToProps, { updateActiveCar, setActiveScreen })(CameraScreen);