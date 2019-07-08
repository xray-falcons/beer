import 'react-native';
import React from 'react';
import BeerList from "./beer-list";

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
    // it('has an initial state', () => {
    //     const tree = renderer.create(<BeerList beers={beers} />).toJSON();
    //     expect(data).toBeInstanceOf(tree);
    // });
    // it('should call getData() during componentDidMount', async () => {
    //     const testGetData = jest.spyOn(BeerList.prototype, 'getData');
    //     const wrapper = mount(<BeerList beers={beers} />);
    //     await expect(testGetData).toHaveBeenCalledTimes(1);
    // });
    // it(`should properly await for async code to finish`, async() => {
    //     const mockCallback = jest.fn()
    //     const wrapper = shallow(<BeerList getData={mockCallback}/>)
    //
    //     expect(mockCallback.mock.calls.length).toBe(0)
    //
    //     await wrapper.instance().hasFinishedAsync
    //
    //     expect(mockCallback.mock.calls.length).toBe(1)
    // })
});
