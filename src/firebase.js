import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCfWXc1juYJ47zNUZN-ErWq0WGpjDBtIXE",
	authDomain: "expense-tracker-fbce1.firebaseapp.com",
	projectId: "expense-tracker-fbce1",
	storageBucket: "expense-tracker-fbce1.appspot.com",
	messagingSenderId: "560986135779",
	appId: "1:560986135779:web:319eac5f8201935e4d79d6",
	measurementId: "G-8W8N100TK0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider, storage };