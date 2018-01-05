import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Container } from 'native-base'
import { Header } from 'react-native-elements'

class Timeline extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <Header
          centerComponent={{ text: 'ahoyGram', style: {color: 'black'}}}
        />
        <View>
          <Text>Timeline</Text>
        </View>
      </Container>
    )
  }
}

export default Timeline