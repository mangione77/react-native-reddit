import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import redditPics from './data/redditPics'
import FlatListComponent from './components/FlatListComponent'
import WebViewWithButton from './components/WebViewWithButton'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      'selectedCategory': '',
      'posts': [],
      'shouldOpenWebView': false,
      'pressedPostURL': ''
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
      shouldOpenWebView: true
    })
  }

  onPressClose = (e) => {
    this.setState({
      shouldOpenWebView: false
    })
  }

  updateCategory = (category) => {
    this.setState({
      selectedCategory: category
    }, async () => {
      await this.redditRequest(category)
    })
  } 

  render() {
    if (!this.state.shouldOpenWebView) {
      return (
        <View style={styles.container}>
          <FlatListComponent
            posts={this.state.posts}
            redditRequest={this.redditRequest}
            onPressPost={this.onPressPost}
            onSelectCategory={this.updateCategory}
            selectedCategory={this.state.selectedCategory ? this.state.selectedCategory : 'hot'}
          />
        </View>
      )
    }
    else {
      return (
        <WebViewWithButton
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
