import React, { Component, Dimensions } from 'react'
import { StyleSheet, Text, View, FlatList, Image, WebView, Button, RefreshControl, Picker } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import redditPics from './data/redditPics'
import FlatListComponent from './components/FlatListComponent'
import WebViewWithButton from './components/WebViewWithButton'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      'posts': [],
      'pressed': false,
      'pressedPostURL': '',
      'selectedType': ''
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

  redditRequest = async (category) => {
    try {
      category = category ? category : 'hot'
      let cleanResultsArray = await redditPics.getAndFilterPosts(category)
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

  updateCategory = (category) => {
    this.setState({
      selectedType: category
    }, async () => {
      await this.redditRequest(category)
    })
  } 

  render() {
    let WEBVIEW_REF = 'webview1'
    if (!this.state.pressed) {
      return (
        <View style={styles.container}>
          <FlatListComponent
            posts={this.state.posts}
            extraData={this.state}
            redditRequest={this.redditRequest}
            onPressPost={this.onPressPost}
            onSelectType={this.updateCategory}
            selectedType={this.state.selectedType ? this.state.selectedType : 'hot'}
          />
        </View>
      )
    }
    else {
      return (
        <WebViewWithButton
          reference={WEBVIEW_REF}
          postURL={this.state.pressedPostURL}
          title={'Back to the App!'}
          color={'#ff4949'}
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
