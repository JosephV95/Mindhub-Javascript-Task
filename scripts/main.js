//? Capturamos un nodo del DOM (en el HTML).  
const contenedor = document.getElementById("contenedor");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

let tarjetasCargadas = ""
let datainput = "";
let cardsForSearch= "";

function cargarCards(unArray){
    tarjetasCargadas = "";

    unArray.forEach(event =>  tarjetasCargadas += `
    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
        <div class="card " style="max-width: 20rem; height: 25rem; ">
            <img src="${event.image}" class="card-img-top" alt="imgEvento${event._id}">
            <div class="card-body text-center" style="position: relative";>
                <h4 class="card-title">${event.name}</h4>
                <p class="card-text">${event.description}</p>
                <a href="details.html" class="btn btn-primary" style="position: absolute; bottom:1rem; margin-left: -2rem;" >Details</a>
            </div>
        </div>
    </div> `);

    contenedor.innerHTML = tarjetasCargadas;
}

cargarCards(data.events)

//?  Para filtrar las Cards por el Buscador
inputSearch.addEventListener("change", (event) =>{
    datainput = event.target.value
    let filtroSearch = data.events.filter(event => event.name.toLowerCase().includes(datainput.toLowerCase()));  
    cargarCards(filtroSearch)
})

formSearch.addEventListener("submit", (event)=> {
    event.preventDefault()
    console.log(event);
})







