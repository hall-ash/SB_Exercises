import React from 'react';

const DogDetails = ({ dog }) => {
  const { name, age, facts, src } = dog;

  return (
    <div className="DogDetails">
      <h1>{name}</h1>
      <p>Age: {age}</p>
      {src && <img src={src} alt={name} />} 
      <div className="DogDetails-factsList">
        <h3>Facts</h3>
        <div>
          {facts.map(fact => <p>{fact}</p>)}
        </div>
      </div>
    </div>
  )
};

export default DogDetails;