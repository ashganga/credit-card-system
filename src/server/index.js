const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
app.use(express.static('dist'));

// splitting the number string, then on every odd digit making it double
// reducing the array furher so that for each value in array if the value greater than 10,
// adding the 2 digits in the current value , adding all values in array and taking modulo 10
const luhn = number => number.split('').map((digit, index, arr) => ((index % 2 !== arr.length % 2) ? parseInt(digit, 10) : 2 * digit)).reduce(function sum(val, cur) {
  return val + (cur < 10 ? parseInt(cur, 10) : (String(cur).split('').reduce(sum, 0)));
}) % 10;

app.get('/api/getAll', (req, res) => {
  res.json(data);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/add', (req, res) => {
  const cardDetails = req.body;
  console.log(req);
  // luhn check
  if (luhn(cardDetails.cardNumber) === 0) {
    console.log('Adding new card: ', cardDetails);
    // add new card to array
    data.push(cardDetails);
    // return updated card list
    res.json(data);
  } else {
    res.status('400').json(data);
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
module.exports = app;