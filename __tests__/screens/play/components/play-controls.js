import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayControls from '../../../../src/screens/play/components/play-controls';

Enzyme.configure({ adapter: new Adapter() });

describe('PlayControls Component', () => {
  it('should handle play presses', () => {
    // NOTE: the playbutton should really be it's own component. right now it's copypasta'd a couple different places
    // but this is an example of how you would exercise onPress functionality somewhere

    // 1. mock the playpress function
    const mockHandlePlayPress = jest.fn();

    // 2. pass mock fn into the component
    const wrapper = shallow(<PlayControls handlePlayPress={mockHandlePlayPress} />);

    // 3. reach down and find the PlayButton
    const playButton = wrapper.find({ testID: 'play-button' });

    // 4. fake pressing the play button
    playButton.props().onPress();

    // 5. assert the proper function was called
    expect(mockHandlePlayPress).toHaveBeenCalledTimes(1);
  });
});
