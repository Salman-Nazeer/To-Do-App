import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  ref,
  set,
  getDatabase,
  push,
  onValue,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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

var a = document.getElementById("main");
var b = document.getElementById("inp");
var c = document.getElementById("create-btn");
var d = document.getElementById("del-all");

var reference = ref(database, "Tasks/");
onValue(reference, function (data) {
  console.log(data.val());
  var task = data.val();
  var list = Object.values(task);


  for (var i = 0; i < list.length; i++) {
    var row = document.createElement("ul");
    // console.log(row)
    var input = document.createElement("li");
    input.setAttribute("class", "p1");
    input.innerHTML = `${list[i].value}`;
    var edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.setAttribute("class", "btn");
    edit.setAttribute("onclick", "handleEdit(this)");

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("onclick", "handleDelete(this)");
    deleteBtn.setAttribute("class", "btn");
    deleteBtn.setAttribute("id", list[i].id);



    a.appendChild(row);
    row.append(input);
    row.appendChild(edit);
    row.appendChild(deleteBtn);
  }

  window.handleEdit = function () {
    var x = prompt("Edit Your Node!");
    console.log(x);
    list[i] = x;
  };

  window.handleDelete = function (a) {
    console.log(a.id);
    ref(database, "Tasks/");

    a.parentElement.remove();
  };

  window.handleValues = function () {
    input.disabled = true;
    // task.disabled = true
  };
  handleValues();
});

window.handleInp = function (val) {
  c.disabled = false;

  if (b.value == "") {
    c.disabled = true;
  }

  const inputElement = document.getElementById("inp");

  inputElement.addEventListener("input", function () {
    const inputValue = this.value;

    // Check if the input consists only of spaces
    if (/^\s+$/.test(inputValue)) {
      // Set the cursor position to the beginning
      this.setSelectionRange(0, 0);
    }
  });
};

window.createElem = function (val) {
  var cap = b.value.split(" ");
  for (var i = 0; i < cap.length; i++) {
    cap[i] = cap[i].slice(0, 1).toUpperCase() + cap[i].slice(1).toLowerCase();
  }
  cap = cap.join(" ");
  // console.log(cap)

  //    var capotalInp = capitalize()
  var inputstr = b.value;
  inputstr = cap.replace(/\s+/g, " ").trim();

  var todoData = {
    id: push(ref(database, "Tasks/")).key,
    value: (b.value = inputstr),
  };

  set(ref(database, `Tasks/${todoData.id}`), todoData);
};

window.deleteAll = function () {
  a.innerHTML = "";
  d.disabled = true;
};
