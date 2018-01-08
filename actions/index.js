import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { Math } from 'core-js/library/web/timers';
// import FormData from 'form-data'

export const REGISTER_USER ='REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const POST_IMAGE = 'POST_IMAGE'
export const ALL_PHOTO = 'ALL_PHOTO'

export const getAllPhoto = ()=>{
  return dispatch =>{
    axios.get('http://192.168.43.131:3000/photo')
    .then(({data})=>{
      console.log('masuk sini')
      console.log(data)
      dispatch({
        type: ALL_PHOTO,
        payload:data
      })
    })
    .catch(err => console.error(err))
  }
}
export const registerUser = (userData) => {
    // console.log(userData)
  return dispatch => {
    axios.post('http://192.168.43.131:3000/register',{
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
    axios.post('http://192.168.43.131:3000/login',{
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
  console.log('ini params', postData)
  const imageData = new FormData()
  imageData.append('image', {
    uri: postData.userState.urlImage,
    type: 'image/jpg',
    name: Math.random() + 'image'
  })

  imageData.append('caption', postData.userState.caption)

  const config = {
    headers: {
      userToken: postData.userToken
    }  
  }

  return dispatch => {
    axios.post('http://192.168.43.131:3000/photo', imageData, config)
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
