const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const PORT = process.env.PORT || '3000';
const USER_ERROR = 422;
const errorHandler = (error, req, res, next, message) => {
  message = message || 'Oops! Looks like that doesn\'t work :(';
  res.status(USER_ERROR).send({error, message});
};
const asyncMiddleware = cb =>
  (req, res, next) =>
    Promise.resolve(cb(req, res, next)).catch(error => errorHandler(error, req, res, next));

const app = express();
app.use(bodyParser.json());
app.use(express.static('./src/public', {
  index: false
}));

app.get('/', asyncMiddleware(async (req, res, next) => {
  await res.sendFile(path.resolve(__dirname, '../public/index.html'));
}));

app.listen(PORT);
console.log('Server running on port ' + PORT);
