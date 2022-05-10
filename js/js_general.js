  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    query,
    where,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCBXTTknGr0bzDOwMZpjawbyDlxNrj7tig",
    authDomain: "proyecto-final-lm.firebaseapp.com",
    projectId: "proyecto-final-lm",
    storageBucket: "proyecto-final-lm.appspot.com",
    messagingSenderId: "805432992319",
    appId: "1:805432992319:web:4f69bb31378dfae6e60e8a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore();

  var user = null;

  let header = document.getElementById("header");


let logo = document.getElementById("logo");

window.addEventListener('scroll', ()=>{
    let scroll = window.scrollY;
    if (scroll>10)
        header.style.background='#292929'
    else
        header.style.background = 'transparent'
})

function hover(logo) {
    logo.style.transitionDuration = "0.5s";
    logo.setAttribute('src', "/imgs/EMOCINES.png");

}

function unhover(logo) {
    logo.style.transitionDuration = "0.5s";
    logo.setAttribute('src', "/imgs/ELMOCINES.png");

}

export const register = (userName, password) =>{
    console.log(db);
    addDoc(collection(db,"users"), { userName, password});
}

export const login = async (userName,password) => {
    const citiesRef = collection(db,"users");

    const q1 = query(citiesRef, where("userName", "==", userName), where("password", "==", password));

    const querySnapshot = await getDocs(q1);
    

    querySnapshot.forEach((doc) => {
        user = doc.data();
        console.log(user);
        const li = document.getElementById("logger");
        li.innerHTML = user.userName;
        sessionStorage.setItem('userName',user.userName);
    });

}

