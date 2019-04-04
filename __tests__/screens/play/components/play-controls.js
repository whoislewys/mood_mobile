import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayControls from '../../../../src/screens/play/components/play-controls';
import {initialState} from '../../../../src/redux/modules/queue';

Enzyme.configure({ adapter: new Adapter() });

describe('PlayControls Component', () => {
  let mockPlayControlProps;

  // beforeAll(() => {
  //   const track1 = {
  //     id: 69,
  //     file: 'https://mood-music-api.herokuapp.com//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBblVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e2afd16bbd89ed4503d3f60a362a6ddd263992fc/songs167.mp3',
  //     name: 'Coffee (prod. KRVSH)',
  //     artist: 'Isaac Von',
  //     album_name: 'while(1<2)',
  //     art_url: 'https://i1.sndcdn.com/artworks-000232798771-b7p886-t500x500.jpg',
  //     mood_id: 3,
  //     stars: 100,
  //     rank: 1,
  //   };
  //   mockPlayControlProps = {
  //     logEvent: jest.fn(),
  //     skipForward: jest.fn(),
  //     skipBack: jest.fn(),
  //     playing: true,
  //     handlePlayPress: jest.fn(),
  //     loading: false,
  //     currentTrack: track1,
  //   };
  // });


  it('shallow renders', () => {
    const wrapper = shallow(<PlayControls />);
    const playControlsInstance = wrapper.instance();
    playControlsInstance.constructor();
    expect(playControlsInstance).toBeDefined();
  });

  // TODO: this is a bad test. not sure of the best way to do this yet.
  //   but it DID make me aware that playButton should definitely be it's own component
  it('handles play presses', () => {
    // 1. mock the playpress function
    const mockHandlePlayPress = jest.fn();
    // 2. pass mock fn into the component
    const wrapper = shallow(<PlayControls handlePlayPress={mockHandlePlayPress} />);
    // 3. manually invoke it
    const playControlsInstance = wrapper.instance();
    playControlsInstance.props.handlePlayPress();
    // 4. assert that it was called
    expect(mockHandlePlayPress).toHaveBeenCalledTimes(1);
  });

  it('handles play presses2', () => {
    // 1. mock the playpress function
    const mockHandlePlayPress = jest.fn();
    // 2. pass mock fn into the component
    const wrapper = mount(<PlayControls handlePlayPress={mockHandlePlayPress} />);

    // find the playbutton
    const playButton = wrapper.find({ testID: 'play-button' });
  });
});
