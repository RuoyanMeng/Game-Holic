

const initialState = {
  games: [],
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
        isFeching: "ERROR"
      }
    default:
      return state

  }

}
