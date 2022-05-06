/**
 * Given a sorted array and a number, write a function called sortedFrequency 
 * that counts the occurrences of the number in the array
 */
function sortedFrequency(arr, target) {

  let firstIndex = findIndex(arr, target, 'first');
  let lastIndex = findIndex(arr, target, 'last');

  if (firstIndex === -1 || lastIndex === -1) return -1;
  
  return lastIndex - firstIndex + 1;

}

/**
 * Find the first or last index of the target value in an array.
 */
const findIndex = (arr, target, position) => {
  let left = 0;
  let right = arr.length - 1;

  if (position === 'first' && arr[0] === target) return 0;
  if (position === 'last' && arr[arr.length - 1] === target) return arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    }
    else if (arr[mid] === target) {
      if (position === 'first') {
        if (arr[mid - 1] < target) return mid;
        else right = mid - 1;
      }
      else if (position === 'last') {
        if (arr[mid + 1] > target) return mid;
        else left = mid + 1; 
      } 
    }
    else {
      right = mid - 1; 
    }
  }
  return -1;
}

module.exports = sortedFrequency