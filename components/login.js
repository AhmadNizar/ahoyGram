import React from 'react'
import {Text,View} from 'react-native'
import {Button, FormInput } from 'react-native-elements'
import { TabNavigator } from 'react-navigation'
import {registerUser} from '../actions'
import RegisterForm from './registerForm' 

const LoginScreen = (props) => (
  <View style={{ flex:1, alignItems:'center', justifyContent: 'center'}}>
    <Text>Login</Text>
    <Button title="Login" onPress={() => props.navigation.navigate('RootStack')} />
  </View>
)



const RootTabs = TabNavigator({
  Login:{
    screen: LoginScreen
  },
  Register:{
    screen: RegisterForm
  }
})

export default RootTabs
// export default class Login extends React.Component{
//   constructor(props){
//     super(props)    
//   }
//   render(){
//     return(
//       <View>
//         <Text>ini Login</Text>
//         <FormInput>Username</FormInput>
//         <FormInput>Password</FormInput>
//         <Button title="Login" onPress={() => this.props.navigation.navigate('RootStack')} />
        
//       </View>
//     )
//   }
// }
