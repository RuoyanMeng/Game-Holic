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
    //console.log(inputValue)
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

export function loadSingleGameCoverSuccess(game) {
    return {
        type: types.LOAD_SINGLEGAMECOVER_SUCCESS, game
    };
}

export function getSingleGame(id) {
    return function (dispatch) {
        gamesApi.getGame(id).then(game => {
            console.log(game,'game')
            dispatch(loadSingleGameSuccess(game));
            if (game.length > 0 && game[0].cover) {
                dispatch(getSingleGameCover(game[0].cover))
            }
        }).catch(error => {
            dispatch(errorMessage);
            throw (error);
        });
    }
}

export function getSingleGameCover(id) {
    return function (dispatch) {
        gamesApi.getGameCover(id).then(game => {
            console.log(game,'cover')
            dispatch(loadSingleGameCoverSuccess(game));
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







