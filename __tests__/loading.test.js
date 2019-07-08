import 'react-native';
import React from 'react';
import Loading from "../components/beer-list";

import renderer from 'react-test-renderer';

describe('<Loading />', () => {


    it('renders correctly', () => {

        const tree = renderer.create(
            <Loading />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders the ActivityIndicator component', () => {
        const ActivityIndicator = require('ActivityIndicator');
        const tree = renderer
            .create(<ActivityIndicator animating={true} size="large" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});
