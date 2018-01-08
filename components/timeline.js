import React, { Component } from 'react'
import { View, Text, AsyncStorage, ListView, FlatList, TouchableOpacity } from 'react-native'
import { Container, } from 'native-base'
import { Header, List, ListItem, Card ,Icon} from 'react-native-elements'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getAllPhoto } from '../actions'
import store from '../store'
import {connect} from 'react-redux'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state={
      // usertoken:''
      dataPhoto: ''
    }
  }
  render() {
    return (
      <Container>
        <Header
          centerComponent={{ text: 'TIMELINE', style: {color: 'black'}}}
        />
        <View>
          <List>
            <FlatList
            data = { this.props.timelinePhoto}
            keyExtractor={(item => item._id)}
            renderItem = {({item}) =>
              <View>
                <Card
                title= 'Photo Of The Day'
                image = {{uri:item.image}}
                >
                  <View style={{flex:1, flexDirection:'row'}}>
                    <Entypo
                    name='heart-outlined'
                    size={22}
                    />
                    <FontAwesome
                    name='comment-o'
                    size={20}/>
                    <Entypo
                    name='direction'
                    size={22}
                    />
                  </View>
                  <View>
                    <Text>{item.caption}</Text>
                    <Text>{item.creatorId}</Text>
                  </View>
                </Card>              
              </View>
            }
            />           
          </List>          
        </View>
      </Container>      
    )
  }

  componentWillMount(){
    console.log('masuk sini')
      AsyncStorage.getItem('ahoyGramToken')
      .then((dataToken)=>{
        if(dataToken === undefined) {
          console.log('undefined storage')
        } else {
          this.setState({ usertoken : dataToken})
        }
      })

      this.props.getAllDataPhoto()
  }
}

const mapStateToProps = (state)=>{
  return {
    timelinePhoto : state.dataPhoto
  }
}

const mapDispatchToProps =(dispatch)=>{
  return {
    getAllDataPhoto : () => dispatch(getAllPhoto()) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Timeline)