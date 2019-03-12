import initialState from './initialState'

export default function getAllGamesReducer(state = initialState, action) {
    if (action.type === "LOAD_SINGLEGAME_SUCCESS") {
        return Object.assign({}, state, {
          game: action.game
        })
      } else {
        return state
      }
}