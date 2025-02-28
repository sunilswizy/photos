import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDjRnkrvftmgmiMBsEDNUYdgj3z2cIUqUE",
    authDomain: "clipzgamers.firebaseapp.com",
    projectId: "clipzgamers",
    storageBucket: "clipzgamers.appspot.com",
    messagingSenderId: "31821995993",
    appId: "1:31821995993:web:fb773b882d3db6cbd843c8"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
