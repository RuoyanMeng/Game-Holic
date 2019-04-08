

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
      //console.log(action.searchResults)
      return {
        ...state,
        isFetching: "LOADED",
        searchResults: action.searchResults
      }
    case 'RESET_STATE':
      console.log('reset state')
      //console.log(state)
      return {
        ...state,
        searchResults: []
      }
    default:
      return state

  }

}
