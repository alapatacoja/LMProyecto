import { addReserva, 
  getReserva,
  getUser,
  getReservedMovie } from "./js_general.js";
//import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js";


var asientosSeleccionados = [];
var asientosOcupados = new Set();

var today;
var reservedDate;
const asientos = document.querySelectorAll('.fila .asiento:not(.reservado)');
const mapa = document.querySelector('.mapa');

const botonConfirmar = document.getElementById('botonConfirmar');


window.addEventListener ('DOMContentLoaded', async (event)  => {

  today = new Date();
  let nowdate = getStrDate(today);
    let marcoFecha = document.getElementById('marcoFecha');
    
  marcoFecha.innerHTML += `
        <label for="resDate">Fecha de la Reserva:</label>
        <input type="date" id="resDate" min="${nowdate}">
    `

  let reservedDateDocument = document.getElementById('resDate');
  reservedDate = today;
  reservedDateDocument.value = nowdate;

  reservedDateDocument.addEventListener('change', (selectedDate) => {
    reservedDate = getDate(selectedDate.target.value);
    if(reservedDate < today){
      alert('fecha no valida');
      console.log(reservedDateDocument);
      reservedDateDocument.value = nowdate;
      reservedDate = today;
    }

  });

  let reservedMovie = sessionStorage.getItem('movieTitle');
  const bookings = await getReserva(reservedMovie,getStrDate(reservedDate),"ahora");

  bookings.forEach((doc) => {
      let booking = doc.data();
      let asientos = booking.asientos;
      asientos.forEach((asiento) => {
        let letra = asiento.letra;
        let numero = asiento.num;
        let asient = {
          letra: asiento.letra,
          numero: asiento.num
        };

        addAsientoOcupado(asient);
        
      });

  });

  asientosOcupados.forEach((asiento1) => {
    let divAsiento = document.getElementsByClassName(asiento1.letra+' '+asiento1.numero).item(0);
        divAsiento.classList.toggle('reservado');
  });

  

});

botonConfirmar.addEventListener('click', async (confirmar) => {
  let reservedMovie = sessionStorage.getItem('movieTitle');
  if (asientos.length > 0){
    let user = await getUser();
    if (user !== null) {
      await addReserva(reservedMovie,getStrDate(reservedDate),"ahora",asientosSeleccionados,user.email);
    }
  }

});

mapa.addEventListener('click', (e) => {
  if (e.target.classList.contains('asiento') && !e.target.classList.contains('reservado')) {
    e.target.classList.toggle('seleccionado');

    if(asientosSeleccionados.length >= 2 && sessionStorage.getItem('role') == 'Empleado'){
      alert('No se permiten más de dos asientos por empleado');
    }
    else{
      updateSelectedCount();
    }
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

function addAsientoOcupado(asiento){
  let found = false;
  asientosOcupados.forEach((as) =>{
    if(as.letra == asiento.letra && as.numero == asiento.numero){
      found = true;
    }
  });

  if(found == false){
    asientosOcupados.add(asiento);
  }
}

function getDate(strDate){
  let auxDate = new Date();
  let arrayString = strDate.split('-');
  auxDate.setFullYear(arrayString[0]);
  auxDate.setMonth(arrayString[1]-1);
  auxDate.setDate(arrayString[2]);

  return auxDate;
}

function getStrDate(dateDate){
  let year = dateDate.getFullYear();
  let month = dateDate.getMonth()+1;
  let day = dateDate.getDate();
  if (day <= 9){
    day = 0 +''+ day;
  }
  if (month <= 9){
    month = 0 +''+ month;
  }
  let strdate = year+'-'+month+'-'+day;
  return strdate;
}

