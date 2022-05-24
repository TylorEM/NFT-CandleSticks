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

//*Functions

// Creating a Function "getAPIName" that is receiving "contractData" and "statsData" (two separate fetch calls b/c they come from different endpoints) from the OpenSea API using the FetchWrapper Class' "getWithHeaders" & "get" Methods.
const getApiName = () => {
  API.getWithHeaders(`asset_contract/${nftSearchAddress.value}`)
    .then((contractData) => {
      // Dynamically adding Text Content to the nftName
      console.log(contractData.name);
      nftName.textContent = contractData.name;
      console.log(contractData.collection.slug);

      // Making a Fetch call within the first Fetch call b/c I need to access the "contractData.collection.slug" data in order to make the second Fetch call.
      //? Possibly could just use the "getWithHeaders" Class Method. Testing Soon...
      API.get(`collection/${contractData.collection.slug}/stats`)
        .then((statsData) => {
          // Testing to see if the floor price data is received.
          console.log(statsData.stats.floor_price);
          // Accessing all of the stats Keys and placing them in a created Variable "statsKeys"
          const statsKeys = Object.keys(statsData.stats);
          // Accessing the "floor-price" Key by Looping through the "statsKeys" with the .find Method and placing it within the Variable "floorPriceKey"
          const floorPriceKey = statsKeys
            .find((key) => key === 'floor_price')
            // Using the .replace Method to switch the "_" to a " ".
            .replace('_', ' ');
          datasetContainer.innerHTML = `<li class="data"><strong>${floorPriceKey}</strong>: ${statsData.stats.floor_price}</li>`;
        })
        .catch((err) => console.error(err));
    })
    // Using the .catch Method to console log the error, "err", when the Fetch call runs a Promise that ends in a rejected state (ie. Network connection issue).
    .catch((err) => console.error(err));
};

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
      //* Function call within the "if" statement that runs the "getAPIName" Function.
      getApiName();
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
    nftName.textContent = '';
    datasetContainer.innerHTML = '';
  });
};

//const addressToName = () => {
//  if(nftSearchAddress.value === )
//}

//*Function Calls
searchAddressSubmit();
focusedInput();
