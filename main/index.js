import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import RootStack from '../components'
import Login from '../components/login'

const AhoyNavigator = StackNavigator({
  Login : {
    screen: Login
  },
  RootStack:{
    screen: RootStack
  }
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

export default AhoyNavigator
