import React from 'react';
import './Pokecard.css';

const POKE_API = 'https://raw.githubusercontent.com/' +
  'PokeAPI/sprites/master/sprites/pokemon/';

const Pokecard = ({pokemon}) => {
  const imgPath = `${POKE_API}${pokemon.id}.png`
  
  return (
  <div className="Pokecard">
    <h2 className="Pokecard-name">{pokemon.name}</h2>
    <img className="Pokecard-image" src={imgPath} alt="pokemon pic"/>
    <p className="Pokecard-data">Type: {pokemon.type}</p>
    <p className="Pokecard-data">EXP: {pokemon.base_experience}</p>
  </div> );
}

export default Pokecard;