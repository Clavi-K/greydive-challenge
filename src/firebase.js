import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBHfAXSh682SUqMTH5SWOmlOHQyW_QEXMo",
    authDomain: "greydive-challenge-33ec7.firebaseapp.com",
    projectId: "greydive-challenge-33ec7",
    storageBucket: "greydive-challenge-33ec7.appspot.com",
    messagingSenderId: "600666961059",
    appId: "1:600666961059:web:728bd27b6686329b67fb16"
}

firebase.initializeApp(firebaseConfig)

export default firebase.firestore()