/**
 * Write a function called findFloor which accepts a sorted array 
 * and a value x, and returns the floor of x in the array. 
 * The floor of x in an array is the largest element in the array 
 * which is smaller than or equal to x. If the floor does not exist, 
 * return -1.
 */
function findFloor(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let max = arr[left];

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
      if (arr[mid] > max) {
        max = arr[mid];
      }
    }
    else if (arr[mid] > target) {
      right = mid - 1;
    }
    else if (arr[mid] === target) {
      return arr[mid];
    }
  }

  if (max <= target) {
    return max;
  }
  return -1; 
}

module.exports = findFloor