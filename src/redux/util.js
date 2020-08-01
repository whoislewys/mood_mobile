import { anal } from './constants';

export function mapSongsToValidTrackObjects(list) {
  // console.warn('list: ', list);
  return list.map((t) => {
    return {
      id: t.id.toString(),
      url: t.file,
      title: t.name,
      artist: t.artist,
      artwork: t.art_url,
      album: t.album_name,
      mood_id: t.mood_id,
      stars: t.stars,
    };
  });
}

/**
 * (A non-destructive) Durstenfeld Shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param: {list} arr
 * @returns: {list}
 */
export function shuffle(arr) {
  // careful, this `arrCopy` holds the same references to the underlying objects in the original `arr`
  // thankfully we're using redux, so you should never be mutating state in the store
  const arrCopy = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

/**
 * builds an analytic event object for songPlay events
 * @param: {string} eventName - an anal constant with the Amplitude eventName
 * @param: {string} songSource - a string indicating where a song came from
 *   e.g. 'mood' or 'leaderboard'
 * @param: {object} song - the track object being played. it should be pulled off the store
*/
export function songPlayAnalyticEventFactory(eventName, songSource, song) {
  if (eventName !== anal.songPlay) return null;
  const eventProperties = { songSource };
  if (song != null) eventProperties.song = song;
  return eventProperties;
}
