import React, { Component } from 'react'
import { StyleSheet, WebView, Button, View } from 'react-native'

export default class WebViewWithButton extends Component {
    render() {
        return (
            <View style={styles.webviewContainer}>
                <Button onPress={this.props.onPressClose} title={this.props.title} color={this.props.color} />
                <WebView
                    source={{ uri: this.props.postURL }}
                    style={styles.webview}
                    ref={this.props.reference}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    webviewContainer: {
        flex: 1,
        marginTop: 20
    }
    ,
    webview: {
        marginTop: 20
    }
})