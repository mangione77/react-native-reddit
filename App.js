import React, { Component, Dimensions } from 'react'
import { StyleSheet, Text, View, FlatList, Image, WebView, Button, RefreshControl } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import redditPics from './data/redditPics'
import FlatListComponent from './components/FlatListComponent'
import WebViewWithButton from './components/WebViewWithButton'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      'posts': []
    }
  }

  componentDidMount = async () => {
    try {
      await this.redditRequest()
    }
    catch (err) {
      alert(err)
    }
  }

  redditRequest = async () => {
    try {
      let cleanResultsArray = await redditPics.getAndFilterPosts()
      this.setState({
        'posts': cleanResultsArray
      })
    }
    catch (err) {
      alert(err)
    }
  }

  onPressPost = (url) => {
    this.setState({
      pressedPostURL: url,
      pressed: true
    })
  }

  onPressClose = (e) => {
    this.setState({
      pressed: false
    })
  }

  render() {
    let WEBVIEW_REF = 'webview1'
    if (!this.state.pressed) {
      return (
        <FlatListComponent
          posts={this.state.posts}
          extraData={this.state}
          redditRequest={this.redditRequest}
          onPressPost={this.onPressPost}
        />
      )
    }
    else {
      return (
        <WebViewWithButton
          reference={WEBVIEW_REF}
          postURL={this.state.pressedPostURL}
          title={'Back to the App!'}
          color={'#841584'}
          onPressClose={this.onPressClose}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
    padding: 10
  },
  subtitleView: {
    flexDirection: 'row',
  },
  info: {
    paddingLeft: 10,
    color: 'grey',
    fontSize: 10
  },
  avatar: {
    height: 100,
    width: 100
  }
});
