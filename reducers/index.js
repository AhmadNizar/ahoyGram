import { 
  REGISTER_USER,
  LOGIN_USER
 } from '../actions'

const initialState = {
  registerData: '',
  loginStatus: '',
  userToken: ''
}

export function ahoyApps(state = initialState, action){
  switch(action.type){
    case 'REGISTER_USER':
      return {...state, registerData: action.payload}
    case 'LOGIN_USER':
    if(action.payload === 'Invalid'){
      return {...state , loginStatus: action.payload}
    }else{
      return{
        ...state,
        userToken: action.payload
      }
    }
      default:
      return state
  }
}

