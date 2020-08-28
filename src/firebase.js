import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBJF5UoJMH3Y9Um905KaeOB5jFVv9UiPkA",
  authDomain: "instagram-clone-ec845.firebaseapp.com",
  databaseURL: "https://instagram-clone-ec845.firebaseio.com",
  projectId: "instagram-clone-ec845",
  storageBucket: "instagram-clone-ec845.appspot.com",
  messagingSenderId: "844636323126",
  appId: "1:844636323126:web:f5596038ee4563ef6bc797",
  measurementId: "G-JXHRS21LHH"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
