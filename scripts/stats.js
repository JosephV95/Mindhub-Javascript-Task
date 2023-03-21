const tabla1 = document.getElementById("tabla1");

let eventosPasados = [];
let eventosFuturos = [];

let eventosTabla1 = {
  evMayorAsistencia: { nombre: "", porcentaje: 0 },
  evMenorAsistencia: { nombre: "", porcentaje: 0 },
  evMayorCapacidad: { nombre: "", capacidad: 0 },
};

function traerDatosApi() {
  // fetch('scripts/amazing_1.json')
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((datosApi) => {
      filtrarEventosFuturos(datosApi);
      filtrarEventosPasados(datosApi);

      eventoPasPorAsis();
      eventoPasMayorCap();
      cargarTabla1();
      // console.log(eventosTabla1);
      cargarTablas(resultadosDeTabla(eventosFuturos), "tabla2")
      cargarTablas(resultadosDeTabla(eventosPasados), "tabla3")
      
    })
    .catch((error) => console.log(error.messagge));
}

traerDatosApi();

function filtrarEventosPasados(unArray) {
  eventosPasados = unArray.events.filter(
    (event) => new Date(event.date) < new Date(unArray.currentDate)
  );
  // console.log(eventosPasados);
}
function filtrarEventosFuturos(unArray) {
  eventosFuturos = unArray.events.filter(
    (event) => new Date(event.date) >= new Date(unArray.currentDate)
  );
}

//!   calculos para la tabla 1 (se aplica a eventos Pasados)
function eventoPasPorAsis() {
  // let eventoMax = [];
  let numMax = 0;
  let numMin = 100;

  eventosPasados.forEach((ev) => {
    if (calcularPorcentaje(ev.capacity, ev.assistance) > numMax) {
      numMax = calcularPorcentaje(ev.capacity, ev.assistance).toFixed(2);
      // eventoMax = ev
      eventosTabla1.evMayorAsistencia.nombre = ev.name;
      eventosTabla1.evMayorAsistencia.porcentaje = numMax;
    } else if (calcularPorcentaje(ev.capacity, ev.assistance) <= numMin) {
      numMin = calcularPorcentaje(ev.capacity, ev.assistance).toFixed(2);
      eventosTabla1.evMenorAsistencia.nombre = ev.name;
      eventosTabla1.evMenorAsistencia.porcentaje = numMin;
      eventoMin = ev;
    }
  });
  // console.log(numMax);
  // console.log(eventoMax);
}

function eventoPasMayorCap() {
  let numCapacidad = 0;
  eventosPasados.forEach((evento) => {
    if (evento.capacity > numCapacidad) {
      numCapacidad = evento.capacity;
      eventosTabla1.evMayorCapacidad.nombre = evento.name;
      eventosTabla1.evMayorCapacidad.capacidad = evento.capacity;
    }
  });
}
function calcularPorcentaje(numCapacidad, numAsistencia) {
  let total = (numAsistencia * 100) / numCapacidad;
  return total;
}

function cargarTabla1() {
  tabla1.innerHTML = ` 
  <td class="table-info"><b>${eventosTabla1.evMayorAsistencia.nombre} (${eventosTabla1.evMayorAsistencia.porcentaje}%) </b></td>
  <td class="table-info"><b>${eventosTabla1.evMenorAsistencia.nombre} (${eventosTabla1.evMenorAsistencia.porcentaje}%) </b></td>
  <td class="table-info"><b>${eventosTabla1.evMayorCapacidad.nombre} (${eventosTabla1.evMayorCapacidad.capacidad}) </b></td> `;
}

//! tablas 2 y 3
function resultadosDeTabla(unArray) {
  //? con Array.from() se le da formato de array, ya que new Set() no lo devuelve como array (new Set hace que no haya elementos repetidos en un array)
  let categorias = Array.from(new Set(unArray.map((e) => e.category)));
  // console.log(categorias);
  let evPorCategorias = categorias.sort().map((cate) => unArray.filter((evento) => evento.category == cate));
  // console.log(evPorCategorias);
  //todo  Se creara un array que contendra cada categoria como un objeto con sus datos {categoria, ganancias, porcentAsis} 
  let eventosCalculados = evPorCategorias.map((evCateg) => {
    let calculos = evCateg.reduce((acum, evento) => {
        acum.categoria = evento.category;
        acum.ganancias += evento.price * (evento.assistance || evento.estimate); //! con el or ("||") hago que la funcion sea generica y se pueda usar para Eventos Futuros o Pasados
        acum.porcentAsis += ((evento.assistance || evento.estimate) * 100) / evento.capacity;
        return acum
        // despues de la coma asigno Valores Iniciales al evCalculados ,{...}
      } ,{
        categoria: "",
        ganancias: 0,
        porcentAsis: 0,
      }
    );
    //?  se debe dividir el porcentaceDeAsistencia(porcentAsis) por el total de eventos de cada Categoria(evCat.length) para tener el Porcentaje Correcto por Categoria
    calculos.porcentAsis = calculos.porcentAsis / evCateg.length
    // console.log(calculos);
    return calculos
  });

  // console.log(eventosCalculados);
  return eventosCalculados;
}

function cargarTablas (array, contenedor){
  const contenedorTabla = document.getElementById(contenedor);

  let htmlDeTabla = array.map((evento) => {
    return `
      <tr>
        <td class="table-info"><b>${evento.categoria} </b></td>
        <td class="table-info text-primary-emphasis"><b>$${evento.ganancias} </b></td>
        <td class="table-info text-secondary"><b>${evento.porcentAsis.toFixed(2)}% </b></td>
      </tr>  `
  })

  // console.log(htmlDeTabla);
  contenedorTabla.innerHTML = htmlDeTabla.join("");
}

