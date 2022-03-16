
import {choice, remove} from './helpers';
import fruits from './foods';

//randomly draw fruit from fruits
const RANDOMFRUIT = choice(fruits);

const msgs = [`I'd like one ${RANDOMFRUIT}, please.`,
              `Here you go: ${RANDOMFRUIT}`,
               `Delicious! May I have another?`];

msgs.map(msg => console.log(msg));

// remove RANDOMFRUIT from fruits
const FRUITSLEFT = remove(fruits, RANDOMFRUIT);

if (FRUITSLEFT) {
  console.log(`I'm sorry, we're all out. We have ${FRUITSLEFT.length} left`);
} else {
  console.log(`Couldn't find ${RANDOMFRUIT} in fruits.`);
}


