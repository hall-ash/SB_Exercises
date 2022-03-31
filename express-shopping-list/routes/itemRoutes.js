const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const { Item } = require('../item');

router.get('/', (req, res, next) => {
  try {
    const items = Item.getAllItems();

    return res.json(items);
  } catch (err) {
    return next(new ExpressError(err.message, err.status));
  }
});

router.post('/', (req, res, next) => {
  try {
    const item = Item.add(req.body);
  
    return res.status(201).json({'added': item});
  } catch (err) {
    return next(new ExpressError(err.message, err.status));
  }
});

router.get('/:name', (req, res, next) => {
  try {
    const item = Item.get(req.params.name);

    return res.json(item);
  } catch (err) {
    return next(new ExpressError(err.message, err.status));
  }
});

router.patch('/:name', (req, res, next) => {
  try {
    const itemName = req.params.name;
    const itemData = req.body;
 
    const item = Item.update(itemName, itemData);

    return res.json({'updated': item});
  } catch (err) {
    return next(new ExpressError(err.message, err.status));
  }
});

router.delete('/:name', (req, res, next) => {
  try {
    const itemName = req.params.name;


    Item.delete(itemName);

    return res.json({message: 'Deleted'});
  } catch (err) {
    return next(new ExpressError(err.message, err.status));
  }
});

module.exports = router;
