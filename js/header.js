import { getUser } from "./js_general.js";

let header = document.getElementById("header");
let logo = document.getElementById("logo");

var logger = document.getElementById('logger');

logger.addEventListener('click', async (e) =>{
    let user = await getUser();
    if(user !== null){
        window.location.href ='ListaReservas.html' ;
    }
    else{
        window.location.href ='Login.html' ;
    }
});


 window.addEventListener('scroll', ()=>{
     let scroll = window.scrollY;
     if (scroll>10)
         header.style.background='#292929'
     else
         header.style.background = 'transparent'
 })

 function hover(logo) {
     logo.style.transition = "2s";
     logo.setAttribute('src', "/imgs/EMOCINES.png");

 }

 function unhover(logo) {
     logo.style.transition = "2s";
     logo.setAttribute('src', "/imgs/ELMOCINES.png");

 }

