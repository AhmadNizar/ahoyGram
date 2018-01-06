import { AsyncStorage } from 'react-native'
import axios from 'axios'

export const REGISTER_USER ='REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const POST_IMAGE = 'POST_IMAGE'

export const registerUser = (userData) => {
    // console.log(userData)
  return dispatch => {
    axios.post('http://192.168.1.38:3000/register',{
      username:userData.username,
      password: userData.password
    })
    .then(({data}) => { 
      dispatch({
        type: REGISTER_USER,
        payload: data
      })
    })
    .catch(err => console.error(err))
  }  
}

export const loginUser = (dataLoginUser)=>{
  return dispatch =>{
    axios.post('http://192.168.1.38:3000/login',{
      username:dataLoginUser.username,
      password: dataLoginUser.password
    })
    .then(({data})=>{
      dispatch({
        type: LOGIN_USER,
        payload: data
      })
    })
    .catch(err => console.error(err))
  }
}

export const uploadPhoto = (postData) => {
  const imageData = new FormData()
  imageData.append('photo', {
    uri: postData.urlImage,
    type: 'image/jpeg',
  })

  return dispatch => {
    axios.post('http://192.168.1.38:3000/photo', {
      caption: postData.userState.caption,
    },{
      headers: {
        userToken: postData.userToken
      }
    })
    .then(({data}) => {
      dispatch({
        type: POST_IMAGE,
        payload: data
      })
    })
    .catch(err => console.error(err))
  }
  console.log('masuk action', postData)
}
