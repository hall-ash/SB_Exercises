/* 
Hall, Ashley
Unit 10.4.8 rest / spread Exercise
*/



// ES5 code to refactor:
// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.filter(function(num) {
//     return num % 2 === 0
//   });
// }

// refactored ES2015 code:
const filterOutOdds = (...nums) => nums.filter(num => num % 2 === 0);


// findMin accepts a variable number of arguments and returns the smallest argument
const findMin = (...nums) => nums.reduce((min, num) => min < num ? min : num);


// mergeObjects accepts two objects and returns a new object which contains 
// all the keys and values of the first object and second object
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});


// doubleAndReturnArgs accepts an array and a variable number of arguments. 
// The function returns a new array with the original array values and 
// all of additional arguments doubled.
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(num => num * 2)];


/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = (items) =>  {
  const randI = Math.floor(Math.random() * items.length);
  return [...items.slice(0, randI), ...items.slice(randI + 1)]; 
}


/** Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => [...array1, ...array2];


/** Return a new object with all the keys and values
from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });


/** Return a new object with a key removed. */
const removeKey = (obj, key) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
}


/** Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });


/** Return a new object with a modified key and value. */
const update = (obj, key, val) => ({ ...obj, [key]: val });

