import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const config = {
    apiKey: "your apiKey",
    authDomain: "your authDomain",
    databaseURL: "your databaseURL",
    projectId: "your projectId",
    storageBucket: "your storageBucket",
    messagingSenderId: "your messagingSenderId",
    appId: "your appId"
};
firebase.initializeApp(config);
const db = firebase.database();
const storage = firebase.storage();
export {
    db,
    storage,
}
