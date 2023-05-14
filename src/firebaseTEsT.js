
import { initializeApp } from "firebase/app";
// import { getStorage } from 'firebase/storage'


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7liRZGlQBUscgHD2Rxlon4CNKW7jMtwo",
  authDomain: "first-project-54119.firebaseapp.com",
  projectId: "first-project-54119",
  storageBucket: "first-project-54119.appspot.com",
  messagingSenderId: "1050003457449",
  appId: "1:1050003457449:web:57ec94e4ee9185aa0ef0b8",
};

// Запуск Firebase
const app = initializeApp(firebaseConfig);
// Хмарне сховище
// const storage =getStorage(app)

  // Створення нового користувача
  export const createUser = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  };
 // вхід в систему
export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};




