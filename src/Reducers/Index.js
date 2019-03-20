import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import allGames from './getAllGames'
import singleGame from './getSingleGame'
import singleGameCover from './getSingleGameCover'
import wishlist from './editWishList'


const rootReducer = combineReducers({
    allGames,
    singleGame,
    singleGameCover,
    wishlist
});

export default rootReducer;