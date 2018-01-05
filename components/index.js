import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Timeline from './timeline'

const activeTintColor = '#3478f6'
const inactiveTintColor = '#929292'
const styles = StyleSheet.create({
  tabBar: {
    height: 49,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: '#F7F7F7'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  icon: {
    width: 26,
    height: 26,
  }
})

class TabBar extends Component {
  renderItem = (route, index) => {
    const {
      navigation,
      jumpToIndex
    } = this.props

    const isCapture = route.routeName === 'plus'

    const focused = index === navigation.state.index
    const color = focused ? activeTintColor : inactiveTintColor

    return (
      <TouchableWithoutFeedback 
        key={route.key}
        style={styles.tab}
        onPress={() => isCapture ? navigation.navigate('CaptureModal') : jumpToIndex(index)}
      >
        <View style={styles.tab}>
          <Feather
            name={route.routeName}
            size={26}
          />
          <Text style={{ color }}>{route.routeName}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const {
      navigation
    } = this.props

    const {
      routes
    } = navigation.state

    return (
      <View style={styles.tabBar}>
        {routes && routes.map(this.renderItem)}
      </View>
    )
  }
}

const Screen = (props) => (
  <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
    <Text>{props.title} Screen</Text>
  </View>
);

/*
 * Here we actuall create our TabNavigator. As you can see we're not doing anything fancy.
 * To prevent an error I've simple passed a View to the Capture tab - this won't actually be seen
 * so make it as "cheap" as possible
 */
const Tabs = TabNavigator({
  home: {
    screen: Timeline,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  search: {
    screen: (props) => <Screen title="Nizar" {...props} />,
  },
  plus: {
    screen: View,
  },
  activity: {
    screen: (props) => <Screen title="Activity" {...props} />,
  },
  user: {
    screen: (props) => <Screen title="Profile" {...props} />,
  },
}, {
  // Instagram has the tabbar on the bottom on iOS and Android
  tabBarPosition: 'bottom',
  // Specify our custom navbar
  tabBarComponent: TabBar,
});

/*
 * Place the capture screen into a stack navigator so that we can easily use the existing header.
 * Why reinvent the wheel?
 */
const CaptureStack = StackNavigator({
  Capture: {
    screen: (props) => <Screen title="Capture" {...props} />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Capture',
      headerLeft: (
        <Button
          title="Cancel"
          // Note that since we're going back to a different navigator (CaptureStack -> RootStack)
          // we need to pass `null` as an argument to goBack.
          onPress={() => navigation.goBack(null)}
        />
      ),
    }),
  },
})

/*
 * We need a root stack navigator with the mode set to modal so that we can open the capture screen
 * as a modal. Defaults to the Tabs navigator.
 */
const RootStack = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  CaptureModal: {
    screen: CaptureStack,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'none',
  mode: 'modal',
});

export default RootStack;