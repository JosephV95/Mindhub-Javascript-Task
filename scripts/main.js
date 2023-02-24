//? Capturamos un nodo del DOM (en el HTML).  
const contenedor = document.getElementById("contenedor");

let tarjetas = "";

function agregarCards(dataArray){
    for (let persona of dataArray) {
        tarjetas += `
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
            <div class="card " style="width: 20rem; height: 25rem; ">
                <img src="${persona.image}" class="card-img-top" alt="...">
                <div class="card-body text-center" style="position: relative";>
                    <h4 class="card-title">${persona.name}</h4>
                    <p class="card-text">${persona.description}</p>
                    <a href="details.html" class="btn btn-primary" style="position: absolute; bottom:1rem; margin-left: -2rem;" >Details</a>
                </div>
            </div>
        </div> `
    }
    return tarjetas;
}

//? con innerHTML se le asigna texto html( con innerText solo se le asignaria strings)
contenedor.innerHTML = agregarCards(data.events);

// let fecha1 = new Date("2022-01-01");
// let fecha2 = new Date("2022-04-15");

// let fech = fecha1 < fecha2;
// console.log(fecha1 < fecha2);