import React from 'react'
import WebViewWithButton from '../components/WebViewWithButton'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
    const testFn = () => true 
    const rendered = renderer.create(
    <WebViewWithButton 
        title={'Back to the App!'}
        onPressClose={testFn}
    />).toJSON()
    expect(rendered).toBeTruthy()
})


