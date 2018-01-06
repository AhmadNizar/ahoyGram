import React from 'react'
import { Text, View, Alert, AsyncStorage } from 'react-native'
import {Button, FormInput } from 'react-native-elements'
import { loginUser } from '../actions'
import { connect } from 'react-redux'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }

  loginSubmit(){
    let dataLoginUser={
      username:this.state.username,
      password:this.state.password
    }
    this.props.loginUser(dataLoginUser)
  }
  render(){
    return(
      <View style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
        <Text>LOGIN</Text>
        <FormInput value={this.state.username} onChangeText={(username)=> this.setState({username}) } placeholder="Username"/>
        <FormInput value={this.state.password} onChangeText={(password)=> this.setState({password}) } placeholder="password"/>
        <Button title="Login" onPress={() => this.loginSubmit() } />        
      </View>
    )
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.loginStatus === 'Invalid'){
      Alert.alert(
        'Invalid Username or Password...!'
     )
    }else{
      console.log('NextP', nextProps)
      console.log('thistate', this.props)
      AsyncStorage.setItem('ahoyGramToken', nextProps.dataLoginUser)
      this.props.navigation.navigate('RootStack')
    }
  }
}

const mapStateToProps = (state)=>{
  return {
    loginStatus :state.loginStatus,
    dataLoginUser: state.userToken
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    loginUser: (dataLoginUser) => dispatch(loginUser(dataLoginUser))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)