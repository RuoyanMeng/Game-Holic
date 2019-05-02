

const initialState = {
  games: [],
  searchResults: [],
  isFetching: "LOADING"
}

export default function getAllGamesReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_GAMES_SUCCESS':
      return {
        ...state,
        isFetching: "LOADED",
        games: action.games
      }
    case 'ERROR_MESSAGE':
      return {
        ...state,
        idFeching: "ERROR"
      }
    case 'LOAD_SEARCH_RESULTS_SUCCESS':
      return {
        ...state,
        isFetching: "LOADED",
        searchResults: action.searchResults
      }
    case 'RESET_STATE_SEARCHRESULTS':
      //console.log('reset state')
      return {
        ...state,
        searchResults: [],
        isFetching: "LOADING"
      }
    default:
      return state

  }

}
