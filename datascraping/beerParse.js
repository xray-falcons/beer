const axios = require('axios');
const $ = require('cheerio');
// const url = 'https://en.wikipedia.org/wiki/George_Washington';

const beerParse = url => {
  axios
    .get(url)
    .then(res => res.data)
    .then(html => {
      console.log($('.firstHeading', html).text());
      console.log($('.bday', html).text());
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = beerParse;

// beerParse(url);
