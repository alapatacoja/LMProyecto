let header = document.getElementById("header");

window.addEventListener('scroll', ()=>{
    let scroll = window.scrollY;
    if (scroll>10)
        header.style.background='#292929'
    else
        header.style.background = 'transparent'
})