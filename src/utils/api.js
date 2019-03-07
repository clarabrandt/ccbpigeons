import { checkFetchReturnStatus, restCall, formBodyUrlEncode, translateToJson } from './fetch.js';

class api {
  constructor() {
    this._baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';
    
    // this.handleError = this.handleError.bind(this);
  }

  /**
   * The base url where the REst api is running
   * @returns {string}
   */
  get baseUrl() {
    return this._baseUrl;
  }

 
  //  * Get all addresses assigned to user
  
  getResultados() {
    let endpoint = `${this.baseUrl}resultados`;

    return restCall(endpoint, {
      method: 'GET',
      credentials: 'omit',
    })
      .then(checkFetchReturnStatus)       // status check
      .then(res => res.json())  // translate to json
      .catch(err => console.log(err));
  }

  getBlog() {
    let endpoint = `${this.baseUrl}blog`;

    return restCall(endpoint, {
      method: 'GET',
      credentials: 'omit',
    })
      .then(checkFetchReturnStatus)       // status check
      .then(res => res.json())  // translate to json
      .catch(err => console.log(err));
  }
  getSobre() {
    let endpoint = `${this.baseUrl}sobre`;

    return restCall(endpoint, {
      method: 'GET',
      credentials: 'omit',
    })
      .then(checkFetchReturnStatus)       // status check
      .then(res => res.json())  // translate to json
      .catch(err => console.log(err));
  }
  /**
   * Get all addresses assigned to user
   */
  // getResultados() {
  //   return fetch('https://us-central1-pigeon-90548.cloudfunctions.net/api/asd', {
  //     method: 'GET',
  //     credentials: 'omit',
  //   })
  //     .then(checkFetchReturnStatus)
  //     .then(res => res.json())
  //     .catch(err => console.log(err));
  // }

  // getCopaMG() {
  //   let endpoint = `${this.baseUrl}copamg`;

  //   return restCall(endpoint, {
  //     method: 'GET',
  //     credentials: 'omit',
  //   })
  //     .then(checkFetchReturnStatus)       // status check
  //     .then(res => res.json())  // translate to json
  //     .catch(err => console.log(err));
  // }
}


export default api;