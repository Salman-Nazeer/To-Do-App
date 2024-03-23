// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  ref,
  set,
  getDatabase,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArUeXpY_Yq_LkX4LioidUrRrbAsdm-46w",
  authDomain: "form-d333f.firebaseapp.com",
  databaseURL: "https://form-d333f-default-rtdb.firebaseio.com",
  projectId: "form-d333f",
  storageBucket: "form-d333f.appspot.com",
  messagingSenderId: "885709494283",
  appId: "1:885709494283:web:f8daf4b2b495135fd1cf0e",
  measurementId: "G-J2MRNRZ8BZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

let model = {};

var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.singnup = function (e) {
  e.preventDefault();
  model.email = email.value;
  model.password = password.value;
  model.username = username.value;
    // console.log(model);
  
  
  createUserWithEmailAndPassword(auth, model.email, model.password)
    .then(function (res) {
      console.log(res.user.uid, "Success Response");
      model.id = res.user.uid;
      var refernce = ref(database, `users/${model.id}`);
      set(refernce, model)
        .then(function (dbRes) {
          alert("User Created Succesfully");
          window.location = "../todo/index.html";
        })
        .catch(function (dbErr) {
          alert(dbErr.message);
        });

      email.value = "";
      username.value = "";
      password.value = "";
    })
    .catch(function (err) {
      console.log(err, "Error Response");
      alert(err.message);
    });
};


// function createToDoListLink() {
  //   var a = document.createElement('a');
  //   a.href = "../To-Do-List/list.html";
  //   return a;
  // };