

/**
 * make a random color
 * https://stackoverflow.com/questions/1484506/random-color-generator
 */
const getRandomColor = () => {
  var letters = '0123456789abcdef';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * return a list of unique colors.
 */
const makeColorList = (numColors) => {
  let colorsSet = new Set();
  while (colorsSet.size < numColors) {
    colorsSet.add(getRandomColor());
  }
  let colorsList = [];
  const iterator = colorsSet.values();
  for (let i = 0 ; i < colorsSet.size ; i++) {
    colorsList.push(iterator.next().value);
  }
  return colorsList;
}

let colorsList = null;
const numColors = 100;

export const colors = () => {
  if (colorsList === null) {
    colorsList = makeColorList(numColors);
  }
  return colorsList;
}