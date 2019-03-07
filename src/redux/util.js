import { anal } from './constants';

// Sorts array elements into a list of sub-arrays based on field
const sort = (arr, field) => {
  const newArr = {};
  arr.map((e) => {
    if (newArr[e[field]] === undefined) {
      newArr[e[field]] = [e];
    } else {
      newArr[e[field]].push(e);
    }
  });

  return newArr;
};

// const find = (arr, elem) => arr.findIndex(x => (x.name === elem.name && x.i === elem.i));

// Generates a visual of the sort for debugging purposes
// const generateVisual = (list, inOrderList, len) => {
//   let visString = '';
//   const keys = [];
//
//   list.forEach((value, key) => {
//     const arr = Array(len).fill(' O ');
//     keys.map((e) => {
//       arr[e] = ' | ';
//     });
//     value.map((e) => {
//       const index = find(inOrderList, e);
//       arr[index] = ' * ';
//       keys.push(index);
//     });
//     visString += `\n${arr.join('')}\t${key}\n`;
//   });
//
//   return visString;
// };

/**
 * Does a semi-random shuffle with dithering.
 * You can read more online, but the idea is that it evenly spreads each artist
 * over the list, and then recursively calls the algorithm on albums for extra shuffle
*/
export function ditherShuffle(arr, field, field2) {
  const len = arr.length;
  const sortedArr = [];
  const list = new Map(Object.entries(sort(arr, field)));

  // console.log('Begin dithering!');
  // console.log(list);

  list.forEach((value, key) => {
    let sortedList = value;
    if (field2 !== undefined) sortedList = ditherShuffle(sortedList, field2);
    return sortedList.map((e, index) => {
      e.i = index * (len / sortedList.length) + Math.random();
      sortedArr.push(e);

      return e;
    });
  });

  sortedArr.sort((a, b) => (a.i - b.i));
  // console.log(generateVisual(list, sortedArr, len));

  return sortedArr;
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
