"use client";

import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  googleProvider
} from "../lib/firebase";

export default function Login() {

  const login = async () => {

    try {

      await signInWithPopup(
        auth,
        googleProvider
      );

      alert("Login Successful");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <button
      onClick={login}
      className="btn-primary"
    >
      LOGIN WITH GOOGLE
    </button>

  );
}