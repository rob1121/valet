import React from 'react';
import { Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Camera, Permissions } from 'expo';
import {setActiveScreen} from '../actions';
import {RAMP_ADD_CAR_NAV} from '../constants';
import {connect} from 'react-redux';

class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
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

  componentWillUnmount () {
    this.backHandlerListener.remove();
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, {setActiveScreen})(CameraScreen);
