let header = document.getElementById("header");
let logo = document.getElementById("logo");
let inicio = document.getElementById(".item");

 window.addEventListener('scroll', ()=>{
     let scroll = window.scrollY;
     if (scroll>10)
         header.style.background='#292929'
     else
         header.style.background = 'transparent'
 })

 function hover(logo) {
     logo.style.transition = "visibility 2s";
     logo.setAttribute('src', "/imgs/EMOCINES.png");

 }

 function unhover(logo) {
     logo.style.transition = "visibility 2s";
     logo.setAttribute('src', "/imgs/ELMOCINES.png");

 }

 function itemhover(inicio){
     inicio.style.color = '#f0a935';
 }

 function itemunhover(inicio){
    inicio.style.color = 'white';
 }