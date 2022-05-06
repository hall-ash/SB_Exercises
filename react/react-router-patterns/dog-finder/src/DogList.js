import React from 'react';
import Dog from './Dog';

const DogList = ({ dogs }) => {

  const dogComponents = dogs.map(({ name, src }) => 
    ( <Dog key={name} 
           name={name} 
           src={src} /> )
  );

  return(
    <div className="DogList">
      {dogComponents}
    </div>
  );
};

export default DogList;