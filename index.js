// Importing the Default Class "FetchWrapper" from the helper.js Module.
import FetchWrapper from './helpers';

// Creating a Variable called "API" which contains the FetchWrapper Class w/ the baseURL as its Argument.
const API = new FetchWrapper('https://api.opensea.io/api/v1/');

// DOM Selectors for HTML Elements.
//* Id
const nftSearchForm = document.querySelector('#nft-search-form');
const nftSearchAddress = document.querySelector('#nft-search-address');
const errorMessage = document.querySelector('#address-error');

//* Class
const nftName = document.querySelector('.nft-name');
const datasetContainer = document.querySelector('.dataset-container');

// Creating a hard coded Variable (for now) called "collectionSlug" which contains the Collection-Slug of the NFT.
const collectionSlug = 'kaiju-kingz';

//*Functions
// Created a Function "searchAddressSubmit" that attaches an EventListener to the Form and either shows an Error within the "errorMessage" Element or, currently, Console Logs the length of the Contract Address.
const searchAddressSubmit = () => {
  // Creating a Variable "newError" with the Error message.
  const newError = new Error('Enter the contract address.');
  const messageString = newError.toString();
  // Form EventListener
  nftSearchForm.addEventListener('submit', (event) => {
    // Prevents the DOM from reloading after submission. This is the default action when submitting forms.
    event.preventDefault();
    // Test to see if the Text Input Value is accessible.
    console.log(nftSearchAddress.value);
    // If Else statement
    if (nftSearchAddress.value.length === 42) {
      console.log(nftSearchAddress.value.length);
    } else {
      errorMessage.textContent = messageString;
    }
  });
};

// Created a Function "focusedInput" that adds an EventListener to the search Text Input ("nftSearchAddress") that listens for the search bar to be focused in on. It then clears the search bar's Value and the "errorMessage" Elements Text Content.
const focusedInput = () => {
  nftSearchAddress.addEventListener('focus', () => {
    nftSearchAddress.value = '';
    errorMessage.textContent = '';
  });
};

//*Function Calls
searchAddressSubmit();
focusedInput();

// Receiving data from the OpenSea API using the FetchWrapper Class' "get" method.
API.get(`asset_contract/0x0c2E57EFddbA8c768147D1fdF9176a0A6EBd5d83`)
  .then((data) => {
    // Dynamically adding Text Content to the nftName
    console.log(data.name);
    nftName.textContent = data.name;
  })
  // Using the .catch Method to console log the error, "err", when the Fetch call runs a Promise that ends in a rejected state (ie. Network connection issue).
  .catch((err) => console.error(err));

// Receiving data from the OpenSea API using the FetchWrapper Class' "getWithHeaders" Method.
API.getWithHeaders(`collection/${collectionSlug}/stats`)
  .then((data) => {
    // Testing to see if the API was accessed by visualizing the requested Data to the Console.
    console.log(data.stats.floor_price);

    //? The statsKeys variable accesses the keys that are in the "data.stats" Object.
    const statsKeys = Object.keys(data.stats);
    // Visualizing the keys available within the "data.stats" Object.
    console.log(statsKeys);
    // Using the .find Method on the statsKeys Variable to access the "floor_price" Key and placing it inside of the "floorPriceKey" Variable.
    const floorPriceKey = statsKeys
      .find((key) => key === 'floor_price')
      // Using the .replace Method to switch the "_" to a " ".
      .replace('_', ' ');

    //Dynamically adding an li Element w/ the "floorPriceKey" and floor price of the nft project using the .innerHTML Method to the "datasetContainer" Variable's ul Element.
    datasetContainer.innerHTML = `<li class="data"><strong>${floorPriceKey}</strong>: ${data.stats.floor_price}</li>`;
  })
  .catch((err) => console.error(err));
