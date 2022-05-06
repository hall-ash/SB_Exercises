
// returns a randomly selected item from array of items
const choice = items => items[Math.floor(Math.random() * items.length)];

// returns copy of array w/o first appearance of item.  
// If not found, returns undefined
const remove = (items, item) => {
  
  const filteredItems = items.filter( i => i !== item);

  return items.length === filteredItems.length ? undefined : filteredItems;

}

export {choice, remove};