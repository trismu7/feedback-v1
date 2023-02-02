import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

firebase.initializeApp({
  //infoapiKey: "AIzaSyCTLYL11QQipQvZE8j8R_8P7SyE_gtzBXo",
});

export const db = firebase.firestore();
