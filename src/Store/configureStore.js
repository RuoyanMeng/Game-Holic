import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { syncHistoryWithStore} from 'react-router-redux';
//import { history } from 'react-router';


// import the root reducer
import rootReducer from '../Reducers/Index';


export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
