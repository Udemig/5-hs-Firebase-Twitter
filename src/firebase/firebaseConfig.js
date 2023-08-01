// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOa2j2NsLnZyL_Miuy9k5gPVK7naIwDUo',
  authDomain: 'twitter-clone-5hs.firebaseapp.com',
  projectId: 'twitter-clone-5hs',
  storageBucket: 'twitter-clone-5hs.appspot.com',
  messagingSenderId: '48882947297',
  appId: '1:48882947297:web:0590a0a44b62f9d7afd3a0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// yetkilendirme kurulum
export const auth = getAuth(app);

// google girişi kurulum
export const provider = new GoogleAuthProvider();

// veritabanı (firestore) kurulumu
export const db = getFirestore(app);

// strogae (dosyalar için veritabanı) kurulumu
export const storage = getStorage(app);
