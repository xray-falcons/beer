import 'react-native';
import React from 'react';
import BeerList from "../components/beer-list";

import renderer from 'react-test-renderer';

describe('<BeerList />', () => {
    let beers = [
        {
            name: "Ipa",
            labels: {
                medium: "URL"
            }
        },
        {
            name: "Guinness",
            labels: {
                medium: "URL"
            }
    }]

    it('renders correctly', () => {

        const tree = renderer.create(
            <BeerList beers={beers}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('has 1 child', () => {
        const tree = renderer.create(<BeerList beers={beers} />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
