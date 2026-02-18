import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDlNYbpRb0pt11mWxpjmZuGuAEpB6K7_wc",
  authDomain: "adam-the-cruise-guy.firebaseapp.com",
  projectId: "adam-the-cruise-guy",
  storageBucket: "adam-the-cruise-guy.firebasestorage.app",
  messagingSenderId: "662911634182",
  appId: "1:662911634182:web:de2ba6b180d1466645ac87",
  measurementId: "G-PPY9CX48RW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
