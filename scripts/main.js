//? Capturamos un nodo del DOM (en el HTML).  
const contenedor = document.getElementById("contenedor");
const containerCheck = document.getElementById("containerChecks");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

let tarjetasCargadas = "";
let inputData = "";

function cargarCards(unArray){
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

cargarCards(data.events)

//* Cargar los checkbox de forma dinamica
let arrayCheckbox = [];
data.events.forEach(elem => {
    if (!arrayCheckbox.includes(elem.category)) {
        arrayCheckbox.push(elem.category)
    }
});
// console.log(arrayCheckbox);
let cargarChecks = ""
arrayCheckbox.forEach(check => {
    cargarChecks += `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox${arrayCheckbox.indexOf(check)}" value="${check}">
    <label class="form-check-label" for="inlineCheckbox${arrayCheckbox.indexOf(check)}">${check}</label>
</div>`
});
containerCheck.innerHTML =cargarChecks;

//?  Para filtrar las Cards por el Buscador
function filtrarPorSearch(elArray){
    inputSearch.addEventListener("keyup", (event) =>{
        inputData = event.target.value
        let filtroSearch = elArray.filter( ev => ev.name.toLowerCase().includes(inputData.toLowerCase()));  
        cargarCards(filtroSearch)
    })
}
filtrarPorSearch(data.events)

formSearch.addEventListener("submit", (event)=> {
    event.preventDefault()
    console.log(event);
})

//? Filtrado por Checkbox
const checkboxes = document.querySelectorAll("input[type=checkbox]")

let categoryCheck = [];

for (const checkbox of checkboxes) {
    checkbox.addEventListener('click', (event) => {

        if (event.target.checked ) {
            categoryCheck.push(event.target.value)
        }else {
            //todo    Con el filter elimino del array los value que no estan cheked (es decir filtro solo los value cheked)
            categoryCheck = categoryCheck.filter( ev => ev != event.target.value)
        }

        let cardsCheck = data.events.filter( event => categoryCheck.includes(event.category));

        if (categoryCheck.length > 0) {
            cargarCards(cardsCheck);

            //* Con esto los filtros por Categoria y Busqueda podran funcionar de manera combinada, podra buscar entre las check selecionados
            filtrarPorSearch(cardsCheck);
        } else {
            //? Con esto cargara todas las cards en caso de no haber ningun checkbox marcado
            cargarCards(data.events);

            //* Con esto los filtros por Categoria y Busqueda podran funcionar de manera combinada. podra buscar entre las check selecionados
            filtrarPorSearch(data.events);
        }    
    })    
}










