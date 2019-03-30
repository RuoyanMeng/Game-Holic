import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyBVeT1XcYFz4miqIoYbjNqE_sH46hIgYNQ",
    authDomain: "game-holic-590ee.firebaseapp.com",
    databaseURL: "https://game-holic-590ee.firebaseio.com",
    projectId: "game-holic-590ee",
    storageBucket: "game-holic-590ee.appspot.com",
    messagingSenderId: "545901800708"
  };
  firebase.initializeApp(config);
  firebase.firestore();
  
  export default firebase 