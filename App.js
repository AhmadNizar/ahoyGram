import React from 'react';
import store from './store'
import { Text } from 'react-native'
import MainStack from './components/cloneMain'
import { Provider } from 'react-redux'
export default class App extends React.Component {
  render() {
    return (
      // <Text>AhmadNizar</Text>
      <Provider store ={store}>
        <MainStack/>      
      </Provider>
    );
  }
}