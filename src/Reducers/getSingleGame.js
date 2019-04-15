const initialState = {
  game: {},
  isFetching: "LOADING",
  isGetingPlayStatus: "LOADING",
  playStatus: "Set Status"
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
      console.log('GET_PLAYSTATUS_SUCCESS: ' + action.playStatus)
      return {
        ...state,
        playStatus: action.playStatus,
        isGetingPlayStatus: "GET_PLAYSTATUS_SUCCESS"
      }
    case 'RESET_STATE_SINGLEGAME':
      console.log('reset state')
      return initialState
    default:
      return state

  }
}