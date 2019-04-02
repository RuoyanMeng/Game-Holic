import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
//import { routerReducer } from 'react-router-redux';

import authReducers from './authReducers'
import allGames from './getAllGames'
import singleGame from './getSingleGame'
import gameList from './editGameList'




const rootReducer = combineReducers({
    auth:authReducers,
    allGames,
    singleGame,
    gameList,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;