
import {
    getMovies,
  } from "./js_general.js"

window.addEventListener ('DOMContentLoaded', async (event)  => {
    const moviesList = await getMovies();

    console.log(moviesList.size);

    moviesList.forEach((doc) => {
        console.log(doc);
        let movie = doc.data();
        

    });
});


