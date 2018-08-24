import React, { Component, Dimensions } from 'react'
import { StyleSheet, Text, View, FlatList, Image, WebView, Button, RefreshControl } from 'react-native'
import { List, ListItem } from 'react-native-elements'
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    )
  }

  redditCall = async () => {
    try {
      let redditPicsURL = 'https://www.reddit.com/r/pics/new.json'
      let responseFromReddit = await axios.get(redditPicsURL)
      let posts = responseFromReddit.data.data.children
      let cleanResultsArray = []
      posts.map((post) => {
          cleanResultsArray.push({
            'author': post.data.author,
            'thumbnail': post.data.thumbnail,
            'title': post.data.title,
            'date_utc': post.data.created_utc,
            'score': post.data.score,
            'num_comments': post.data.num_comments,
            'permalink': 'https://reddit.com' + post.data.permalink
          })
      })
      this.setState({
        'posts': cleanResultsArray
      })
    }
    catch (err) {
      throw(err)
    }
  }

  componentDidMount = async () => {
    try {
      await this.redditCall()
    }
    catch (err) {
      alert(err)
    }
  }

  _onPress = (url) => {
    this.setState({
      pressedPostURL: url,
      pressed: true
    })
  }

  _onClickClose = (e) => {
    e.preventDefault()
    this.setState({
      pressed: false
    })
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, async () => {
      await this.redditCall()
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
        <List>
        <FlatList
          data={this.state.posts}
          styles={{ flex: 1, marginTop: 20 }}
          extraData={this.state}
          renderItem={({ item }) =>
            <ListItem
              title={item.title}
              subtitle={
                <View style={styles.subtitleView}>
                  <Text style={styles.info}>Score: {item.score}</Text>
                  <Text style={styles.info}>Comments: {item.num_comments}</Text>
                  <Text style={styles.info}>{item.date_utc}</Text>
                </View>
              }
              avatar={
                <Image source={{ uri: item.thumbnail }} style={{ height: 100, width: 100 }}></Image>
              }
              onPress={() => this._onPress(item.permalink)}
            />
          }
          keyExtractor={(item, index) => item.permalink}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        />
        </List>
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
  },
  header: {
    padding: 7,
    backgroundColor: '#841584',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF9FB'
  }
});
