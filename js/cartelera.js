
import {
    getMovies,
  } from "./js_general.js"

window.addEventListener ('DOMContentLoaded', async (event)  => {
    const moviesList = await getMovies();

    console.log(moviesList.size);

    moviesList.forEach((doc) => {
        console.log(doc);
        let movie = doc.data();
        getCuadro(movie);

    });
});

function getCuadro(movie){
    let marcoCuadros = document.getElementById("marcoCartelera");

    marcoCuadros.innerHTML += `<div class="cuadro"> 
                                <div class="imgPeli">
                                    <img src="${movie.imgurl}">
                                </div> 
                                <div class="contentPeli">
                                <h2>${movie.title}</h2>
                                ${movie.description}
                                </div>
                                <div class="botonydiv"> 
                                    <div class="space"> </div>
                                    <a href="Reserva.html"> 
                                    <button class="botonreserva"> 
                                        <span class="textobtn">Reservar</span>
                                        <span class="iconitobtn"> 
                                            <ion-icon name="chevron-forward-outline">
                                            </ion-icon> 
                                        </span> 
                                    </button>
                                    </a> 
                                </div>`
}

