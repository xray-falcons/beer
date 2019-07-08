import React from 'react';
import Beer from "../components/beer";
import 'react-native';

import renderer from 'react-test-renderer';

describe('<Beer />', () => {
    let beer = {
        name: "Ipa",
        labels: {
            medium: "URL"
        }
    }
    it('renders correctly', () => {

        const tree = renderer.create(
            <Beer beer={beer}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});



// import React from 'react';
// import App from './App';
//
// import 'react-native';
//
// import renderer from 'react-test-renderer';
// jest.mock('NativeAnimatedHelper');
//
// describe('<App />', () => {
//     it('renders correctly', () => {
//         const navigation = { navigate: jest.fn() };
//
//         const tree = renderer.create(
//             <App navigation={navigation}/>
//         ).toJSON();
//         expect(tree).toMatchSnapshot();
//     });
// });
