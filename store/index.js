import {createStore, applyMiddleware} from 'redux'
import { ahoyApps } from '../reducers'
import thunk from 'redux-thunk'
let store = createStore(ahoyApps, applyMiddleware(thunk))

export default store