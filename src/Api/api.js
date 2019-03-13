import API_KEY from '../APIKEY';
const queryString = require('query-string');
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com';
//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const httpOptions = {
    method: "GET",
    headers: { 
      "user-key":API_KEY,
      "origin":'http://localhost:3000/'
  }
  };

class GamesApi {

/**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  static getAllGames = (query) =>{
    //let limit = 15;
    //let offset = 0;
    const url = `${BASE_URL}/games/search?=${query}&fields=name`;
    return fetch(queryString.stringify(url,httpOptions)).then(this.processResponse);
  }

  static getGame=(id)=>{
    const url = `${BASE_URL}/games/${id}?fields=summary,name,platforms.abbreviation,cover.image_id,storyline,rating,first_release_date`;
    return fetch(queryString.stringify(url,httpOptions)).then(this.processResponse)
  }

}

  export default GamesApi;


  // Hi, I find that the POST request for enabling CORS is Invalid, always got 404. I think another user has the same problem as me but got no answer in Discard. Do you have any solution for this? Thanks a lot

