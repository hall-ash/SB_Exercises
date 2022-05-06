/* 
Hall, Ashley
Unit 10.3.6 Arrow Functions Exercise
Refactor ES5 code into ES2015
*/

// ES5 code to be refactored:
function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
};

// refactored ES2015 code:
const double = arr => arr.map(val => val * 2);



// ES5 code to be refactored:
function squareAndFindEvens(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
};

// refactored ES2015 code:
const squareAndFindEvens = numbers => numbers.map(num => num ** 2).filter(square => square % 2 === 0);
