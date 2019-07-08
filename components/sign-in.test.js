import 'react-native';
import React from 'react';
import SignInView from "./sign-in";
import renderer from 'react-test-renderer';


describe('<SignInView />', () => {


    it('renders correctly', () => {

        const tree = renderer.create(
            <SignInView />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders the TextInput component', () => {
        const TextInput = require('TextInput');
        const tree = renderer
            .create(<TextInput />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});

