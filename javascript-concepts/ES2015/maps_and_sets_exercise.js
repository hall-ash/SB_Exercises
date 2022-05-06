/* 
Hall, Ashley
Unit 10.7.7 Maps and Sets Exercise
*/

// 1) What does the following code return?
let a = new Set([1,1,2,2,3,4]) // {1, 2, 3, 4}

// 2) What does the following code return?
[...new Set("referee")].join("") // 'ref'

// 3) What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false)
/*
0: {Array(3) => true}
1: {Array(3) => false} 
*/

// hasDuplicate accepts an array and returns true if that array contains a duplicate
// and false otherwise
const hasDuplicate = (arr) => new Set(arr).size !== arr.length;


// vowelCount accepts a string and returns a map where the keys are numbers and the 
// values are the count of the vowels in the string
const vowelCount = (word) => {
  const vowels = new Set('aeiou');
  return word.toLowerCase().filter(letter => vowels.has(letter)).reduce((vowelMap, vowel) => {
    return vowelMap.has(vowel) ? vowelMap.set(vowel, vowelMap.get(vowel) + 1) : vowelMap.set(vowel, 1);
  }, new Map());
}
