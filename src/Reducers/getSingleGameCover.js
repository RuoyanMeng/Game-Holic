const initialState = {
    gameCover: '',
    isFetching:"LOADING"
  }
  
  export default function getSingleGameCoverReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_SINGLEGAMECOVER_SUCCESS':
        return {
          ...state,
          isFetching: "LOADED",
          gameCover: action.game[0].url
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