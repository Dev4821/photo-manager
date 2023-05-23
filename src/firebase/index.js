import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDQgbL-PXsLZzB_n-JT_M0FLBQ53ckMiDk",
  authDomain: "photo-manager-portal.firebaseapp.com",
  projectId: "photo-manager-portal",
  storageBucket: "photo-manager-portal.appspot.com",
  messagingSenderId: "103076882881",
  appId: "1:103076882881:web:ea7432c83656a561bb6740",
  measurementId: "G-7VFP4QPW3P"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
