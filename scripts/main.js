//? Capturamos un nodo del DOM (en el HTML).  
const contenedor = document.getElementById("contenedor");
const containerCheck = document.getElementById("containerChecks");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

let tarjetasCargadas = "";

let eventos = [];
let categorias = [];

//! Se cargara las cards desde una API (con asincronismo)
function traerDatosApi(){
    // fetch('scripts/amazing_1.json')
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(datosApi => {
        // console.log(datosApi);
        eventos = datosApi.events;
        // console.log(eventos);
        cargarCards(eventos);
        //? Cargar las categorias de los checkbox
        datosApi.events.forEach( elem => {
            if (!categorias.includes(elem.category)) {
                categorias.push(elem.category)
            }
        })  
        // console.log(categorias);
        cargarChecks(categorias);

        filtrarPorSearch(eventos)
        //* Se llama a la funcion de filtro por categorias para que funcione
        filtrarPorCategorias(eventos);
    })
    .catch(error => console.log(error.messagge))
    // .finally(console.log(eventos))
}

traerDatosApi();

function cargarCards(unArray){
    if (unArray.length == 0) {
        return contenedor.innerHTML = `<p class='display-5'>No se encontraron elementos</p>`
    }
    tarjetasCargadas = "";

    unArray.forEach(event =>  tarjetasCargadas += `
    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
        <div class="card " id="card" style="max-width: 20rem; height: 27rem; ">
            <img src="${event.image}" class="card-img-top" alt="imgEvento${event._id}">
            <div class="card-body text-center" style="position: relative";>
                <h4 class="card-title">${event.name}</h4>
                <p class="card-text">${event.description}</p>
                <p class="card-text"><b>Date:</b> ${event.date} <b>Price:</b> $${event.price}</p>
                <a href="details.html?id=${event._id}" class="btn btn-primary" style="position: absolute; bottom:1rem; margin-left: -2rem;" >Details</a>
            </div>
        </div>
    </div> `);

    contenedor.innerHTML = tarjetasCargadas;
}
function cargarChecks(unArray){
    let checkbox = ""
    unArray.forEach(elem => {
        checkbox += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox${unArray.indexOf(elem)}" value="${elem}">
        <label class="form-check-label" for="inlineCheckbox${unArray.indexOf(elem)}">${elem}</label>
    </div>`
    });
    containerCheck.innerHTML =checkbox;
}

//?  Para filtrar las Cards por el Buscador
function filtrarPorSearch(elArray){
    inputSearch.addEventListener("input", (event) =>{
        let textoInput = event.target.value;
        let filtroSearch = elArray.filter( ev => ev.name.toLowerCase().includes(textoInput.toLowerCase()));
        cargarCards(filtroSearch);
    })
}
//* Se evita que al pulsar enter en el formSearch se recargue la página
formSearch.addEventListener("submit", (event)=> {
    event.preventDefault()
    console.log(event);
})

//? Filtrado por Checkbox
function filtrarPorCategorias(unArray) {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");

  let categoryCheck = [];
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", (event) => {
      if (event.target.checked) {
        categoryCheck.push(event.target.value);
      } else {
        //todo    Con el filter elimino del array los value que no estan cheked (es decir filtro solo los value cheked)
        categoryCheck = categoryCheck.filter((ev) => ev != event.target.value);
      }
      // console.log(categoryCheck);

      let cardsCheck = unArray.filter((event) =>
        categoryCheck.includes(event.category)
      );
      if (categoryCheck.length > 0) {
        cargarCards(cardsCheck);
        //* Con esto los filtros por Categoria y Busqueda funcionan de forma combinada, podra buscar entre las check selecionados
        filtrarPorSearch(cardsCheck);
      } else {
        //? Con esto cargara todas las cards en caso de no haber ningun checkbox marcado
        cargarCards(unArray);
        //* Con esto los filtros por Categoria y Busqueda funcionan de forma combinada. podra buscar entre las check selecionados
        filtrarPorSearch(unArray);
      }
    });
  }
}










