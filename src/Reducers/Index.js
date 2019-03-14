import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
import allGames from './getAllGames'
import singleGame from './getSingleGame'
import wishlist from './editWishList'


const rootReducer = combineReducers({
    allGames,
    singleGame,
    wishlist
});

export default rootReducer;