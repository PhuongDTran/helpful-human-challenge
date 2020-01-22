import {colors} from '../data/colorsList';

/**
 * return the whole list of colors
 */
export function getColors(){
  return colors();
}

/**
 * return the size of the color list
 */
export function getSize() {
  return colors().length;
}


export function sliceColors(begin, end) {
  let startIndex = begin >= 0 ? begin : 0;
  let endIndex = end > colors().length ? colors().length : end;
  return colors().slice(startIndex, endIndex);
}