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

  var reservedMovie = null;

  export const getMovies = async () =>{
    const moviesRef = collection(db,"boardMovies");

    const q1 = query(moviesRef);

    const querySnapshot = await getDocs(q1);

    return querySnapshot;
  }

  export const getMovie = async (titulo) =>{
    const moviesRef = collection(db,"boardMovies");

    const q1 = query(moviesRef, where("title", "==", titulo));

    const querySnapshot = await getDocs(q1);

    let movieData = null;
    if(querySnapshot.size == 1){
        querySnapshot.forEach((movie) =>{
            movieData = movie.data();
        });
    }

    reservedMovie = movieData;

    sessionStorage.setItem('movieTitle',movieData.title);
    sessionStorage.setItem('movieDescription',movieData.description);
    sessionStorage.setItem('movieImg',movieData.imgurl);

    return reservedMovie;
  }

  export const getReservedMovie = () => {
      return reservedMovie;
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
        sessionStorage.setItem('role',role);
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
        sessionStorage.setItem('role',user.role);
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

export const getUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}

export const getReserva = async (titulo,dia,hora) => {
  const ticketsRef = collection(db,"tickets");

    const q1 = query(ticketsRef, where("titulo", "==", titulo), 
        where("dia", "==", dia), where("hora", "==", hora));

    const querySnapshot = await getDocs(q1);

    return querySnapshot;
}


export const addReserva = async (titulo,dia,hora,asientos) => {

    //const q1 = query(ticketsRef, where("titulo", "==", titulo), 
    //    where("dia", "==", dia), where("hora", "==", hora));

    //const querySnapshot = await getDocs(q1);


    addDoc(collection(db,"tickets"), {titulo, dia, hora, asientos}).then(function() {
        sessionStorage.removeItem('movieTitle');
        sessionStorage.removeItem('movieDescription');
        sessionStorage.removeItem('movieImg');

        window.location.href = "Index.html";
    });

    console.log('a');
    
}

