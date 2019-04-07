import React from 'react';
import { Image } from 'react-native';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StarButton } from '../../src/components/medium-star';
import { GoogleSignin } from 'react-native-google-signin';
import Images from '../../src/assets/images';
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

describe('Star Button', () => {
  it('should render an outline when there is no score', () => {
    const wrapper = shallow(<StarButton currentScore={0} />);
    const starImageProps = wrapper.find(Image).props();
    expect(starImageProps.source).toBe(Images.starOutline);
  });

  it('should render a filled in image', () => {
    const wrapper = shallow(<StarButton currentScore={1} />);
    const starImageProps = wrapper.find(Image).props();
    expect(starImageProps.source).toBe(Images.star);
  });

  it('prompts user for login when they are not logged in', () => {
    const wrapper = shallow(<StarButton currentScore={1} userIsLoggedIn={false} />);
    wrapper.clap();
    GoogleSignin.signIn.mockResolvedValue(jest.fn());
  });
});
