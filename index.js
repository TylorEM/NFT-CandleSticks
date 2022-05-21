// Importing the Default Class "FetchWrapper" from the helper.js Module.
import FetchWrapper from './helpers';

// Creating a Variable called "API" which contains the FetchWrapper Class w/ the baseURL as its Argument.
const API = new FetchWrapper('https://api.opensea.io/api/v1/');

// Creating a hard coded Variable (for now) called "collectionSlug" which contains the Collection-Slug of the NFT.
const collectionSlug = 'kaiju-kingz';

// DOM Selector for the Element w/ the Class Name of 'nft-name'.
const nftName = document.querySelector('.nft-name');

// Receiving data from the OpenSea API using the FetchWrapper Class' "get" method.
API.get(`asset_contract/0x0c2E57EFddbA8c768147D1fdF9176a0A6EBd5d83`)
  .then((data) => {
    // Dynamically adding Text Content to the nftName
    nftName.textContent = data.name;
  })
  .catch((err) => console.error(err));

// Receiving data from the OpenSea API using the FetchWrapper Class' "getWithHeaders" method.
API.getWithHeaders(`collection/${endpoint}/stats`)
  .then((data) => {
    // Testing to see if the API was accessed by visualizing the requested Data to the Console.
    console.log(data.stats.floor_price);
  })
  .catch((err) => console.error(err));
