// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithRedirect} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7gw1LyiyVDWXL3MTx_mb2UU-Iy0YVWq4",
  authDomain: "lumina-6df49.firebaseapp.com",
  projectId: "lumina-6df49",
  storageBucket: "lumina-6df49.appspot.com",
  messagingSenderId: "946918960522",
  appId: "1:946918960522:web:9960b19312a17e39aeac73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);

const provider= new GoogleAuthProvider();

export function googleAuth (){

    signInWithRedirect(auth,provider)
    .then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })

}