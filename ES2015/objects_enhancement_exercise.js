/* 
Hall, Ashley
Unit 10.5.5 Object Enhancements Exercise
*/


// ES5 code to refactor:
// function createInstructor(firstName, lastName){
//   return {
//     firstName: firstName,
//     lastName: lastName
//   }
// }

// ES2015 refactored code:
const createInstructor = (firstName, lastName) => ({ firstName, lastName });


// ES5 code to refactor:
// var favoriteNumber = 42;
// var instructor = {
//   firstName: "Colt"
// }
// instructor[favoriteNumber] = "That is my favorite!"

// ES2015 refactored code:
let favoriteNumber = 42;
const instructor = {
  firstName: 'Colt',
  [favoriteNumber]: "That is my favorite!",
};


// ES5 code to refactor:
// var instructor = {
//   firstName: "Colt",
//   sayHi: function(){
//     return "Hi!";
//   },
//   sayBye: function(){
//     return this.firstName + " says bye!";
//   }
// }
const instructor2 = {
  firstName: 'Colt',
  sayHi() {
    return 'Hi!';
  },
  sayBye() {
    return this.firstName + ' says bye!';
  }
}

/*
createAnimal generates an animal object.
The function accepts 3 arguments:
1. species: the species of animal (‘cat’, ‘dog’)
2. verb: a string used to name a function (‘bark’, ‘bleet’)
3. noise: a string to be printed when above function is called (‘woof’, ‘baaa’)
*/
const createAnimal = (species, verb, noise) => {
  return {
    species,
    [verb]() {
      return noise;
    }
  };
}

