import initialState from './initialState'

export default function getAllGamesReducer(state = initialState.games, action) {
    if (action.type === "LOAD_GAMES_SUCCESS") {
        return Object.assign({}, state, {
          games: action.games
        })
      } else {
        return state
      }
}