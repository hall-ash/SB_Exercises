
// converts comma-separated string of numbers to array of numbers
// '1,3,4,7' => [1, 2, 3, 4]
const getNumberArray = (numString) => {
  if(!numString) throw new Error('no numbers were given');

  return numString.split(',').reduce((numArray, n) => {
    let num = parseInt(n);
    if (num) numArray.push(num);

    // if n is empty string ignore
    // if n is nonnumber throw error
    if (n && !num) throw new Error(`${n} is not a number`);
  
    return numArray;
  }, []);
};

// precond: all elements of nonempty array are valid numbers
// returns mean of array of numbers
// [1, 2, 3] => 2
const getMean = nums => {
  if (!nums.length) return null;

  return nums.reduce((sum, num) => {
    return sum + num;
  }, 0) / nums.length;
};

// precond: all elements of nonempty array are valid numbers
// returns median of array of numbers
// [1, 2, 3] =>  2
// [1, 2, 3, 4] => 2.5
const getMedian = nums => {
  if (!nums.length) return null;

  // determine if size of set is even
  const evenNums = nums.length % 2 === 0;

  // get middle index
  const midIdx = Math.floor(nums.length / 2);
  return evenNums ? (nums[midIdx] + nums[midIdx - 1]) / 2 : nums[midIdx];
};

// precond: all elements of nonempty array are valid numbers
// returns mode(s) of array of numbers
// [1, 2, 2, 3] => 2
// [1, 1, 2, 2, 3] => [1, 2]
const getMode = nums => {
  if (!nums.length) return null;

  let maxCount = 1;

  // get counts of each num
  const counts = nums.reduce((count, num) => {
    count[num] = count[num] ? ++count[num] : 1;
    if (count[num] > maxCount) maxCount = count[num];
    return count;
  }, {})

  const modes = [];

  for (const [num, count] of Object.entries(counts)) {
    if (count === maxCount) modes.push(parseInt(num));
  }

  // if multiple modes return array, if one mode return number
  return modes.length > 1 ? modes : modes[0];
}

module.exports = {
  getNumberArray,
  getMean,
  getMedian,
  getMode
}