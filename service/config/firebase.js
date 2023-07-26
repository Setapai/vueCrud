import firebase from 'firebase';

// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDpMW9IU3prGBV6zZ54krm5Aqpnj16_o7I",
    authDomain: "inventorycrud-baf51.firebaseapp.com",
    projectId: "inventorycrud-baf51",
    storageBucket: "inventorycrud-baf51.appspot.com",
    messagingSenderId: "363466377391",
    appId: "1:363466377391:web:33012669b9437b0a1eac5a"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const collection = (collection) => db.collection(collection)

export default collection;
