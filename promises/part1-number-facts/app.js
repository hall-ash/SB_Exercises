const API_URL = 'http://numbersapi.com';
const max = 100;
const $numFactLi = $('#number-fact');
const $multNumFactsUl = $('#multiple-number-facts');
const $fourFactsUl = $('#four-number-facts');

// get random integer from 1 to max inclusive
const getRand = (max) => Math.floor(Math.random() * max) + 1;
const favNum = getRand(100);

// send get request for single fact of favNum
const favNumPromise = $.getJSON(`${API_URL}/${favNum}/trivia?json`)
  .then(data => $numFactLi.append(data.text));

// get array of random numbers of length arrLength
const arrLength = 3;
const numbers = Array.from({length: arrLength}, () => getRand(max));

// send get request for facts of numbers array
$.getJSON(`${API_URL}/${numbers}/trivia?json`)
  .then(data => {
    for (const num in data) {
      $multNumFactsUl.append(`<li>${data[num]}</li>`)
    };
  });

const numberOfPromises = 4;
const promises = Array.from({length: numberOfPromises}, () => {
  return $.getJSON(`${API_URL}/${favNum}/trivia?json`)
});

// send get request for multiple facts of favNum
Promise.all(promises).then(promise => {
  promise.forEach(data => $fourFactsUl.append(`<li>${data.text}</li>`));
});
