import React, { useState } from 'react';
import answers from './answers';
import './EightBall.css';

const EightBall = () => {
  const intitialMsg = 'Think of a Question';
  const initialColor = 'black';
  const [color, setColor] = useState(initialColor);
  const [msg, setMsg] = useState(intitialMsg);

  const reset = () => {
    setColor(initialColor);
    setMsg(intitialMsg);
  }

  const getRandAnswer = () => {
    const answer = answers[Math.floor(Math.random() * answers.length)];

    setMsg(answer.msg);
    setColor(answer.color);
  };

  return (
    <div>
      <div 
        className="EightBall-ball" 
        style={{backgroundColor: color}}
        onClick={getRandAnswer}>
        <p>{msg}</p>
      </div>
      <button 
        className="EightBall-reset-btn"
        onClick={reset}
        >
          Reset
      </button>
    </div>
    
  );
}

export default EightBall;