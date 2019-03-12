import API_KEY from './api';

const BASE_URL = 'https://api-v3.igdb.com';
const httpOptions = {
    method: "GET",
    headers: { "user-key": API_KEY }
  };

class GamesApi {

/**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  static getAllGames = (query,type) =>{
    //let limit = 15;
    //let offset = 0;
    const url = `${BASE_URL}/games/search?=${query}&fields=name,platforms.abbreviation,rating,cover.image_id`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  static getGame=(id)=>{
    const url = `${BASE_URL}/games/${id}?fields=summary,name,platforms.abbreviation,cover.image_id,storyline,rating,first_release_date`;
    return fetch(url, httpOptions).then(this.processResponse)
  }

}

  export default GamesApi;

