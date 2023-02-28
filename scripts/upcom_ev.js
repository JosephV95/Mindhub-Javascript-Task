//? Capturo el nodo del DOM(en html) a donde se le asignaran las cards
const containerUp = document.getElementById("contenedorUp")

//! fecha a ser comparada con las demas
const fechaBase = new Date(data.currentDate); 
 
let cardsCargadas = "";

//! Usando Funciones de Orden Superior en arrays
let cardsFuturas = data.events.filter(persona => new Date(persona.date) >= fechaBase);

cardsFuturas.forEach( persona => cardsCargadas += ` 
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-3">
                <div class="card" style="width: 20rem; height: 25rem; ">
                    <img src="${persona.image}" class="card-img-top" alt="imgEvento${persona._id}">
                    <div class="card-body  text-center">
                        <h4 class="card-title">${persona.name}</h4>
                        <p class="card-text">${persona.description}</p>
                        <a href="details.html" class="btn btn-primary"  style="position: absolute; bottom:1rem; margin-left: -2rem;">Details</a>
                    </div>
                </div>
            </div>
        </div> `)

//?  Le asignamos el valor al template(html)
containerUp.innerHTML = cardsCargadas