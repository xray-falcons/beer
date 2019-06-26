const axios = require('axios');
const $ = require('cheerio');
// const url = 'https://brooklynbrewery.com/brooklyn-beers/perennial-brews';
const beerParse = require('./beerParse');

async function beerScrape(url) {
  try {
    let html = await axios.get(url);
    let names = $('h2 > .sqs-block html-block sqs-block-html');
    console.log('we got names!', names, 'length: ', names.length);
  } catch (error) {
    console.log('we have a problem', error);
  }
}

// axios
//   .get(url)
//   //   .then(res => res.data)
//   .then(html => {
//     console.log(html);
//     // const beerUrls = [];
//     // for (let i = 0; i < 45; i++) {
//     //   beerUrls.push($('big > a', html)[i].attribs.href);
//     // }
//     // console.log('beerUrls', beerUrls)
//     // return Promise.all(
//     //   wikiUrls.map(url => {
//     //     return beerParse('https://en.wikipedia.org' + url);
//     //   })
//     // );
//   })
//   //   .then(function(presidents) {
//   //     console.log(presidents);
//   //   })
//   .catch(err) {
//     console.log('got error')
//   });

beerScrape(`https://www.folksbier.com/old-bavarian-lager`);
