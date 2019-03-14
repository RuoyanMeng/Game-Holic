const initialState = {
  game: {},
  isFetching:"LOADING"
}

export default function getAllGamesReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_SINGLEGAME_SUCCESS':
      return {
        ...state,
        isFetching: "LOADED",
        game: action.game[0]
      }
    case 'ERROR_MESSAGE':
      return {
        ...state,
        idFeching: "ERROR"
      }
    default:
      return state

  }
}