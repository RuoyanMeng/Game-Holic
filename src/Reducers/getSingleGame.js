const initialState = {
  game: {},
  isFetching: "LOADING",
  playStatus: ''
}

export default function getSingleGameReducer(state = initialState, action) {
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
    case 'GET_PLAYSTATUS_SUCCESS':
      console.log(action.playStatus)
      return {
        ...state,
        playStatus: action.playStatus
      }
    default:
      return state

  }
}