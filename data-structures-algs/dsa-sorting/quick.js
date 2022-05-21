/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start=0, end=arr.length - 1){
  let pivot = arr[start];
  let pivotIndex = start;
  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      pivotIndex++;
      const temp = arr[pivotIndex];
      arr[pivotIndex] = arr[i];
      arr[i] = temp;
    }
  }
  const temp = arr[pivotIndex];
  arr[pivotIndex] = pivot;
  arr[start] = temp;
  return pivotIndex;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left=0, right=arr.length - 1) {
  if (left >= right) return arr;
  const pivotIndex = pivot(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
  return arr;
}

module.exports = {
  quickSort,
  pivot
};