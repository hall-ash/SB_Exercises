/**
 * Write a function called findRotationCount which accepts an array of distinct 
 * numbers sorted in increasing order. The array has been rotated counter-clockwise 
 * n number of times. Given such an array, find the value of n.
 */
function findRotationCount(arr) {
  // helper functions
  const isPivot = (index) => {
    return arr[index - 1] < arr[index] && arr[index + 1] < arr[index];
  }

  const getMid = (l, r) => Math.floor((l + r)  / 2);

  // find pivot point
  const getPivot = (left, right) => {
    while (left <= right) {
      let mid = getMid(left, right);
  
      if (isPivot(mid)) {
        return mid;
      }
      else if (!isPivot(mid)) {
        if (arr[mid] >= arr[0]) {
          left = mid + 1;
        }
        else {
          right = mid - 1;
        }
      }
    }
    return arr.length;
  }

  let left = 0;
  let right = arr.length - 1;

  if (arr[left] < arr[right]) return 0; // array is not rotated

  let pivot = getPivot(left, right);

  return pivot + 1;
}


module.exports = findRotationCount