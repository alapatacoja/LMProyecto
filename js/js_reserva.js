const asientos = document.querySelectorAll('.fila .asiento:not(.reservado');
const mapa = document.querySelector('.mapa');


mapa.addEventListener('click', (e) => {
  if (e.target.classList.contains('asiento') && !e.target.classList.contains('reservado')) {
    e.target.classList.toggle('seleccionado');

    updateSelectedCount();
  }
});

