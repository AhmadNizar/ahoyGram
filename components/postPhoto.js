import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native';
import { FormInput, Button } from 'react-native-elements'
import { FileSystem } from 'expo';
import { connect } from 'react-redux'
import { uploadPhoto } from '../actions'

class PostPhoto extends React.Component{
  constructor(props){
    super(props)
    
    this.state={
      images:[],
      photos:[],
      urlImage:'',
      caption: ''
    }
  }

  uploadPhoto () {
    AsyncStorage.getItem('ahoyGramToken')
    .then(userToken => {
      let userData = {
        userToken,
        userState: this.state
      }
      this.props.postImage(userData)
    })
  }

  render(){
    return(
      <View>
        <Image style={{width: 375, height: 375}} source={{uri: this.state.urlImage}}/>
        <FormInput placeholder='Your Captions' value={this.state.caption} onChangeText={(caption) => this.setState({caption})}/>
        <Button
          large
          title='Share'
          onPress={() => this.uploadPhoto()}
        />  
      </View>
      )
  }

  componentWillMount() {
    this.setState({
      urlImage: `${FileSystem.documentDirectory}photos/Photo_${this.props.navigation.state.params.photoId}.jpg`
    })
    console.log(this.props.navigation.state.params.data)
    // console.log('uolooo',this.state.urlImage)
    // FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `photos`).then(photos => {
    //   this.setState(
    //     {
    //       photos,
    //     });
    // });
  } 
  // componentWillMount(){
  //   console.log(this.props.navigation.state.params.photoId)
  // }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postImage: (imageData) => dispatch(uploadPhoto(imageData))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostPhoto)