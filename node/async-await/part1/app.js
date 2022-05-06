const $numFactLi = $('#number-fact');
const $multNumFactsUl = $('#multiple-number-facts');
const $fourFactsUl = $('#four-number-facts');

const BASE_URL = 'http://numbersapi.com';
const max = 100;
const getRand = (max) => Math.floor(Math.random() * max) + 1;
const favNum = getRand(max);

/**
 * 1. Make a request to the Numbers API (http://numbersapi.com/) to 
 * get a fact about your favorite number. (Make sure you get back 
 * JSON by including the json query key, specific to this API.
 */

async function getFavNumFact(num) {
  try {
    const res = await $.getJSON(`${BASE_URL}/${num}/trivia?json`);
    const fact = res.text;
    console.log(fact);
    $numFactLi.append(fact);

  } catch(err) {
    console.log(err);
  }
}

getFavNumFact(favNum);

/**
 * 2. Figure out how to get data on multiple numbers in a single request. 
 * Make that request and when you get the data back, put all of the 
 * number facts on the page.
 */

// get array of random numbers of length arrLength
const arrLength = 3;
const numbers = Array.from({length: arrLength}, () => getRand(max));

async function getMultNumFacts(numbers) {
  try {
    const data = await $.getJSON(`${BASE_URL}/${numbers}/trivia?json`);
    const numberFacts = Object.values(data);
    numberFacts.forEach(fact => $multNumFactsUl.append(`<li>${fact}</li>`))
   
  } catch(err) {
    console.log(err);
  }
}

getMultNumFacts(numbers);

/**
 * 3. Use the API to get 4 facts on your favorite number. 
 * Once you have them all, put them on the page. 
 * It’s okay if some of the facts are repeats.
 */

 async function getFourFacts(num) {
   try {
      const numberOfFacts = 4;
      const promises = Array.from({length: numberOfFacts}, () => {
        return $.getJSON(`${BASE_URL}/${num}/trivia?json`)
      });
    
      const responses = await Promise.all(promises);
      responses.forEach(data => $fourFactsUl.append(`<li>${data.text}</li>`));
   } catch(e) {
     console.log(e);
   }
 }

 getFourFacts(favNum);
 
 
