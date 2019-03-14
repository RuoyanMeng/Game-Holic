import gamesApi from '../Api/api'
import * as types from './actionTypes'


// the currently visible error message.
export const errorMessage = () => ({
    type: types.ERROR_MESSAGE
})

//load search results action
export function loadGameSuccess(games) {
    return {
        type: types.LOAD_GAMES_SUCCESS, games
    };
}

export function getAllGames(inputValue) {
    return function (dispatch) {
        gamesApi.getAllGames(inputValue).then(games => {
            dispatch(loadGameSuccess(games));
        }).catch(error => {
            dispatch(errorMessage)
            throw (error);
            
        });
    }
}

export function loadSingleGameSuccess(game) {
    return {
        type: types.LOAD_SINGLEGAME_SUCCESS, game
    };
}

export function getSingleGame(id) {
    return function (dispatch) {
        gamesApi.getGame(id).then(game => {
            dispatch(loadSingleGameSuccess(game));
        }).catch(error => {
            dispatch(errorMessage);
            throw (error);
        });
    }
}

export function addItemToWishList(briefGameInfo){
    return{
        type:types.ADD_WISHLIST,briefGameInfo
    };
}

export function removeItemFromWishList(briefGameInfo){
    return{
        type:types.REMOVE_WISHLIST_ITEM,briefGameInfo
    };
}







