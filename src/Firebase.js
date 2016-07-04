import firebase from "firebase";
var config = {
    apiKey: "AIzaSyASziRyT30ptO675n5bcrOsFrM1oELwfyc",
    authDomain: "szukajka-51fe6.firebaseapp.com",
    databaseURL: "https://szukajka-51fe6.firebaseio.com",
    storageBucket: "szukajka-51fe6.appspot.com"
};

export default firebase.initializeApp(config)