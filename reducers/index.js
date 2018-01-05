import { REGISTER_USER } from '../actions'
const initialState = {
  registerData: '',
  loginData:''
}

export function ahoyApps(state = initialState, action){
  console.log(action)
  switch(action.type){
    case 'REGISTER_USER':
    console.log('masuk reducer')
    return {...state, registerData:action.payload}
    default:
    return state
  }
}

