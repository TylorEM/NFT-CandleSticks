import FetchWrapper from './helpers';

//const API = new FetchWrapper('https://api.opensea.io/api/v1/collection');

API.get('/kaiju-kingz/stats')
  .then((data) => console.log(data.stats.floor_price))
  .catch((err) => console.error(err));
