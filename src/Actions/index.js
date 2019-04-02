import gamesApi from '../Api/api'
import * as types from './actionTypes'


// the currently visible error message.
export const errorMessage = () => ({
    type: types.ERROR_MESSAGE
})

//load index results action
export function loadGameSuccess(games) {
    return {
        type: types.LOAD_GAMES_SUCCESS, games
    };
}

export function getAllGames(inputValue) {
    console.log(inputValue)
    return function (dispatch) {
        gamesApi.getAllGames(inputValue).then(games => {
            console.log("get success")
            dispatch(loadGameSuccess(games));
        }).catch(error => {
            console.log("get error")
            dispatch(errorMessage)
            throw (error);
        });
    }
}

//load index results action
export function loadSearchResultsSuccess(searchResults) {
    return {
        type: types.LOAD_SEARCH_RESULTS_SUCCESS, searchResults
    };
}

export function getSearchResults(inputValue) {
    console.log(inputValue)
    return function (dispatch) {
        gamesApi.getSearchResults(inputValue).then(searchResults => {
            console.log("get success")
            dispatch(loadSearchResultsSuccess(searchResults));
        }).catch(error => {
            console.log("get error")
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
    let gameId = briefGameInfo.gameID;
    console.log(briefGameInfo.gameName)
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        //add new item to correspend list
        firestore.collection('users').doc(uid).collection('games').doc(gameId).set({
            ...briefGameInfo
        }).then(() => {
            console.log("game listType added!");
            dispatch({ type: types.ADD_LIST_SUCCESS, uid });
        }).catch(err => {
            dispatch({ type: types.ADD_LIST_ERROR }, err);
        });
    }
}

// export function removeItemFromWishList(id) {
//     return (dispatch, getState, { getFirestore }) => {
//         const firestore = getFirestore();
//         firestore.collection('wishlist').doc(id).delete().then(() => {
//             console.log("Document successfully deleted!");
//             dispatch({ type: types.REMOVE_LIST_SUCCESS });
//         }).catch(err => {
//             dispatch({ type: types.REMOVE_LIST_ERROR }, err);
//         });
//     }
// }

export function getPlayStatus(id) {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        var playStatus = null;
        firestore.collection('users').doc(id.uid).collection('games').where('gameID', '==', id.gameID).get().then(games => {
            console.log(games.size);
            if (games.size === 0) {
                console.log("GET PLAYSTATUS SUCCESS: None!");
                playStatus = 'None'
                dispatch({ type: "GET_PLAYSTATUS_SUCCESS", playStatus });
            } else {
                games.forEach(game => {
                    console.log("GET_PLAYSTATUS_SUCCESS!");
                    playStatus = game.data().playStatus
                    console.log(playStatus)
                    dispatch({ type: "GET_PLAYSTATUS_SUCCESS", playStatus });
                })
            }
        }).catch(err => {
            //dispatch({ type: 'GET_PLAYSTATUS_ERROR' }, err);
        });

    }
}










