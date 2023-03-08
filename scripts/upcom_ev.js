//? Capturo el nodo del DOM(en html) a donde se le asignaran las cards
const containerUp = document.getElementById("contenedorUp");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");
const checkboxes = document.querySelectorAll("input[type=checkbox]");

//! fecha a ser comparada con las demas
const fechaBase = new Date(data.currentDate);

//! Usando Funciones de Orden Superior en arrays
let cardsFuturas = data.events.filter( (event) => new Date(event.date) >= fechaBase);

let cardsParaCargar = "";

function cargarCards(unArray) {
  //? Debo settear la variable como vacia para que los filtros carguen las cards y que no las dupliquen al filtrar
  cardsParaCargar = "";

  unArray.forEach((event) => {
    cardsParaCargar += ` 
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
            <div class="card" id="card" style="max-width: 20rem; height: 27rem; ">
                <img src="${event.image}" class="card-img-top" alt="imgEvento${event._id}">
                <div class="card-body  text-center">
                    <h4 class="card-title">${event.name}</h4>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text"><b>Date:</b> ${event.date} <b>Price:</b> $${event.price}</p>
                    <a href="details.html?id=${event._id}" class="btn btn-primary"  style="position: absolute; bottom:1rem; margin-left: -2rem;">Details</a>
                </div>
            </div>
        </div> `;
  });
  //?  Le asignamos el valor al template(html)
  containerUp.innerHTML = cardsParaCargar;
}

cargarCards(cardsFuturas);

//? Filtro por Search
let inputData = "";

inputSearch.addEventListener("change", (event)=> {
    inputData = event.target.value;
    let filtroSearch = cardsFuturas.filter((ev)=> ev.name.toLowerCase().includes(inputData.toLowerCase()));
    cargarCards(filtroSearch);
})
formSearch.addEventListener("submit", (event) =>{
    event.preventDefault();
    // console.log(event);
})

//? Filtro por Categorias (checkbox)
let checkboxData = [];

for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", (event) =>{
        if (event.target.checked) {
            checkboxData.push(event.target.value);
        } else {
            //todo    Con el filter elimino del array los value que no estan cheked (es decir filtro solo los value cheked)
            checkboxData = checkboxData.filter((ev) => ev != event.target.value);
        }
        // console.log(checkboxData);
        //!  Creo una variable que filtre las cards de cardsFuturas cuya categoria este incluida en el array checkboxData
        let cardsCheck = cardsFuturas.filter((e) => checkboxData.includes(e.category));

        if (checkboxData.length != 0) {
            cargarCards(cardsCheck);
        } else {
            cargarCards(cardsFuturas);
        }
    })
}


