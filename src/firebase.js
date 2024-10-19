import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAjMawqmDB_8SziMAzxRJ6rShwAitw108s',
  authDomain: 'auth-867d7.firebaseapp.com',
  projectId: 'auth-867d7',
  storageBucket: 'auth-867d7.appspot.com',
  messagingSenderId: '880148750664',
  appId: '1:880148750664:web:4bc64bade2276d4678d37d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);