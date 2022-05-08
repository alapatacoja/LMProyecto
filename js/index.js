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

