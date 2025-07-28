
// Script para malla interactiva con materias y optativas

const materias = document.querySelectorAll('.materia'); 
const btnReiniciar = document.querySelector('.btn-reiniciar'); 
const optativaOpciones = document.querySelectorAll('.optativa-opcion');

// Guarda el progreso actual de materias y optativas 
function guardarProgreso() { 
const estadoMaterias = Array.from(materias).map(m => m.classList.contains('cursada')); 
localStorage.setItem('progresoMaterias', JSON.stringify(estadoMaterias));

const seleccionada = document.querySelector('.optativa-opcion.selected'); 
if (seleccionada) { 
  localStorage.setItem('optativaSeleccionada', seleccionada.dataset.opt); } }

// Carga el progreso guardado del navegador 
function cargarProgreso() { 
  const estadoMaterias = JSON.parse(localStorage.getItem('progresoMaterias')); 
  if (estadoMaterias) { 
    materias.forEach((m, i) => { 
      if (estadoMaterias[i]) m.classList.add('cursada'); }); 
    }
const seleccionada = localStorage.getItem('optativaSeleccionada'); 
if (seleccionada) { 
  const seleccion = document.querySelector(`.optativa-opcion[data-opt="${seleccionada}"]`); 
  if (seleccion) { 
    seleccion.classList.add('selected'); 
    const submaterias = seleccion.querySelector('.submaterias'); 
    if (submaterias) submaterias.style.display = 'block'; 
    bloquearOtrasOptativas(seleccionada); 
     } 
    } 
  }

// Desactiva otras optativas distintas a la elegida 
function bloquearOtrasOptativas(permitida) { 
  optativaOpciones.forEach(opt => { 
    if (opt.dataset.opt !== permitida) { 
      opt.classList.add('disabled'); 
    } 
  }); 
}

// Elimina el progreso guardado y limpia la selección
function reiniciarProgreso() { 
  localStorage.removeItem('progresoMaterias'); 
  localStorage.removeItem('optativaSeleccionada'); 
  materias.forEach(m => m.classList.remove('cursada')); 
  optativaOpciones.forEach(opt => { 
    opt.classList.remove('selected', 'disabled'); 
    const submaterias = opt.querySelector('.submaterias'); 
    if (submaterias) submaterias.style.display = 'none'; 
  });
 }

// Eventos para marcar materias como cursadas 
materias.forEach(m => { 
  m.addEventListener('click', () => { 
    m.classList.toggle('cursada'); 
    guardarProgreso(); 
  }); 
});

// Eventos para seleccionar una sola optativa 
optativaOpciones.forEach(opt => { 
  const titulo = opt.querySelector('.optativa-titulo'); 
  if (titulo) { 
    titulo.addEventListener('click', () => { 
      if (opt.classList.contains('disabled') || opt.classList.contains('selected')) return; 
      opt.classList.add('selected'); 
      const submaterias = opt.querySelector('.submaterias'); 
      if (submaterias) submaterias.style.display = 'block'; 
      bloquearOtrasOptativas(opt.dataset.opt); 
      guardarProgreso(); 
    }); 
   } 
  });

// Carga el progreso al iniciar la página 
window.addEventListener('load', cargarProgreso);

// Evento para el botón de reiniciar 
if (btnReiniciar) { 
  btnReiniciar.addEventListener('click', reiniciarProgreso); 
}