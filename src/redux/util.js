// Sorts array elements into a list of sub-arrays based on field
const sort = (arr, field) => {
  const newArr = [];
  arr.map((e) => {
    newArr[e[field]] = e;
  });

  return newArr;
};

const find = (arr, elem) => arr.findIndex(x => (x.name === elem.name && x.i === elem.i));

// Generates a visual of the sort for debugging purposes
const generateVisual = (sublist, inOrderList, len) => {
  let visString = '';
  sublist.map((sub) => {
    const arr = Array(len).fill('O');
    sub.map((e) => {
      const index = find(arr, e);
      arr[index] = 'X';
    });
    visString += `\n${arr.join('')}`;
  });

  return visString;
};

// Does a semi-random shuffle with dithering.
// You can read more online, but the idea is that it evenly spreads each artist
// over the list, and then recursively calls the algorithm on albums for extra shuffle
export default function ditherShuffle(arr, field, field2) {
  const len = arr.length();
  const sortedArr = [];
  const list = sort(arr, field);

  list.map((sublist) => {
    let sortedList = sublist;
    if (field2 !== undefined) sortedList = ditherShuffle(sortedList, field2);
    return sortedList.map((e, index) => {
      e.i = index * (len / sortedList.length()) + Math.random();
      sortedArr.push(e);

      return e;
    });
  });

  sortedArr.sort((a, b) => (a.i - b.i));
  console.log(generateVisual(list, sortedArr, len));

  return sortedArr;
}
