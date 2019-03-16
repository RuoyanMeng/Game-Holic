import API_KEY from '../APIKEY';
import axios from 'axios';
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com';
class GamesApi {
  /**
     * Do an API call to the search API endpoint.
     * @returns {Promise<any>}
     */
  static getAllGames = (query) => {
    //console.log(query)
    let search = null;
    let _url = null;
    if (query === "") {
      _url = "/games";
      search = '';
    } else {
      _url = "/search";
      search = "search " + `"${query}"` + ";";
    }

    return axios({
      url: _url,
      baseURL: BASE_URL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': API_KEY
      },
      data: 'fields *;' + search + ' limit 20;'
    })
      .then(response => {
        console.log(response.data);
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
      //if need more info about game attribute, go to https://api-docs.igdb.com/, you can add elements follow the API doc
      data: "fields name,rating,popularity,cover,platforms;" + idQuery
    })
      .then(response => {
        //console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.error(err);
      })


  }


}

export default GamesApi;


  // Hi, I find that the POST request for enabling CORS is Invalid, always got 404. I think another user has the same problem as me but got no answer in Discard. Do you have any solution for this? Thanks a lot

