const { getNumberArray, getMean, getMode, getMedian } = require('./math-funcs');
const express = require('express');
const ExpressError = require('./expressError');

const app = express();
app.use(express.json()); // on every request use json
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res, next) => {
  try {
    return res.send(`
      <ul>
        <li><a href="/mean">mean</a></li>
        <li><a href="/median">median</a></li>
        <li><a href="/mode">mode</a></li>
      </ul>
    `)
  } catch (err) {
    return next(err);
  }
})

app.get('/mean', (req, res, next) => {
  try {
    const nums = getNumberArray(req.query.nums);
    const mean = getMean(nums);
  
    return res.json({ operation: 'mean', value: mean });
  } catch (err) {
    return next(new ExpressError(err.message, 400));
  }
  
});

app.get('/median', (req, res, next) => {
  try {
    const nums = getNumberArray(req.query.nums);
    const median = getMedian(nums);
  
    return res.json({ operation: 'median', value: median });
  } catch (err) {
    return next(new ExpressError(err.message, 400));
  }
});

app.get('/mode', (req, res, next) => {
  try {
    const nums = getNumberArray(req.query.nums);
    const mode = getMode(nums);
  
    return res.json({ operation: 'mode', value: mode });
  } catch (err) {
    return next(new ExpressError(err.message, 400));
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});