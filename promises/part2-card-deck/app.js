const BASE_URL = 'https://deckofcardsapi.com/api/deck';

const shuffleAndDrawCards = numCardsToDraw => {

  if (numCardsToDraw < 1)  {
    console.log('Invalid number of cards.');
    return;
  }

  $.getJSON(`${BASE_URL}/new/shuffle/?deck_count=1`) // shuffle cards
  .then(deck => {
    return $.getJSON(`${BASE_URL}/${deck.deck_id}/draw/?count=${numCardsToDraw}`); // draw card
  })
  .then(cardsData => {
    const cards = cardsData.cards; // get array of cards
    console.log(`You drew ${numCardsToDraw} card${numCardsToDraw > 1 ? 's' : ''}:\n`)
    cards.forEach(card => console.log(`the ${card.value} of ${card.suit}`));
    
  })
  .catch(err => console.log(err));
};

/**
 * 1. Make a request to the Deck of Cards API to request a single card 
 * from a newly shuffled deck. Once you have the card, console.log 
 * the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
 */
shuffleAndDrawCards(1);

  /**
   * 2. Make a request to the deck of cards API to request a single card 
   * from a newly shuffled deck. Once you have the card, make a request 
   * to the same API to get one more card from the same deck.
   * Once you have both cards, console.log the values and suits of both cards.
   */
shuffleAndDrawCards(2);

/**
 * 3. Build an HTML page that lets you draw cards from a deck. When the page loads, 
 * go to the Deck of Cards API to create a new deck, and show a button on the 
 * page that will let you draw a card. Every time you click the button, display 
 * a new card, until there are no cards left in the deck.
 */

 let deckID;
 const $drawBtn = $('button');
 const $cardImg = $('img');

 const shuffleCards = () => {
   $.getJSON(`${BASE_URL}/new/shuffle/?deck_count=1`) 
   .then(deck => {
     deckID = deck.deck_id;
     $drawBtn.show();
   })
   .catch(err => console.log(err));
 };

 const drawCard = () => {
  $.getJSON(`${BASE_URL}/${deckID}/draw/?count=1`)
  .then(cardsData => {
    console.log('cardsData', cardsData);
    const card = cardsData.cards[0]; 
    
    const cardSrc = card.image;
    $cardImg.attr('src', cardSrc);
    $cardImg.show();

    if (cardsData.remaining <= 0) {
      $drawBtn.hide();
    }
    
  })
  .catch(err => console.log(err));
 }

$cardImg.hide();
shuffleCards();
$drawBtn.on('click', drawCard); 
