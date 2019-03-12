import gamesApi from '../Api/api'
import * as types from './actionTypes'


// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: types.RESET_ERROR_MESSAGE
})

//load search results action
export function loadGameSuccess(games) {
    return {
        type: types.LOAD_GAMES_SUCCESS, games
    };
}

export function getAllGames(inputValue, type) {
    return function (dispatch) {
        gamesApi.getAllGames(inputValue, type).then(games => {
            dispatch(loadGameSuccess(games));
        }).catch(error => {
            throw (error);
        });
    }
}

export function loadSingleGameSuccess(game) {
    return {
        type:types.LOAD_SINGLEGAME_SUCCESS, game
    };
}

export function getSingleGame(id){
    return function(dispatch){
        gamesApi.getGame(id).then(game=>{
            dispatch(loadSingleGameSuccess(game));
        }).catch(error => {
            throw (error);
        });
    }
}



