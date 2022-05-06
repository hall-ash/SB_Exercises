/**
 * Write a function called findRotatedIndex which accepts a 
 * rotated array of sorted numbers and an integer. 
 * The function should return the index of num in the array. 
 * If the value is not found, return -1.
 */
function findRotatedIndex(arr, target) {
  
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
  let pivot = getPivot(left, right);

  // determine if target is in left or right subarray
  if (target >= arr[0]) { // target in left subarray
    left = 0;
    right = pivot;
  }
  else { // target in right subarray
    left = pivot + 1;
    right = arr.length - 1;
  }

  // find target
  while(left <= right) {
    let mid = getMid(left, right);

    if (arr[mid] < target) {
      left = mid + 1;
    }
    else if (arr[mid] === target) {
      return mid;
    }
    else {
      right = mid - 1;
    }
  }

  return -1;
}

// module.exports = findRotatedIndex