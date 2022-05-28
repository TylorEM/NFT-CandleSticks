import { errorMessage } from './index.js'
// Exporting the FetchWrapper Class w/ the Constructor accepting an API baseURL as its Parameter.
export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  //  "GET" Method that accepts an API Endpoint as its Parameter w/Headers.
  getWithHeaders(endpoint) {
    // Fetching the complete URL and returning its Response as a Promise.

    return fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }).then((response) => {
      if (!response.ok) {
        console.log('Enter a valid Contract Address')
        errorMessage.textContent = 'Enter a valid Contract Address.'
      } else {
        return response.json()
      }
    })
  }

  //"GET" Method that accepts an API Endpoint as its Parameter.
  get(endpoint) {
    // Fetching the complete URL and returning its Response as a Promise.
    return fetch(this.baseURL + endpoint).then((response) => response.json())
  }
}
