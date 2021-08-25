/* 
Hall, Ashley
Unit 10.2.7 let and const Exercise
Refactor ES5 code into ES2015
*/


/* 
Code to refactor:
ES5 Global Constants 
*/
var PI = 3.14;
PI = 42;

/* 
Refactored code:
ES2015 Global Constants 
*/
const PI = 3.14;

/*
Quiz questions:  
1. What is the difference between var and let?
var is defined and accessible inside its function (function scope) and can be redeclared. 
let is defined and accessible inside the curly braces it has been declared in (block scope)
and cannot be redeclared. var variables declared globally are added as properties to the window
object; let variables declared globally are not. var variables are hoisted and given
an initial value of undefined. let variables are not hoisted.

2. What is the difference between var and const?
var can be reassigned and redeclared, and it has function scope.
const cannot be reassigned or redeclared, and it has block scope.
var variables are hoisted, and const variables are not.
var variables can be declared but not assigned. const variables 
must be assigned a value when they are declared.

3. What is the difference between let and const?
let can be reassigned, and const cannot be reassigned.
let variables can be declared without assigning a value, const
variables must be assigned in the declaration statement. 

4. What is hoisting?
Hoisting occurs when the JS compiler "moves" variable and function declarations to the top of their scope
before code execution. Before var variables are assigned a value, they can be accessed and are 
given the initial value of undefined. 
*/