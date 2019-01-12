import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyACjmtViNE5NzmkwRsv44WMyLPuosRbcYo",
    authDomain: "biddingapplication-9fdd5.firebaseapp.com",
    databaseURL: "https://biddingapplication-9fdd5.firebaseio.com",
    storageBucket: "biddingapplication-9fdd5.appspot.com",
    messagingSenderId: "218093160316"

}

const fb = firebase
    .initializeApp(config)
    .database()
    .ref()

export const categories =  fb.child('category');
export const users =  fb.child('users');
export const items =  fb.child('items');