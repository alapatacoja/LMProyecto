let logo = document.getElementById("logo");

function hover(logo) {
    logo.style.transition = "2s";
    logo.setAttribute('src', "/imgs/EMOCINES.png");

}

function unhover(logo) {
    logo.style.transition = "2s";
    logo.setAttribute('src', "/imgs/ELMOCINES.png");

}