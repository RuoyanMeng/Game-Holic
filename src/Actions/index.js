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

export const addItemToWishList = (briefGameInfo) =>{
    return (dispatch,getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('wishlist').add({
            ...briefGameInfo
          }).then(() => {
            dispatch({ type: types.ADD_WISHLIST_SUCCESS });
          }).catch(err => {
            dispatch({ type: types.ADD_WISHLIST_ERROR }, err);
          });
    }
}

export function removeItemFromWishList(briefGameInfo){
    return{
        type:types.REMOVE_WISHLIST_ITEM,briefGameInfo
    };
}







