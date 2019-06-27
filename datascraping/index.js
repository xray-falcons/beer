const axios = require('axios');
const jsonfile = require('jsonfile');
// const url = 'https://brooklynbrewery.com/brooklyn-beers/perennial-brews';
// const beerParse = require('./beerParse');

async function beerScrape(url) {
  try {
    let { data } = await axios.get(url);
    for (let key in data){
      beer.findOrCreat()
    }

    console.log('data', data);
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

beerScrape(
  `https://sandbox-api.brewerydb.com/v2/beers/?p=1&key=f2bea26fda6949376193a495216ceab8`
);
