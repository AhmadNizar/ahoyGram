import React from 'react'
import {Text,View,Alert} from 'react-native'
import {Button, FormInput } from 'react-native-elements'
import { TabNavigator } from 'react-navigation'
import { loginUser } from '../actions'
import { connect } from 'react-redux'
import RegisterForm from './registerForm' 
import LoginForm from './loginForm'
const LoginScreen = (props) => (
  <View style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
    <Text>Login</Text>
    <Button title="Login" onPress={() => props.navigation.navigate('RootStack')} />
  </View>
)



const RootTabs = TabNavigator({
  Login:{
    screen: LoginForm
  },
  Register:{
    screen: RegisterForm
  }
})

export default RootTabs