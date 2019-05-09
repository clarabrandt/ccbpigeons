import {
  checkFetchReturnStatus,
  restCall,
  formBodyUrlEncode,
  translateToJson
} from "./fetch.js";

class api {
  constructor() {
    this._baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

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
      method: "GET",
      credentials: "omit"
    })
      .then(checkFetchReturnStatus) // status check
      .then(res => res.json()) // translate to json
      .catch(err => console.log(err));
  }

  getBlog() {
    let endpoint = `${this.baseUrl}blog`;

    return restCall(endpoint, {
      method: "GET",
      credentials: "omit"
    })
      .then(checkFetchReturnStatus) // status check
      .then(res => res.json()) // translate to json
      .catch(err => console.log(err));
  }

  postBlog() {
    let endpoint = `${this.baseUrl}blog`;

    let titulo = document.getElementById("titulo").value;
    let conteudo = document.getElementById("conteudo").value;

    fetch(endpoint, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ titulo: titulo, conteudo: conteudo })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  getSobre() {
    let endpoint = `${this.baseUrl}sobre`;

    return restCall(endpoint, {
      method: "GET",
      credentials: "omit"
    })
      .then(checkFetchReturnStatus) // status check
      .then(res => res.json()) // translate to json
      .catch(err => console.log(err));
  }
  getArtigos() {
    let endpoint = `${this.baseUrl}artigos`;

    return restCall(endpoint, {
      method: "GET",
      credentials: "omit"
    })
      .then(checkFetchReturnStatus) // status check
      .then(res => res.json()) // translate to json
      .catch(err => console.log(err));
  }
  postArtigos() {
    let endpoint = `${this.baseUrl}home`;

    let foto = document.getElementById("title").value;

    fetch(endpoint, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ foto: foto })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  getFotos() {
    let endpoint = `${this.baseUrl}fotos`;

    return restCall(endpoint, {
      method: "GET",
      credentials: "omit"
    })
      .then(checkFetchReturnStatus) // status check
      .then(res => res.json()) // translate to json
      .catch(err => console.log(err));
  }

  postFotos() {
    let endpoint = `${this.baseUrl}home`;

    let foto = document.getElementById("foto").value;

    fetch(endpoint, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ foto: foto })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  getMidia() {
    let endpoint = `${this.baseUrl}midia`;

    return restCall(endpoint, {
      method: "GET",
      credentials: "omit"
    })
      .then(checkFetchReturnStatus) // status check
      .then(res => res.json()) // translate to json
      .catch(err => console.log(err));
  }
}

export default api;
