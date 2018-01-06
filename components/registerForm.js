import React from 'react'
import { Alert, View, Text } from 'react-native'
import { FormInput,Button} from 'react-native-elements'
import {registerUser} from '../actions'
import store from '../store'
import { connect } from 'react-redux'

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
    this.props.registerUser(userData)
  }

  render(){
    return(
      <View  style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
      <Text>Register</Text>
        <FormInput value={this.state.username} onChangeText={(username)=> this.setState({username}) } placeholder="Username"/>
        <FormInput value={this.state.password} onChangeText={(password)=> this.setState({password})} placeholder="Password" secureTextEntry={true} />
        <Button title="Register" onPress={() => this.inputSubmit()} />
    </View>
    )
  }

  componentWillReceiveProps (nextProps) {
    
   this.setState({
    username: '',
    password: ''
  })

    Alert.alert(
      'Register Successfull...'
   )
  }

} 

const mapStateToProps = (state) => {
  return {
    userData: state.registerData
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    registerUser: (userData) => dispatch(registerUser(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen)
 