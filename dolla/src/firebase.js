import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/* const firebaseConfig = {
  apiKey: "AIzaSyAPWE1xpiyIuA55wgHSpK3uJOhPLrPyv4s",
  authDomain: "bookurhour.firebaseapp.com",
  projectId: "bookurhour",
  storageBucket: "bookurhour.appspot.com",
  messagingSenderId: "581262812883",
  appId: "1:581262812883:web:5e044ca99ead4998ce9626",
  measurementId: "G-965CZQSTDC"
};
*/



const firebaseConfig = {
  apiKey: "AIzaSyDNdSaZ7ZL-Gz03UttKvvPxsaHHEEfkbBk",
  authDomain: "interviewally-d6299.firebaseapp.com",
  projectId: "interviewally-d6299",
  storageBucket: "interviewally-d6299.appspot.com",
  messagingSenderId: "431420614531",
  appId: "1:431420614531:web:3a735ab776ac4ca425f8b6",
  measurementId: "G-RL5FVTN3ZV"
};

//initlize firebase with our app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//Initilize firebase Db
const db = firebaseApp.firestore();

//get a var for hansling sign in
const auth = firebase.auth();
export { db, auth };
