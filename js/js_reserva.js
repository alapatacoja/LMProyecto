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
var imagen = document.getElementById('imagenreservas');
var titulo = document.getElementById('tituloreservas');

const precioBase = 7.20;
var precioActual;
var precioH2;

const botonConfirmar = document.getElementById('botonConfirmar');


window.addEventListener ('DOMContentLoaded', async (event)  => {

  today = new Date();
  let nowdate = getStrDate(today);
    let marcoFecha = document.getElementById('marcoFecha');
    
  marcoFecha.innerHTML += `
        <label for="resDate">Fecha de la Reserva:</label>
        <input type="date" id="resDate" min="${nowdate}">
        <p></p>
        <label for="precioTotal">Precio:</label>
        <h2 id="precioTotal"></h2>
    `

  let reservedDateDocument = document.getElementById('resDate');
  precioH2 = document.getElementById('precioTotal');
  reservedDate = today;
  reservedDateDocument.value = nowdate;

  reservedDateDocument.addEventListener('change', async (selectedDate) => {
    reservedDate = getDate(selectedDate.target.value);
    if(reservedDate < today){
      alert('fecha no valida');
      console.log(reservedDateDocument);
      reservedDateDocument.value = nowdate;
      reservedDate = today;
    }
    else{
      let aux = document.getElementsByClassName('reservado');
      while (aux.length > 0){
        aux[0].classList.remove("reservado");
      }
      asientosOcupados = new Set();
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
      
    }

  });

  let reservedMovie = sessionStorage.getItem('movieTitle');
  const bookings = await getReserva(reservedMovie,getStrDate(reservedDate),"ahora");

  titulo.innerHTML = reservedMovie;
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
let imgMovie = sessionStorage.getItem('movieImg');
botonConfirmar.addEventListener('click', async (confirmar) => {
  let reservedMovie = sessionStorage.getItem('movieTitle');
  const element = document.getElementById("pdf");

  if (asientos.length > 0){
    let user = await getUser();
    if (user !== null) {
      await addReserva(reservedMovie,getStrDate(reservedDate),"ahora",asientosSeleccionados,user.email,precioActual,imgMovie);
      html2pdf()
          .from(element)
          .save();
    }

  }

});
imagen.src = imgMovie;

mapa.addEventListener('click', (e) => {
  if (e.target.classList.contains('asiento') && !e.target.classList.contains('reservado')) {
    e.target.classList.toggle('seleccionado');

    if(asientosSeleccionados.length >= 2 && sessionStorage.getItem('role') == 'empleado'){
      alert('No se permiten más de dos asientos por empleado');
    }
    else{
      updateSelectedCount();
    }
  }
});

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

  let precio = precioBase;
  precioActual = precio * asientosSeleccionados.length;
  let role = sessionStorage.getItem('role');
  if (role == 'client'){
    precioActual = precioActual*0.9;
  }
  else if ( role == 'admin' || role == 'empleado'){
    precioActual = precioActual * 0.75;
  } 
  precioH2.textContent = precioActual;
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


