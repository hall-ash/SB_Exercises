const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const ExpressError = require('./expressError');

const app = express();
app.use(express.json()); // on every request use json
app.use(express.urlencoded({ extended: true }));

const ITEM_PATH = '/items';
app.use(ITEM_PATH, itemRoutes);

app.get('/', (req, res, next) => {
  try {
    return res.send(`<p>Go to <a href="/items">/items</a></p>`);
  } catch (err) {
    return next(err);
  }
});

// 404 handler
// runs if no match for any handlers above
app.use((req, res, next) => {
  const notFoundError = new ExpressError('Not Found', 404);
  return next(notFoundError);
});

// generic error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

/* 
  app.listen moved to server.js to enable testing 
  with supertest (server must not be running 
  while using supertest)
*/

module.exports = app;