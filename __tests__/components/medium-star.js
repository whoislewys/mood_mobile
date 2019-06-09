import React from 'react';
import { Image } from 'react-native';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StarButton } from '../../src/components/medium-star';
import Images from '../../src/assets/images';

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

  it('should prompt user to log in when they are not logged in', () => {
    const mockNavigateToLoginFunc = jest.fn();
    const navigation = { navigate: mockNavigateToLoginFunc };

    const starButtonInstance = shallow(
      <StarButton
        userIsLoggedIn={false}
        navigation={navigation}
      />,
    ).instance();

    starButtonInstance.clap();
    expect(mockNavigateToLoginFunc).toHaveBeenCalled();
  });
});
