const items = require('./fakeDb');

const NotFoundErr = {message: 'Item Not Found', status: 404};
const UnableToUpdateErr = {message: 'Could Not Update Item: Invalid Data', status: 400};
const UnableToAddErr = {message: 'Could Not Add Item: Invalid Data', status: 400};

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // CRUD methods

  static getAllItems() {
    return items;
  }

  static add(data) {
    if (Item.areValidProps(data)) {
      const newItem = new Item(data.name, data.price);
      items.push(newItem);
      return newItem;
    } else {
      throw UnableToAddErr;
    }
  }

  static get(itemName) {
    const foundItem = items.find(i => i.name === itemName);
    if (!foundItem) {
      throw NotFoundErr;
    };
    return foundItem;
  }

  static update(itemName, data) {
 
    if (Item.areValidProps(data)) {
      const item = Item.get(itemName);
      
      // update item props
      const props = Object.keys(data);
      props.forEach(p => item[p] = data[p]);
  
      return item;
    } else {
      throw UnableToUpdateErr;
    }
  }

  static delete(itemName) {
    const itemToDeleteIndex = Item.getItemIndex(itemName);
    items.splice(itemToDeleteIndex, 1);
  }


  // Helper methods

  static areValidProps(data) {
    const hasName = 'name' in data;
    const isValidPrice = 'price' in data && !isNaN(data.price);
    
    return Object.keys(data).length < 2 ? hasName || isValidPrice 
                                        : hasName && isValidPrice;
  }

  static getItemIndex(itemName) {
    const index = items.findIndex(i => i.name === itemName);
    if (index === -1) {
      throw NotFoundErr;
    }
    return index;
  }
  
}

module.exports = {
  Item,
  NotFoundErr,
  UnableToAddErr,
  UnableToUpdateErr
}

