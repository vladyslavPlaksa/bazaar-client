/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  // signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const colRefAnnouncement = collection(db, "saleAnnouncements");
export const colRefUserInfo = collection(db, "userInfo");

export const auth = getAuth();
export const storage = getStorage();

auth.useDeviceLanguage();

const providerGoodle = new GoogleAuthProvider();
providerGoodle.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithRedirect(auth, providerGoodle);

const providerFacebook = new FacebookAuthProvider();
providerFacebook.setCustomParameters({ display: "redirect" });
export const signInWithFacebook = () => signInWithRedirect(auth, providerFacebook);
