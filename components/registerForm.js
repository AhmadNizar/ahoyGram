import React from 'react'
import {View,Text} from 'react-native'
import { FormInput,Button} from 'react-native-elements'
import {registerUser} from '../actions'
import store from '../store'

class RegisterScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }

  inputSubmit(){
    let userData = {
      username:this.state.username,
      password:this.state.password
    }
    console.log('form', userData)
    store.dispatch(registerUser(userData))
  }



  render(){
    return(
      <View  style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
      <Text>Register</Text>
        <FormInput onChangeText={(username)=> this.setState({username}) }>Your Username</FormInput>
        <FormInput onChangeText={(password)=> this.setState({password}) }>Your Password</FormInput>
        <Button title="Register" onPress={() => this.inputSubmit()} />
    </View>
    )
  }
} 

export default RegisterScreen