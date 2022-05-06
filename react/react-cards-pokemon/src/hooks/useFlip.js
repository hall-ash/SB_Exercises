// logic for flipping card
import {useState} from 'react';

const useFlip = (initialVal=true) => {
  const [isFacingUp, setIsFacingUp] = useState(initialVal);
  const flipCard = () => setIsFacingUp(isUp => !isUp);

  return [isFacingUp, flipCard];
};

export default useFlip;