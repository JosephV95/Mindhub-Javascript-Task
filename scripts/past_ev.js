//? Se capturo el nodo del DOM(en html) a donde se le asignaran las cards
const containerPast = document.getElementById("contenedorPast");
const containerCheck = document.getElementById("containerChecks");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

let cardsParaCargar = "";
let eventosPasados = [];
let categorias = [];

function traerDatosApi(){
    // fetch('scripts/amazing_1.json')
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(datosApi => {
        // console.log(datosApi.currentDate)
        filtrarEventosPasados(datosApi);
        // console.log(eventosPasados);
        eventosPasados.forEach( elem => {
            if (!categorias.includes(elem.category)) {
                categorias.push(elem.category)
            }
        })  
        cargarChecks(categorias.sort());
        
        filtrarPorSearch(eventosPasados)
        filtrarPorCategorias(eventosPasados);
    })
    .catch(error => console.log(error.messagge))
}
traerDatosApi();

function filtrarEventosPasados(unArray){
    eventosPasados = unArray.events.filter(
        (event) => new Date(event.date) < new Date(unArray.currentDate)
    );
    // console.log(eventosPasados);
    cargarCards(eventosPasados)
}
function cargarCards(unArray) {
    if (unArray.length == 0) {
        return containerPast.innerHTML = `<p class='display-4 text-center'><b>The word "${inputSearch.value}" was not found.</b></p>`
    }
    //? Debo settear la variable como vacia para que los filtros carguen las cards y que no las dupliquen al filtrar
    cardsParaCargar = "";

    unArray.forEach(event => { 
        cardsParaCargar += ` 
    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
        <div class="card" id="card" style="max-width: 20rem; height: 28rem; ">
            <img src="${event.image}" class="card-img-top" alt="imgEvento${event._id}">
            <div class="card-body  text-center">
                <h4 class="card-title">${event.name}</h4>
                <p class="card-text">${event.description}</p>
                <p class="card-text"><b>Date:</b> ${event.date} <b>Price:</b> $${event.price}</p>
                <a href="details.html?id=${event._id}" class="btn btn-primary"  style="position: absolute; bottom:1rem; margin-left: -2rem;">Details</a>
            </div>
        </div>
    </div> `
    });  
    //?  Le asigno el valor al template(html)
    containerPast.innerHTML = cardsParaCargar;
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

//? Filtro por Search
function filtrarPorSearch(elArray){
    inputSearch.addEventListener("keyup", (event) =>{
        let textoInput = event.target.value;
        let filtroSearch = elArray.filter( ev => ev.name.toLowerCase().includes(textoInput.toLowerCase()));  
        cargarCards(filtroSearch)
    })
}
formSearch.addEventListener("submit", (event)=>{
    event.preventDefault()
    // console.log(event);
})

//? Filtro por Categorias (checkbox)
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
      // console.log(checkboxData);
      //!  Creo una variable que filtre las cards de cardsFuturas cuya categoria este incluida en el array checkboxData
      let cardsCheck = unArray.filter((evn) => categoryCheck.includes(evn.category));

      if (categoryCheck.length > 0) {
        cargarCards(cardsCheck);
        //* Con esto los filtros por Categoria y Busqueda podran funcionar de manera combinada podra buscar entre las check selecionados
        filtrarPorSearch(cardsCheck);
      } else {
        //? Cargara todas las cards en caso de no haber ningun checkbox marcado
        cargarCards(unArray);

        //* Con esto los filtros por Categoria y Busqueda podran funcionar de manera combinada podra buscar entre las check selecionados
        filtrarPorSearch(unArray);
      }
    });
  }
}

