import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDcHMYZAAMjSXsJv_O0Tc6kUfB1CtR3Rfk',
  authDomain: 'api-firebase-6b9e5.firebaseapp.com',
  databaseURL: 'https://api-firebase-6b9e5-default-rtdb.firebaseio.com/',
  projectId: 'api-firebase-6b9e5',
  storageBucket: 'api-firebase-6b9e5.appspot.com',
  messagingSenderId: '740933569699',
  appId: '1:740933569699:web:b3a786a81b9a7cbeae0316',
  measurementId: 'G-FMXKYGNYF0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
