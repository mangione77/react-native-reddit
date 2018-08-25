import React, { Component } from 'react'
import { WebView, Button, View } from 'react-native'

export default class WebViewWithButton extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <Button onPress={this.props.onPressClose} title={this.props.title} color={this.props.color} />
                <WebView
                    source={{ uri: this.props.postURL }}
                    style={{ marginTop: 20 }}
                    ref={this.props.reference}
                />
            </View>
        )
    }
}


