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

  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';;

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

  export const getMovies = async () =>{
    const moviesRef = collection(db,"boardMovies");

    const q1 = query(moviesRef);

    const querySnapshot = await getDocs(q1);

    return querySnapshot;
  }


export const register = async (email, password) =>{
    const role = "client";
    const usersRef = collection(db,"users");

    const q1 = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q1);

    if(querySnapshot.size == 0) {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addDoc(collection(db,"users"), {email, password, role});
        window.location.replace("Cartelera.html");
        // ...
    })
    }

    else{
        console.log("Este usuario ya existe");
    }
}

export const login = async (email,password) => {
    const citiesRef = collection(db,"users");

    const q1 = query(citiesRef, where("email", "==", email), where("password", "==", password));

    const querySnapshot = await getDocs(q1);
    

    querySnapshot.forEach((doc) => {
        user = doc.data();
        console.log(user);
        const li = document.getElementById("logger");
        li.innerHTML = user.userName;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.replace("Cartelera.html");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    });

}

