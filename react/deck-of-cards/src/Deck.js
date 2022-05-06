import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';

/**
 * Displays a deck of cards one at a time. When the 'Start drawing' button is clicked
 * a new card will be drawn every second. The draws will continue
 * until the 'Stop drawing' button is clicked or until the deck has been
 * exhausted at which point an alert message will appear. 
 */
const Deck = () => {
  const [cardsDrawn, setCardsDrawn] = useState([]); // cards drawn so far
  const [deckId, setDeckId] = useState(null);
  const [drawCards, setDrawCards] = useState(false); // toggle drawing button

  const intervalId = useRef();

  const BASE_URL = 'https://deckofcardsapi.com/api/deck';
  const MS_PER_CARD = 1000; // ms until next card draw

  // get deck id
  useEffect(() => {
    async function fetchDeck() {
      const deckRes = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`); // shuffle cards
      setDeckId(deckRes.data.deck_id);
    };
    fetchDeck();
  }, []);

  
  // draw cards 
  useEffect(() => {
    async function fetchCard() {
      try {

        const cardRes = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`); // draw card
        const { data: { cards, remaining } } = cardRes;

        const card = cards[0]; // get card
        setCardsDrawn(cardsDrawn => [...cardsDrawn, card]); // add to drawn cards

        if (remaining <= 0) {
          setDrawCards(false);
          throw new Error('no cards remaining!');
        }
        
      } catch (e) {
        alert(e);
      }
    };

    // when 'Start drawing' button is clicked (drawCards = true)
    // set up an interval to draw 1 card every MS_PER_CARD
    if (drawCards && !intervalId.current) {
      intervalId.current = setInterval( async () => {
        await fetchCard();
      }, MS_PER_CARD); 
    };

    // clear the interval if drawCards is toggled again
    return () => {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

  }, [drawCards, deckId]);

  const handleClick = evt => {
    setDrawCards(drawCard => !drawCard);
  };

  const topCard = cardsDrawn[cardsDrawn.length - 1];
  
  if (deckId) {
    return (
      <div className="Deck">
        <button onClick={handleClick}>
          {drawCards ? 'Stop' : 'Start'} drawing
        </button> 
        {Boolean(cardsDrawn.length) && <Card image={topCard.image} name={`${topCard.suit} ${topCard.value}`}/>}
      </div>
    );
  } else {
    return <h1>Loading...</h1>
  }
  
};

export default Deck;