import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

firebase.initializeApp({
  //firebase config info
});

export const db = firebase.firestore();
