import { 
  REGISTER_USER,
  LOGIN_USER,
  ALL_PHOTO
 } from '../actions'

const initialState = {
  registerData: '',
  loginStatus: '',
  userToken: '',
  dataPhoto:''
}

export function ahoyApps(state = initialState, action){
  switch(action.type){
    case 'REGISTER_USER':
      return {...state, registerData: action.payload}
    case 'ALL_PHOTO':
      return {...state ,dataPhoto: action.payload}
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

