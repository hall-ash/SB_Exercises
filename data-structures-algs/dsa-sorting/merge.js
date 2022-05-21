function merge(arr1, arr2) {
  const buffer = [];

  let l = 0;
  let r = 0;
  const len = arr1.length + arr2.length;

  for (let i = 0; i < len; i++) {
    if (arr1[l] < arr2[r] || r >= arr2.length) {
      buffer.push(arr1[l]);
      l++;
    } 
    else { 
      buffer.push(arr2[r]);
      r++;
    }
  }

  return buffer;
}

function mergeSort(arr) {
  // base case: arr empty or length 1
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);

}

module.exports = { merge, mergeSort};