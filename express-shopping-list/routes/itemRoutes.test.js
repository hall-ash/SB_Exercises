process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');

// get error messages from item.js
const { NotFoundErr, UnableToAddErr, UnableToUpdateErr } = require('../item');

let items = require('../fakeDb');

describe('item routes tests', () => {
  const item = {name: 'name', price: 12.34};
  const ITEM_PATH = '/items';

  beforeEach(() => {
    items.push(item);    
  });

  afterEach(() => {
    items.length = 0;
  });

  describe('GET /items', () => {
    it('should return a list of Item objects', async () => {
      const res = await request(app).get(ITEM_PATH);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([item]);
    })
  }); // end GET /items tests

  describe('POST /items', () => {
    it('should accept JSON data for an Item, add it to items, and send the added item as JSON', async () => {
      const newItem = {'name': 'newName', 'price': 99.99};
      const expectedJSON = {'added': newItem};

      const res = await request(app).post(ITEM_PATH).send(newItem);

      // test successful response
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expectedJSON);

      // test that item is added to items
      expect(items).toEqual([item, newItem]);
    });

    describe('POST /items with invalid data in request body', () => {
      it('should send a 400 error if the request contains a non-number as the price', async () => {
        const invalidData = {'name': 'newName', 'price': 'not a price'};
        
        const res = await request(app).post(ITEM_PATH).send(invalidData);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({'error': UnableToAddErr});
      });

      it(`should send a 400 error if the request contains JSON data that does not have 'name' and 'price' props`, async () => {
        const invalidData = {'invalid_prop': 'name', 'price': item.price};
        
        const res = await request(app).post(ITEM_PATH).send(invalidData);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({'error': UnableToAddErr});
      });

      it('should ensure that the items array remains unmodified on an unsuccessful request', async () => {
        const invalidData = {'name': 'newName', 'price': 'not a price'};
        
        // send bad req
        const res = await request(app).post(ITEM_PATH).send(invalidData);
        expect(res.statusCode).toBe(400);

        // test that items is unmodified
        expect(items).toEqual([item]);
      });
    });
  }); // end POST /items tests

  describe('GET /items/:name', () => {
    it(`should send the given item's name and price as JSON`, async () => {
      const res = await request(app).get(`${ITEM_PATH}/${item.name}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(item);
    });

    it(`should send a 404 error if the item can't be found`, async () => {
      const res = await request(app).get(`${ITEM_PATH}/non-existant`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({'error': NotFoundErr});
    })

    it('should ensure that the items array remains unmodified on an unsuccessful request', async () => {
      // send bad req
      const res = await request(app).get(`${ITEM_PATH}/non-existant`);
      expect(res.statusCode).toBe(404);

      // test that items is unmodified
      expect(items).toEqual([item]);
    });
  }); // end GET /items/:name tests

  describe('PATCH /items/:name', () => {
    it(`it should modify a single item's name and price and send the JSON of the updated item`, async () => {
      const updatedData = {'name': 'updatedName', 'price': 56.78};
      const expectedJSON = {'updated': updatedData};
      
      // test that item has original name and price
      expect(item.name).toBe(item.name);
      expect(item.price).toBe(item.price);

      // send request to update
      const res = await request(app).patch(`${ITEM_PATH}/${item.name}`).send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expectedJSON);
    });

    it(`it should modify a single item's name ONLY and send the JSON of the updated item`, async () => {
      const newName = 'updatedName'
      const updatedData = {'name': newName};
      const expectedJSON = {'updated': {'name': newName, 'price': item.price}}
      
      // test that item has original name and price
      expect(item.name).toBe(item.name);
      expect(item.price).toBe(item.price);

      // send request to update
      const res = await request(app).patch(`${ITEM_PATH}/${item.name}`).send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expectedJSON);
    });

    it(`it should modify a single item's price ONLY and send the JSON of the updated item`, async () => {
      const newPrice = 9999;
      const updatedData = {'price': newPrice};
      const expectedJSON = {'updated': {'name': item.name, 'price': newPrice}}
      
      // test that item has original name and price
      expect(item.name).toBe(item.name);
      expect(item.price).toBe(item.price);

      // send request to update
      const res = await request(app).patch(`${ITEM_PATH}/${item.name}`).send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expectedJSON);
    });

    it('should send a 400 error if the request contains a non-number as the price', async () => {
      const res = await request(app).patch(`${ITEM_PATH}/${item.name}`).send({'price': 'bad price'});

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({'error': UnableToUpdateErr});
    });

    it('should ensure that the items array remains unmodified on an unsuccessful request', async () => {
      // send bad req
      const res = await request(app).patch(`${ITEM_PATH}/${item.name}`).send({'price': 'bad price'});
      expect(res.statusCode).toBe(400);

      // test that items is unmodified
      expect(items).toEqual([item]);
    });

  }); // end PATCH /items:name tests

  describe('DELETE /items/:name', () => {
    it(`should delete the given item's from items and send a success message as JSON`, async () => {
      const successMsg = {message: 'Deleted'};

      const res = await request(app).delete(`${ITEM_PATH}/${item.name}`);

      // test successful response
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(successMsg);
      console.log(items);

      // test that item was deleted from items
      expect(items.length).toEqual(0);
    });

    it('should ensure that the items array remains unmodified on an unsuccessful request', async () => {
      // send bad req
      const res = await request(app).delete(`${ITEM_PATH}/non-existant`);
      expect(res.statusCode).toBe(404);

      // test that items is unmodified
      expect(items).toEqual([item]);
    });
  });
  // end DELETE /items:name tests

});
// end item routes tests