import axios from 'axios'

export const REGISTER_USER ='REGISTER_USER'

export const registerUser = (userData) => {
  return dispatch => {
    axios.get('http://localhost:3000')
    .then(({data}) => { 
      dispatch({
        type: REGISTER_USER,
        payload: data
      })
    })
    .catch(err => console.error(err))
  }  
}
