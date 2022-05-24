import { addReserva, getReserva } from "./js_general.js";
// import { jsPDF } from "jspdf";

var asientosSeleccionados = [];
const asientos = document.querySelectorAll('.fila .asiento:not(.reservado');
const mapa = document.querySelector('.mapa');

const botonConfirmar = document.getElementById('botonConfirmar');


window.addEventListener ('DOMContentLoaded', async (event)  => {
  const bookings = await getReserva("Peli1","hoy","ahora");

  bookings.forEach((doc) => {
      let booking = doc.data();
      let asientos = booking.asientos;
      asientos.forEach((asiento) => {
        let letra = asiento.letra;
        let numero = asiento.num;
        let divAsiento = document.getElementsByClassName(letra+' '+numero).item(0);
        divAsiento.classList.toggle('reservado');
      });

  });
});

botonConfirmar.addEventListener('click', (confirmar) => {
  if (asientos.length > 0){
    addReserva("Peli1","hoy","ahora",asientosSeleccionados);
  }

});

mapa.addEventListener('click', (e) => {
  if (e.target.classList.contains('asiento') && !e.target.classList.contains('reservado')) {
    e.target.classList.toggle('seleccionado');

    updateSelectedCount();
  }
});

// function generarPDF(){
//   /* variables input */
//  // var titulo = ????;
//   var inombre = document.getElementById('inombre').value;
//   var iapellidos = document.getElementById('iapellidos').value;
//   var iemail = document.getElementById('iemail').value;
//
//   var doc = new jsPDF();
//
//   doc.setFontSize(18);
//   doc.text('nombre: '+inombre, 10, 20);
//   doc.text('apellidos: '+iapellidos, 10, 20);
//   doc.text('email: '+iemail, 10, 20);
//
// }

function updateSelectedCount(){
  const arrayAsientosSeleccionados = document.querySelectorAll('.fila .asiento.seleccionado');

  asientosSeleccionados = [];

  arrayAsientosSeleccionados.forEach((doc) => {
      const classList = doc.classList;
      let letra = classList.item(1);
      let numero = classList.item(2);
      let asiento = {
        letra: letra,
        num: numero
      };
      asientosSeleccionados.unshift(asiento);
  });

  console.log(asientosSeleccionados);
}

