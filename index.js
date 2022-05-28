// Importing the Default Class "FetchWrapper" from the helper.js Module.
import FetchWrapper from './helpers'

// Creating a Variable called "API" which contains the FetchWrapper Class w/ the baseURL as its Argument.
const API = new FetchWrapper('https://api.opensea.io/api/v1/')

//* DOM Selectors for HTML Elements.

// Id
const nftName = document.querySelector('#nft-name')
const nftSearchForm = document.querySelector('#nft-search-form')
const nftSearchAddress = document.querySelector('#nft-search-address')
export const errorMessage = document.querySelector('#address-error')

// Class
const datasetContainer = document.querySelector('.dataset-container')

//*Functions & API Calls

// Creating a Function "getAPIName" that is receiving "contractData" and "statsData" (two separate fetch calls b/c they come from different endpoints) from the OpenSea API using the FetchWrapper Class' "getWithHeaders" & "get" Methods.
const getApiName = () => {
  API.getWithHeaders(`asset_contract/${nftSearchAddress.value}`).then(
    (contractData) => {
      // Dynamically adding Text Content to the nftName
      console.log(contractData.name)
      nftName.textContent = contractData.name
      console.log(contractData.collection.slug)

      // Making a Fetch call within the first Fetch call b/c I need to access the "contractData.collection.slug" data in order to make the second Fetch call.
      //? Possibly could just use the "getWithHeaders" Class Method. Testing Soon...
      API.get(`collection/${contractData.collection.slug}/stats`).then(
        (statsData) => {
          // Testing to see if the floor price data is received.
          console.log(statsData.stats.floor_price)

          // Accessing all of the stats Keys and placing them in a created Variable "statsKeys"
          const statsKeys = Object.keys(statsData.stats)

          // Accessing the "floor-price" Key by Looping through the "statsKeys" with the .find Method and placing it within the Variable "floorPriceKey"
          const floorPriceKey = statsKeys
            .find((key) => key === 'floor_price')
            // Using the .replace Method to switch the "_" to a " ".
            .replace('_', ' ')

          //* Functions and Variables for the One Day Average Price
          const oneDayAveragePriceString = statsKeys
            .find((key) => key === 'one_day_average_price')
            .replaceAll('_', ' ')

          const oneDayAveragePriceData = statsData.stats.one_day_average_price
          console.log(oneDayAveragePriceData.toString().length)

          const oneDayAveragePrice = () => {
            if (oneDayAveragePriceData.toString().length > 4) {
              return oneDayAveragePriceData.toString().substring(0, 5)
            } else {
              return oneDayAveragePriceData
            }
          }

          //* Appending (using .insertAdjacentHTML b/c we are adding HTML to the index.html module) child li Elements to the datasetContainer DOM Selector ul and adding in various stats from the OpenSea API.

          // Appending the Floor Price.
          datasetContainer.insertAdjacentHTML(
            'beforeend',
            `<li class="data"><strong>${floorPriceKey}</strong>: ${statsData.stats.floor_price}</li>`
          )
          // Appending the One Day Average Price.
          datasetContainer.insertAdjacentHTML(
            'beforeend',
            `<li class="data"><strong>${oneDayAveragePriceString}</strong>: ${oneDayAveragePrice()}</li>`
          )
        }
      )
    }
  )
}

// Created a Function "searchAddressSubmit" that attaches an EventListener to the Form and either shows an Error within the "errorMessage" Element or, currently, Console Logs the length of the Contract Address.
const searchAddressSubmit = () => {
  // Creating a Variable "newError" with the Error message.
  const newError = new Error('Enter a valid Contract Address.')
  const messageString = newError.toString().substring(6)

  //* Form EventListener

  nftSearchForm.addEventListener('submit', (event) => {
    // Prevents the DOM from reloading after submission. This is the default action when submitting forms.
    event.preventDefault()

    // Test to see if the Text Input Value is accessible.
    console.log(nftSearchAddress.value)

    // If Else statement
    //? had the idea of trying to move this into the .catch error section of the fetch call to see if I can catch the error when the contract address is 42 characters but the fetch does not complete due to a contract input that does not exist.
    if (nftSearchAddress.value.length === 42) {
      console.log(nftSearchAddress.value.length)

      // Function call within the "if" statement that runs the "getAPIName" Function.
      getApiName()
    } else {
      // Showing error message within the DOM
      errorMessage.textContent = messageString
    }
  })
}

// Created a Function "focusedInput" that adds an EventListener to the search Text Input ("nftSearchAddress") that listens for the search bar to be focused in on. It then clears the search bar's Value and the "errorMessage" Elements Text Content.
const focusedInput = () => {
  nftSearchAddress.addEventListener('focus', () => {
    nftSearchAddress.value = ''
    errorMessage.textContent = ''
    nftName.textContent = ''
    datasetContainer.innerHTML = ''
  })
}

//*Function Calls

searchAddressSubmit()
focusedInput()

//0xfe0be00f15ac95f6a2d1b8bea07bfa42e1b81389
//0x248139afb8d3a2e16154fbe4fb528a3a214fd8e7
//0x78a5e2b8c280fa5580fbe1e1ed546183f959d305
