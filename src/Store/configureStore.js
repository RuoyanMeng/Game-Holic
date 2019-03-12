import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { syncHistoryWithStore} from 'react-router-redux';
//import { history } from 'react-router';


// import the root reducer
import rootReducer from '../Reducers/Index';

//import comments from './data/comments';
//import posts from './data/posts';

// create an object for the default data
// const defaultState = {
//   playlist:[]
// };

function configureStore(){ 
  return createStore(rootReducer, applyMiddleware(thunk));
}

//export const _history = syncHistoryWithStore(history, store);

export default configureStore;