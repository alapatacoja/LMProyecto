import {
    getUser,
    getReservasFromUser,
    logout
} from "./js_general.js";

var buttonLista = document.getElementById('listaReservas');
var reservaslista = document.getElementById('reservas');

window.addEventListener ('DOMContentLoaded', async (event) => {
    
    /*
    let str = `<ul>`;
    reservas.forEach((reserva) => {
        let nombre = reserva.titulo;
        let dia = reserva.dia;
        str += `<li>Título: ${nombre}</li>
        <li>Día: ${dia}</li>`;
        let asientos = reserva.asientos;
        asientos.forEach((asiento) => {
            let num = asiento.num;
            let letra = asiento.letra;
            str += `<li>FILA: ${num} COLUMNA: ${letra}</li>`;
        });
      });
      str += `</ul>`
      */
});
buttonLista.addEventListener ('click', async(e) =>{
    let user = await getUser();
    let reservas = await getReservasFromUser(user);

    let str = '';
    reservas.forEach((doc) => {
        let reserva = doc.data();
        let nombre = reserva.titulo;
        let dia = reserva.dia;
        str += `<li>Título: ${nombre}</li>
        <li>Día: ${dia}</li>`;
        let asientos = reserva.asientos;
        asientos.forEach((asiento) => {
            let num = asiento.num;
            let letra = asiento.letra;
            str += `<li>FILA: ${num} COLUMNA: ${letra}</li>`;
        });
        str += '------------------------------------------------------------';
        });
        str += `</ul>`
    reservaslista.innerHTML = str;

});

