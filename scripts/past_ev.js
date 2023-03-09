//? Se capturo el nodo del DOM(en html) a donde se le asignaran las cards
const containerPast = document.getElementById("contenedorPast");
const containerCheck = document.getElementById("containerChecks");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

//! fecha a ser comparada con las demas
const fechaBase = new Date(data.currentDate);

//! Usando Funciones de Orden Superior en arrays
let cardsPasadas = data.events.filter(
    (event) => new Date(event.date) < fechaBase
);

let cardsParaCargar = "";

function cargarCards(unArray) {
    //? Debo settear la variable como vacia para que los filtros carguen las cards y que no las dupliquen al filtrar
    cardsParaCargar = "";

    unArray.forEach(event => { 
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
    </div> `
    });
    
    //?  Le asigno el valor al template(html)
    containerPast.innerHTML = cardsParaCargar;
}

cargarCards(cardsPasadas);

//* Cargar los checkbox de forma dinamica
let arrayCheckbox = [];
data.events.forEach(elem => {
    if (!arrayCheckbox.includes(elem.category)) {
        arrayCheckbox.push(elem.category)
    }
});
let cargarChecks = ""
arrayCheckbox.forEach(check => {
    cargarChecks += `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox${arrayCheckbox.indexOf(check)}" value="${check}">
    <label class="form-check-label" for="inlineCheckbox${arrayCheckbox.indexOf(check)}">${check}</label>
</div>`
});
containerCheck.innerHTML =cargarChecks;

//? Filtro por Search
let inputData = "";
inputSearch.addEventListener("change", (e)=>{
    inputData = e.target.value;
    let filtroSearch = cardsPasadas.filter( (e)=> e.name.toLowerCase().includes(inputData.toLowerCase()));
    cargarCards(filtroSearch);
})    

formSearch.addEventListener("submit", (event)=>{
    event.preventDefault()
    // console.log(event);
})

//? Filtro por Categorias (checkbox)
const checkboxes = document.querySelectorAll("input[type=checkbox]");

let checkboxData = [];

for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", (event)=>{

        if (event.target.checked) {
            checkboxData.push(event.target.value);
        } else {
            //todo    Con el filter elimino del array los value que no estan cheked (es decir filtro solo los value cheked)
            checkboxData = checkboxData.filter((ev)=> ev != event.target.value);
        }
        // console.log(checkboxData);
        //!  Creo una variable que filtre las cards de cardsFuturas cuya categoria este incluida en el array checkboxData
        let cardsCheck = cardsPasadas.filter((e)=> checkboxData.includes(e.category))

        if (checkboxData.length != 0) {
            cargarCards(cardsCheck);

            //* Con esto los filtros por Categoria y Busqueda podran funcionar de manera combinada podra buscar entre las check selecionados
            let inputData = "";
            inputSearch.addEventListener("change", (e)=>{
                inputData = e.target.value;
                let filtroSearch = cardsCheck.filter( (e)=> e.name.toLowerCase().includes(inputData.toLowerCase()));
                cargarCards(filtroSearch);
})
        } else {
            //? Cargara todas las cards en caso de no haber ningun checkbox marcado
            cargarCards(cardsPasadas);

            //* Con esto los filtros por Categoria y Busqueda podran funcionar de manera combinada podra buscar entre las check selecionados
            let inputData = "";
            inputSearch.addEventListener("change", (e)=>{
                inputData = e.target.value;
                let filtroSearch = cardsPasadas.filter( (e)=> e.name.toLowerCase().includes(inputData.toLowerCase()));
                cargarCards(filtroSearch);
})
        }
    })
}


