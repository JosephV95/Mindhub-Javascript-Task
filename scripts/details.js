
const divDetail = document.getElementById("containerDetail");

const param = new URLSearchParams(location.search)

const id = param.get("id")

//! Se cargara las cards desde una API (con asincronismo)
function traerDatosApi(){
    // fetch('scripts/amazing_1.json')
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(datosApi => {

        let cardDetail = datosApi.events.find((event) => event._id == id);
        // console.log(cardDetail);
        cargarCardDetail(cardDetail);
    })
    .catch(error => console.log(error.messagge))
}
traerDatosApi()

// funcion para volver a la pagina anterior
function volverAtras(){
  window.history.back()
}

function cargarCardDetail(eventoDetail){
  return divDetail.innerHTML = `
        <div class="card border-primary bg-black text-white mb-3 mt-3 p-3" style="max-width: 100%; font-size: 1.2rem; font-family: 'Caveat', cursive;">
          <div class="row g-3 ">
            <div class="col-md-5 align-self-center">
              <img src="${eventoDetail.image}" class="align-self-center" style="width:100%; height: auto; " alt="img${eventoDetail._id}">
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h3 class="card-title "><b>${eventoDetail.name}</b></h3>
                <p class="card-text"><i>${eventoDetail.description}</i></p>
                <p class="card-text"><b><u>Date</u>:</b> ${eventoDetail.date}</p>
                <p class="card-text"><b><u>Price</u>:</b> $${eventoDetail.price}</p>
                <p class="card-text"><b><u>Capacity</u>:</b> ${eventoDetail.capacity} people</p>
                <p class="card-text"><b><u>Assistance</u>:</b> ${eventoDetail.assistance} </p>
                <p class="card-text"><b><u>Estimate</u>:</b> ${eventoDetail.estimate} </p>
                <p class="card-text"><b><u>Category</u>:</b> ${eventoDetail.category}</p>
                <p class="card-text"><b><u>Place</u>:</b> ${eventoDetail.place}</p>
                <button id="btnDetail" onClick=volverAtras()  type="button" class="btn btn-outline-info"><i class="fa-solid fa-arrow-left fa-fade"> </i> Go back...</button>
              </div>
            </div>
          </div>
        </div>`
}


