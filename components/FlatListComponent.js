import React, { Component } from 'react'
import { FlatList, StyleSheet, RefreshControl, View, Text, Image, Picker } from 'react-native'
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
                <Picker
                    selectedValue={this.props.selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.props.onSelectCategory(itemValue) }>
                    <Picker.Item label="Hot" value="hot" />
                    <Picker.Item label="New" value="new" />
                    <Picker.Item label="Controversial" value="controversial" />
                    <Picker.Item label="Top" value="top" />
                    <Picker.Item label="Rising" value="rising" />
                </Picker >
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.separator}
            />
        )
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, async () => {
            await this.props.redditRequest(this.props.selectedCategory)
            this.setState({
                refreshing: false
            })
        })
    }

    render() {
        return (
            <List
                containerStyle={styles.noTopBottomBorder}
            >
                <FlatList
                    data={this.props.posts}
                    styles={styles.flatList}
                    containerStyle={styles.noTopBottomBorder}
                    extraData={this.props}
                    renderItem={({ item }) =>
                        <ListItem
                            title={
                                <View style={styles.postHeader}>
                                <Text style={styles.date}>{item.date_utc}</Text>
                                <Text style={styles.postTitle}>{item.title}</Text>
                                </View>
                            }
                            subtitle={
                                <View style={styles.subtitleView}>
                                    <View style={styles.subtitleElement}>
                                    <Text adjustFontSizeToFit={true} style={styles.info}>{item.author}</Text>
                                    </View>
                                    <View adjustFontSizeToFit style={styles.subtitleElement}>
                                    <Text adjustFontSizeToFit={true} style={styles.info}>Score: {item.score}</Text>
                                    </View>
                                    <View style={styles.subtitleElement}>
                                    <Text adjustFontSizeToFit={true} style={styles.info}>Comments: {item.num_comments}</Text>
                                    </View>
                                </View>
                            }
                            avatar={
                                item.thumbnail !== 'self'
                                ? <Image source={{ uri: item.thumbnail }} style={styles.thumbnail}></Image>
                                : <Image source={{ uri: 'https://via.placeholder.com/100x100'}} style={styles.thumbnail}></Image>
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
    noTopBottomBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    flatList: {
        flex: 1,
        marginTop: 20
    },
    subtitleView: {
        flexDirection: 'row',
    },
    thumbnail: {
        height: 100,
        width: 100
    },
    separator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
    },
    subtitleElement: {
        paddingRight: 5, 
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    picker: {
        height: 30,
        width: 100
    }, 
    info: {
        color: 'grey',
        fontSize: 10,
        paddingLeft: 10
    },
    header: {
        padding: 7,
        backgroundColor: '#ff4949',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF9FB'
    },
    postHeader: {
        justifyContent: 'center'
    },
    postTitle: {
        paddingLeft: 10,
    },
    date: {
        fontSize: 10,
        fontStyle: 'italic',
        paddingLeft: 10
    }
})