import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SongRow from '../../../src/screens/savedSongs/components/songRow';
import Images from '../../../src/assets/images';

Enzyme.configure({ adapter: new Adapter() });

const track1 = {
  id: 69,
  file: 'https://mood-music-api.herokuapp.com//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBblVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e2afd16bbd89ed4503d3f60a362a6ddd263992fc/songs167.mp3',
  name: 'Coffee (prod. KRVSH)',
  artist: 'Isaac Von',
  album_name: 'while(1<2)',
  art_url: 'https://i1.sndcdn.com/artworks-000232798771-b7p886-t500x500.jpg',
  mood_id: 3,
  stars: 100,
  rank: 1,
};

describe('SongRow Component', () => {
  it('should show correct images when saving and unsaving songs', () => {
    const songIds = new Set();
    songIds.add(27);
    const mockAddSongToDeleted = jest.fn(savedSong => songIds.add(savedSong.id));
    const mockRemoveSongFromDeleted = jest.fn(savedSong => songIds.delete(savedSong.id));

    const wrapper = shallow(
      <SongRow
        savedSong={track1}
        index={0}
        addSongToDeleted={mockAddSongToDeleted}
        removeSongFromDeleted={mockRemoveSongFromDeleted}
        songIdsToDelete={songIds}
      />,
    );

    // check initial state
    let savedImageProps = wrapper.find({ testId: 'saved-song-image' }).props();
    expect(savedImageProps.source).toBe(Images.savedIcon);

    // test for unsaving
    const savedSongButtonCheck = wrapper.find({ testId: 'saved-song-button' });
    savedSongButtonCheck.props().onPress();
    savedImageProps = wrapper.find({ testId: 'saved-song-image' }).props();
    expect(savedImageProps.source).toBe(Images.addToSavedSongs);

    // test for resaving
    const savedSongButtonAdd = wrapper.find({ testId: 'saved-song-button' });
    savedSongButtonAdd.props().onPress();
    savedImageProps = wrapper.find({ testId: 'saved-song-image' }).props();
    expect(savedImageProps.source).toBe(Images.savedIcon);
  });
});
