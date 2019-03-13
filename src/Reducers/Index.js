import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import allGames from './getAllGames'
import singleGame from './getSingleGame'


const rootReducer = combineReducers({
    allGames,
    singleGame
});

export default rootReducer;