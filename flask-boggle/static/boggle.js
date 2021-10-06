"use strict";


// Boggle model

class Boggle {

  constructor() {
    this.score = 0;
    this.words = new Set();
  }

  /**
   * Check whether a guess is valid and on the board.
   * 
   * returns one of the following strings:
   * 'ok' if the result is a valid word and on the bord
   * 'not-on-board' if the result is a valid word but not on the board
   * 'not-a-word' if the result is not a valid word
   * 
   * guess: the word to check
   */
  async checkGuess(guess) {

    if (this.words.has(guess)) {
      return 'already-guessed';
    }

    // send GET request to server to check if word is valid and on board
    const response = await axios({
      url: `/check/${guess}`,
      method: 'GET',
    });

    const result = response.data.result;

    // add valid guess to words set
    if (result === 'ok') {
      this.words.add(guess);
    }

    return result;
  }

  /**
   * If a word is valid, update the score. 
   * 
   * validGuess: A guess that is a valid word and on the board. It's length
   * is equal to the amount of points to add.
   */
  updateScore(validGuess) {
    this.score += validGuess.length;
  } 

  /**
   * Send final score to server. If final score is higher than the current highest score,
   * sets final score as new high score. Returns true if user broke the high score,
   * false otherwise.
   */
  async updateHighScore() {
    // get final score
    const score = this.score;

    // send final score to server
    const response = await axios({
      url: '/update-high-score',
      method: 'POST',
      data: { score },
    });

    // return boolean
    return response.data.brokeRecord;
  }

} // end Boggle class



// UI components
const $guessForm = $("#guess-form");
const $scoreAndCountdownDisplay = $('#score-countdown-display');
const $gameBoard = $('#game-board');
const $endGameMsg = $('#end-game-msg');

// user guess input 
const $userGuess = $("#user-guess");

// form text that displays message depending on user's guess
const $guessMsg = $('#guess-msg');
const $curScore = $('#score');
const $countdownTime = $('#countdown-time');

// interval id for countdown timer
let timerId;

/**
 * Set and display a message under the user's guess.
 * msg: The message to display;
 */
const setAndDisplayGuessMsg = (msg) => {
  $guessMsg.text(msg);
  $guessMsg.show();

  // hide after 1s
  setTimeout(() => {
    $guessMsg.hide();
  }, 1000)
}


/**
 * At the end of a game, disable the user input, update
 * the final score in the server, and the number of
 * games played. 
 */
async function handleGameEnd () {
  $userGuess.prop('disabled', true);

  // find out if user broke the high score
  const brokeRecord = await boggle.updateHighScore();

  const finalScoreTxt = `Your score: ${boggle.score}`;
  if (brokeRecord) {
    $endGameMsg.text(`You broke the high score! ${finalScoreTxt}`);
  }
  else {
    $endGameMsg.text(finalScoreTxt);
  }
}

/**
 * Sets a countdown timer to 60s. The game ends when the timer ends.
 */
async function setCountDownTimer () {
  // set countdown timer to 60 s
  $countdownTime.text(60);
  let timeLeft = 60;

  // decrement time every 1s
  timerId = setInterval( async () => {
    // decrement time and display to UI
    timeLeft--;
    $countdownTime.text(timeLeft);

    // stop timer when it hits 0s and end the game
    if (timeLeft === 0) { 
      clearInterval(timerId); 
      await handleGameEnd();
    }
  }, 1000);
}

/**
 * Update the user's score and display it.
 */
const updateScoreAndDisplay = (validGuess) => {
  // update the score in the Boggle instance
  boggle.updateScore(validGuess);

  // display the update score in the UI
  $curScore.text(boggle.score);
}

/**
 * Handle submit event when user submits a guess.
 * Resets the countdown timer and updates score on a valid guess.
 */
async function handleGuessFormSubmit(evt) {
  
  // don't allow submit if time is up
  if ($countdownTime.text() === '0') {
    return;
  }

  // prevent page refresh on submit
  evt.preventDefault();

  // get the guess from the form
  const guess = $userGuess.val();

  // check if guess is valid
  const result = await boggle.checkGuess(guess);

  // display different messages depending on result
  // if valid word update score, too
  if (result === 'ok') {
    setAndDisplayGuessMsg('Good Guess!');

    // update score and display it
    updateScoreAndDisplay(guess);

    // reset the countdown timer
    clearInterval(timerId);
    await setCountDownTimer();
  }
  else if (result === 'not-on-board') {
    setAndDisplayGuessMsg(`Sorry, ${guess} is not on the board! Try again!`);
  }
  else if (result === 'not-word') {
    setAndDisplayGuessMsg(`${guess} is not a word! Try again!`);
  }
  else if (result === 'already-guessed') {
    setAndDisplayGuessMsg(`You already guessed ${guess}!`);
  }

  // clear form value 
  $guessForm.trigger('reset');
}

$guessForm.on('submit', handleGuessFormSubmit)


// instantiate Boggle instance
let boggle = new Boggle();

// start the countdown
setCountDownTimer();
