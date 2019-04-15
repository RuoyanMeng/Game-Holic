import API_KEY from '../APIKEY';
import axios from 'axios';
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com';
class GamesApi {
  /**
     * Do an API call to the search API endpoint.
     * @returns {Promise<any>}
     */
  static getAllGames = (query) => {
    let search = null;
    let _url = null;
    if (query === "") {
      _url = "/games";
      search = "sort popularity desc;";
    }

    return axios({
      url: _url,
      baseURL: BASE_URL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': API_KEY
      },
      data: 'fields *, cover.*;' + search + ' limit 33;'
    })
      .then(response => {

        return response.data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  static getSearchResults = (query) => {
    let _url = "/games/";
    let search = "search " + `"${query}"` + ";";
    return axios({
      url: _url,
      baseURL: BASE_URL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': API_KEY
      },
      data: 'fields summary, name, cover.*;' + search + ' limit 33;'
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.error(err);
      });
  }


  static getGame = (id) => {
    let idQuery = "where id = " + `${id}` + ";";
    return axios({
      url: "/games",
      baseURL: BASE_URL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': API_KEY
      },
      data: "fields  name, total_rating, summary, cover.*, screenshots.*, keywords.*, genres.*, themes.*;" + idQuery
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.error(err);
      })
  }
}

export default GamesApi;


  // Hi, I find that the POST request for enabling CORS is Invalid, always got 404. I think another user has the same problem as me but got no answer in Discard. Do you have any solution for this? Thanks a lot

