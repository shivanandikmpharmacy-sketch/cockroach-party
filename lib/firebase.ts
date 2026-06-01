import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

import {
  getStorage
} from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyBMfTMH7K5hy8CSh7Pyc2k4qDy7fVmX58E",

  authDomain:
    "cockroach-party-2db41.firebaseapp.com",

  projectId:
    "cockroach-party-2db41",

  storageBucket:
    "cockroach-party-2db41.firebasestorage.app",

  messagingSenderId:
    "218533349692",

  appId:
    "1:218533349692:web:2df125b42b11ca55bf3639",

  measurementId:
    "G-QZ0ZHMN7JT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;