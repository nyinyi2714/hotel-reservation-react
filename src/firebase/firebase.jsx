import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDko6pXkMEKzGT_82A9B8hzqu4rEVUBlpg",
  authDomain: "hotel-reservation-ed789.firebaseapp.com",
  databaseURL: "https://hotel-reservation-ed789-default-rtdb.firebaseio.com",
  projectId: "hotel-reservation-ed789",
  storageBucket: "hotel-reservation-ed789.appspot.com",
  messagingSenderId: "99106536149",
  appId: "1:99106536149:web:64719d70cb914f18bb005c",
  measurementId: "G-4K3HJ02HDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get authentication and database instances
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;