import React from 'react'
import FlatListComponent from '../components/FlatListComponent'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
    const rendered = renderer.create(<FlatListComponent />).toJSON()
    expect(rendered).toBeTruthy()
})

it('renders correctly', () => {
    const tree = renderer.create(
        <FlatListComponent />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})