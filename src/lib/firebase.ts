// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "classroom-central-mf3rx",
  "appId": "1:214324484841:web:ccdb5d7ea48ad82b442e78",
  "storageBucket": "classroom-central-mf3rx.firebasestorage.app",
  "apiKey": "AIzaSyBHMYzr7tkvoB74hsS8BH7Nq6jwmxkfsG4",
  "authDomain": "classroom-central-mf3rx.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "214324484841"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export { app, auth };
