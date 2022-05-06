/**
 * Given an array of 1s and 0s which has all 1s first followed by all 0s, 
 * write a function called countZeroes, which returns the number of zeroes 
 * in the array.
 */
function countZeroes(arr) {

  // if 0 is first element, all subsequent elements must be 0
  if (arr[0] === 0) return arr.length; 

  // if 1 is last element, there are no 0s in array
  if (arr[arr.length - 1] === 1) return 0;

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex < rightIndex) {
    let midIndex = Math.floor((leftIndex + rightIndex) / 2)
    let oneToLeft = arr[midIndex - 1] === 1 // returns true if 1 is to the left of curIndex 
    let oneToRight = arr[midIndex + 1] === 1; 
    let zeroToLeft = arr[midIndex - 1] === 0;
    let zeroToRight = arr[midIndex + 1] === 0;
    let isZero = arr[midIndex] === 0;
    let isOne = arr[midIndex] === 1;

    if (isOne && oneToRight) {
      leftIndex = midIndex + 1; 
    }
    else if (isZero && oneToLeft) {
      return arr.length - midIndex;
    }
    else if (isOne && zeroToRight) {
      return arr.length - midIndex - 1; 
    }
    else if (isZero && zeroToLeft) { 
      rightIndex = midIndex - 1;
    }
  }

  return 0; 
}


module.exports = countZeroes