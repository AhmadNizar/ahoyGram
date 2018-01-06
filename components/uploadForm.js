import React, { Component } from 'react'
import { View, Text, AsyncStorage, CameraRoll, Button, TouchableOpacity, Vibration} from 'react-native'
import { Container, } from 'native-base'
import { Header } from 'react-native-elements'
import { Camera, Permissions, FileSystem } from 'expo';

class UploadContent extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      flash: 'off',
      zoom: 0,
      autoFocus: 'on',
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      ratios: [],
      photoId: 1,
      showGallery: false,
      photos: [],
      faces: [],
    };
  }
  

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
          let photoId= this.state.photoId - 1
          this.props.navigation.navigate('Image',{photoId })          
        });
      });
    }
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
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
          <Camera style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }} 
          type={this.state.type}
          >
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
              onPress={this.takePicture.bind(this)}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Snap{' '}
              </Text>
            </TouchableOpacity>
            
          </View>           
          </Camera>
          </View>
      );
    }
  }
  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
  }

}

export default UploadContent