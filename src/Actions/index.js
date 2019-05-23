import gamesApi from "../Api/api";
import * as types from "./actionTypes";

// the currently visible error message.
export const errorMessage = () => ({
  type: types.ERROR_MESSAGE
});

//load index results action
export function loadGameSuccess(games) {
  return {
    type: types.LOAD_GAMES_SUCCESS,
    games
  };
}

export function getAllGames(inputValue) {
  return function(dispatch) {
    gamesApi
      .getAllGames(inputValue)
      .then(games => {
        dispatch(loadGameSuccess(games));
      })
      .catch(error => {
        dispatch(errorMessage);
        throw error;
      });
  };
}

//load index results action
export function loadSearchResultsSuccess(searchResults) {
  return {
    type: types.LOAD_SEARCH_RESULTS_SUCCESS,
    searchResults
  };
}

export function getSearchResults(inputValue) {
  return function(dispatch) {
    gamesApi
      .getSearchResults(inputValue)
      .then(searchResults => {
        dispatch(loadSearchResultsSuccess(searchResults));
      })
      .catch(error => {
        dispatch(errorMessage);
        throw error;
      });
  };
}

export function loadSingleGameSuccess(game) {
  return {
    type: types.LOAD_SINGLEGAME_SUCCESS,
    game
  };
}

export function getSingleGame(id) {
  return dispatch => {
    gamesApi
      .getGame(id)
      .then(game => {
        dispatch(loadSingleGameSuccess(game));
      })
      .catch(error => {
        dispatch(errorMessage);
        throw error;
      });
  };
}

export const addItemToList = briefGameInfo => {
  let uid = briefGameInfo.uid;
  let gameId = briefGameInfo.gameID;
  let playStatus = briefGameInfo.playStatus;
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    //add new item to correspend list
    firestore
      .collection("users")
      .doc(uid)
      .collection("games")
      .doc(gameId)
      .set({
        ...briefGameInfo
      })
      .then(() => {
        dispatch({ type: types.ADD_LIST_SUCCESS, uid });
        dispatch({ type: types.GET_PLAYSTATUS_SUCCESS, playStatus });
      })
      .catch(err => {
        dispatch({ type: types.ADD_LIST_ERROR }, err);
      });
  };
};

export function getPlayStatus(id) {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    var playStatus = null;
    if (id.uid === null) {
      playStatus = "Set Status";
      dispatch({ type: "GET_PLAYSTATUS_SUCCESS", playStatus });
    } else {
      firestore
        .collection("users")
        .doc(id.uid)
        .collection("games")
        .where("gameID", "==", id.gameID)
        .get()
        .then(games => {
          if (games.size === 0) {
            playStatus = "Set Status";
            dispatch({ type: "GET_PLAYSTATUS_SUCCESS", playStatus });
          } else {
            games.forEach(game => {
              playStatus = game.data();
              dispatch({ type: "GET_PLAYSTATUS_SUCCESS", playStatus });
            });
          }
        })
        .catch(err => {});
    }
  };
}

export function getGameList(listType) {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    var gameList = [];
    firestore
      .collection("users")
      .doc(listType.uid)
      .collection("games")
      .where("playStatus", "==", listType.listType)
      .get()
      .then(games => {
        if (games.size === 0) {
          gameList = {};
          dispatch({ type: "GET_" + listType.listType + "_SUCCESS", gameList });
        } else {
          games.forEach(game => {
            gameList.push(game.data());
          });
          dispatch({ type: "GET_" + listType.listType + "_SUCCESS", gameList });
        }
      })
      .catch(err => {
        dispatch({ type: "GET_PLAYSTATUS_ERROR" }, err);
      });
  };
}

export function addComments(commentInfo) {
  let commentList = commentInfo.commentList;
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("commentList")
      .doc(commentInfo.gameID)
      .set({
        ...JSON.parse(JSON.stringify(commentList))
      })
      .then(() => {
        dispatch({ type: types.ADD_COMMENTS_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: types.ADD_COMMENTS_ERROR }, err);
      });
  };
}

export function getComments(gameID) {
  let commentList;
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("commentList")
      .doc(gameID)
      .get()
      .then(comments => {
        console.log(comments._document)
        if (comments._document === null) {
          commentList = [];
        } else {
          commentList = Object.values(comments.data());
        }
        dispatch({ type: types.GET_COMMENTS_SUCCESS, commentList });
      })
      .catch(err => {
        dispatch({ type: types.GET_COMMENTS_ERROR }, err);
      });
  };
}

export function resetState(section) {
  return dispatch => {
    dispatch({ type: types.RESET_STATE + "_" + section });
  };
}
