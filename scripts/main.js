//? Capturamos un nodo del DOM (en el HTML).  
const contenedor = document.getElementById("contenedor");
const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("inputSearch");

const checkboxes = document.querySelectorAll("input[type=checkbox]")

let tarjetasCargadas = "";
let inputData = "";

let checkData = "";

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

//?  Para filtrar las Cards por el Buscador
inputSearch.addEventListener("keyup", (event) =>{
    inputData = event.target.value
    let filtroSearch = data.events.filter( ev => ev.name.toLowerCase().includes(inputData.toLowerCase()));  
    cargarCards(filtroSearch)
})

formSearch.addEventListener("submit", (event)=> {
    event.preventDefault()
    console.log(event);
})

let cardsparacheckear = [];

//? Filtrado por Checkbox
for (const checkbox of checkboxes) {
    checkbox.addEventListener('click', (event) => {
        let dataCheck = [];

        if (event.target.checked ) {

            cardsparacheckear.push(event.target.value)
            dataCheck = data.events.filter(e => e.category == event.target.value)
            console.log(cardsparacheckear);

            
            cargarCards(dataCheck)

            // console.log("esta marcado");
            // console.log(dataCheck);
            
        }else if (!event.target.checked){
            // cargarCards(data.events)

            dataCheck.splice(dataCheck.indexOf( dataCheck.forEach(event => event.category== event.target.value) , 1) )
        }
    })    
    
}



// let array = ["sab", "cob", "mob", "kas"]
// array.sort()

// array.splice(3)
// ['sab']
// array
// (3) ['cob', 'kas', 'mob']
// 
// array.splice(array.indexOf("mob"), 1)
// ['mob']
// array
// (2) ['cob', 'kas']









