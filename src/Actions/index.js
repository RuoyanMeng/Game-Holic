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

export const addItemToList = (briefGameInfo) => {
    let uid = briefGameInfo.uid;
    let listType = briefGameInfo.playStatus;
    let gameId = briefGameInfo.gameID;
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(uid).collection('games').doc(gameId).set({
            listType: listType,
            gameId : briefGameInfo.gameID
        }).then(() => {
            console.log("game listType added!");
        });
        firestore.collection('users').doc(uid).collection(listType).doc(gameId).set({
            ...briefGameInfo
        }).then(() => {
            console.log("Game successfully added!");
            dispatch({ type: types.ADD_LIST_SUCCESS, uid });
        }).catch(err => {
            dispatch({ type: types.ADD_LIST_ERROR }, err);
        });
    }
}

export function removeItemFromWishList(id) {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('wishlist').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            dispatch({ type: types.REMOVE_LIST_SUCCESS });
        }).catch(err => {
            dispatch({ type: types.REMOVE_LIST_ERROR }, err);
        });
    }
}







