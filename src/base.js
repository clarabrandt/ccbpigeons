import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDyyqV4kh2IFRER9sdlLy0psfEttCFr5iQ",
    authDomain: "pigeon-90548.firebaseapp.com",
    databaseURL: "https://pigeon-90548.firebaseio.com",
    projectId: "pigeon-90548",
    storageBucket: "pigeon-90548.appspot.com",
    messagingSenderId: "983255754117"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export { base }