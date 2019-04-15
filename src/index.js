import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/firebaseConfig'

import './Styles/index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './Reducers/Index';


const store = configureStore();

store.firebaseAuthIsReady.then(() => {
  render(
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  //serviceWorker.unregister();
  serviceWorker.register();
});







function configureStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(fbConfig, { attachAuthIsReady: true, userProfile: 'users', useFirestoreForProfile: true, }), // redux binding for firebase
      reduxFirestore(fbConfig) // redux bindings for firestore
    ));
}
