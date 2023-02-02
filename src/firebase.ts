import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

firebase.initializeApp({});

export const db = firebase.firestore();
