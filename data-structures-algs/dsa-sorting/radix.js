function radixSort(nums) {
  const max = mostDigits(nums);
  for (let i = 0; i < max; i++) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < nums.length; j++) {
      const num = nums[j];
      const digit = getDigit(num, i);
      buckets[digit].push(num);
    }
    nums = [...buckets].flat();
  }
  return nums;
}

const getDigit = (num, place) => {
  const numStr = num.toString();
  return +numStr[numStr.length - 1 - place] || 0;
}

const digitCount = num => num.toString().length;

// find value in nums with most digits and return number of digits
const mostDigits = nums => {
  let maxCount = 0;
  nums.forEach(n => {
    const numDigits = digitCount(n);
    if (numDigits > maxCount) maxCount = numDigits;
  });

  return maxCount;
}

module.exports = {
  radixSort,
  getDigit,
  digitCount,
  mostDigits,
};