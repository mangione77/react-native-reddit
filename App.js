import React, { Component, Dimensions } from 'react'
import { StyleSheet, Text, View, FlatList, Image, WebView, Button, RefreshControl } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import redditPics from './data/redditPics'
import FlatListComponent from './components/FlatListComponent'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      'posts': [],
      'pressed': false,
      'pressedPostURL': '',
      'refreshing': false
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

  _onClickClose = (e) => {
    this.setState({
      pressed: false
    })
  }

  _onPress = (url) => {
    this.setState({
      pressedPostURL: url,
      pressed: true
    })
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, async () => {
      await this.redditRequest()
      this.setState({
        refreshing: false
      })
    })
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>r/Pics</Text>
      </View>
    )
  }

  render() {
    let WEBVIEW_REF = 'webview1'
    if (!this.state.pressed) {
      return (
        <FlatListComponent
          posts={this.state.posts}
          extraData={this.state}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onPress={this._onPress}
        />
      )
    }
    else {
      return (
        <View style={{ flex: 1, marginTop: 20 }}>
          <Button onPress={this._onClickClose} title="Back to the app!" color="#841584" />
          <WebView
            source={{ uri: this.state.pressedPostURL }}
            style={{ marginTop: 20 }}
            ref={WEBVIEW_REF}
          />
        </View>
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
