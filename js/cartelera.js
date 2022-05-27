
import {
    getMovies,
    getMovie
  } from "./js_general.js"
  

var peliculas = document.querySelectorAll(".cuadro");
var botones = document.querySelectorAll(".botonreserva");

window.addEventListener ('DOMContentLoaded', async (event)  => {

    const moviesList = await getMovies();


    moviesList.forEach((doc) => {
        console.log(doc);
        let movie = doc.data();
        getCuadro(movie);

    });

    peliculas = document.querySelectorAll(".cuadro");
    botones = document.querySelectorAll(".botonreserva");

    botones.forEach((button) =>{
        button.addEventListener('click', async (e) => {
            let path = e.composedPath();
            let titulo = path[3].getElementsByClassName('title').item(0).textContent;
            const movie = await getMovie(titulo);
            console.log(movie);
            window.location.href = "Reserva.html";


        })
    });
});

function getCuadro(movie){
    let marcoCuadros = document.getElementById("marcoCartelera");

    marcoCuadros.innerHTML += `<div class="cuadro"> 
                                <div class="imgPeli">
                                    <img src="${movie.imgurl}">
                                </div> 
                                <div class="contentPeli">
                                <h2 class='title'>${movie.title}</h2>
                                ${movie.description}
                                </div>
                                <div class="botonydiv"> 
                                    <div class="space"> </div>
                                    
                                    <button class="botonreserva"> 
                                        <span class="textobtn">Reservar</span>
                                        <span class="iconitobtn"> 
                                            <ion-icon name="chevron-forward-outline">
                                            </ion-icon> 
                                        </span> 
                                    </button>
                                    
                                </div>`

                                //<a href="Reserva.html"> 
                                //</a>
}



