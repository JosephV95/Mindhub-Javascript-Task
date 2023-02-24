//? Capturo el nodo del DOM(en html) a donde se le asignaran las cards
const containerUp = document.getElementById("contenedorUp")

//! fecha a ser comparada con las demas
const fechaBase = new Date(data.currentDate); 

let cardsCargadas = crearCards(data.events);

function crearCards(unArray){
    let cards = ""

    for (let persona of unArray) {
        if (new Date(persona.date) >= fechaBase) {
            cards += ` 
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
                <div class="card" style="width: 20rem; height: 25rem; ">
                    <img src="${persona.image}" class="card-img-top" alt="...">
                    <div class="card-body  text-center">
                        <h4 class="card-title">${persona.name}</h4>
                        <p class="card-text">${persona.description}</p>
                        <a href="details.html" class="btn btn-primary"  style="position: absolute; bottom:1rem; margin-left: -2rem;">Details</a>
                    </div>
                </div>
            </div>
        </div> `
        }
    }
    return cards
}

//?  Le asignamos el valor al template(html)
containerUp.innerHTML = cardsCargadas