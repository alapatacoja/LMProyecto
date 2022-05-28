import { getUser, logout } from "./js_general.js";

let header = document.getElementById("header");


var logger = document.getElementById('logger');

logger.addEventListener('click', async (e) =>{
    let user = await getUser();
    if(user != null){
        await logout();
        window.location.href ='Index.html' ;
    }
    else{
        
        window.location.href = "Login.html";
    }
});


 window.addEventListener('scroll', ()=>{
     let scroll = window.scrollY;
     if (scroll>10)
         header.style.background='#292929'
     else
         header.style.background = 'transparent'
 })



