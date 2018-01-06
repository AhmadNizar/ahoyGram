import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Container, } from 'native-base'
import { Header } from 'react-native-elements'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state={
      usertoken:''
    }
  }
  render() {
    return (
      <Container>
        <Header
          centerComponent={{ text: 'ahoyGram', style: {color: 'black'}}}
        />
        <View>
          <Text>{this.state.usertoken}</Text>
        </View>
      </Container>
    )
  }
  componentWillMount(){
      AsyncStorage.getItem('ahoyGramToken')
      .then((dataToken)=>{
        console.log(dataToken)
        this.setState({ usertoken : dataToken})
      })
  }
}

export default Timeline