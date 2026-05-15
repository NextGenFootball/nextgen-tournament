import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7iz69Lj2KWsQcnVNeRNJmQ07SnVmEo5I",
  authDomain: "nextgen-efootball-season-2.firebaseapp.com",
  projectId: "nextgen-efootball-season-2",
  storageBucket: "nextgen-efootball-season-2.appspot.com",
  messagingSenderId: "458165903579",
  appId: "1:458165903579:web:790283fccb7afaca8decfe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);