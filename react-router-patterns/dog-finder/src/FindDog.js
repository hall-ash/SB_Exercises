import React from 'react';
import DogDetails from './DogDetails';
import { useParams, Redirect } from 'react-router-dom';

const FindDog = ({ dogs }) => {
  const { name } = useParams();

  const dog = dogs.find(dog => dog.name.toLowerCase() === name.toLowerCase());
  
  return dog ? <DogDetails dog={dog} /> : <Redirect to="/dogs" />;
};

export default FindDog;