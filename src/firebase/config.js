import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB78mHklLc5tE9m9Y0GkmwVAZedeOJTtFQ",
  authDomain: "botbiproyecto.firebaseapp.com",
  projectId: "botbiproyecto",
  storageBucket: "botbiproyecto.appspot.com",
  messagingSenderId: "355204536012",
  appId: "1:355204536012:web:d7cfbc552950dd8f01d469"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };