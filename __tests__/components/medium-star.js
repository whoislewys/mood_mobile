import React from 'react';
import { Image } from 'react-native';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StarButton } from '../../src/components/medium-star';
import Images from '../../src/assets/images';

Enzyme.configure({ adapter: new Adapter() });

describe('Star Button', () => {
  it('renders an outline when there is no score', () => {
    const wrapper = shallow(<StarButton currentScore={0} />);
    const starImageProps = wrapper.find(Image).props();
    expect(starImageProps.source).toBe(Images.starOutline);
  });
  it('renders a filled in image', () => {
    const wrapper = shallow(<StarButton currentScore={0} />);
    const starImageProps = wrapper.find(Image).props();
    expect(starImageProps.source).toBe(Images.star);
  });
});
