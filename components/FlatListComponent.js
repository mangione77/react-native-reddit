import React, { Component } from 'react'
import { FlatList, StyleSheet, RefreshControl, View, Text, Image } from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class FlatListComponent extends Component {

    constructor() {
        super()

        this.state = {
            refreshing: false,
            pressed: false,
            pressedPostURL: ''
        }
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>r/Pics</Text>
            </View>
        )
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

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, async () => {
            await this.props.redditRequest()
            this.setState({
                refreshing: false
            })
        })
    }

    render() {
        return (
            <List>
                <FlatList
                    data={this.props.posts}
                    styles={{ flex: 1, marginTop: 20 }}
                    extraData={this.props}
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
                            onPress={() => this.props.onPressPost(item.permalink)}
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
}

const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
    },
    info: {
        paddingLeft: 10,
        color: 'grey',
        fontSize: 10
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
})