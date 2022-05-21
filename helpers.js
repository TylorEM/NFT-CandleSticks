export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    //return fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }).then((response) => response.json());
  }
}
