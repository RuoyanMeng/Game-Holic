const initialState = {
  game: {},
  isFetching:"LOADING"
}

export default function getSingleGameReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_SINGLEGAME_SUCCESS':
      return {
        ...state,
        isFetching: "LOADED",
        game: action.game.length > 0 ? action.game[0] : {}
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