// import { jsPDF } from "jspdf";

const asientos = document.querySelectorAll('.fila .asiento:not(.reservado');
const mapa = document.querySelector('.mapa');


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
  const asientosSeleccionados = document.querySelectorAll('.fila .asiento.seleccionado');

  console.log(asientosSeleccionados);
}

