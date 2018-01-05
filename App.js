import React from 'react';
import store from './store'
import { Text } from 'react-native'
import MainStack from './components/main'

export default class App extends React.Component {
  render() {
    return (
      <MainStack/>
    );
  }
}