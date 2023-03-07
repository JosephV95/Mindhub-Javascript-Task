
const divDetail = document.getElementById("containerDetail");

const param = new URLSearchParams(location.search)

const id = param.get("id")

let cardDetail = data.events.find((event) => event._id == id);

divDetail.innerHTML = `
<div class="card border-primary bg-black text-white mb-3 mt-3 p-3" style="max-width: 100%; font-size: 1.2rem; font-family: 'Caveat', cursive; ">
  <div class="row g-3">
    <div class="col-md-5 align-self-center">
      <img src="${cardDetail.image}" class="align-self-center" style="width:100%; height: auto; " alt="img${cardDetail._id}">
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h3 class="card-title ">${cardDetail.name}</h3>
        <p class="card-text">${cardDetail.description}</p>
        <p class="card-text"><b>Date:</b> ${cardDetail.date}</p>
        <p class="card-text"><b>Price:</b> $${cardDetail.price}</p>
        <p class="card-text"><b>Capacity:</b> ${cardDetail.capacity} people</p>
        <p class="card-text"><b>Estimate:</b> ${cardDetail.estimate} </p>
        <p class="card-text"><b>Category:</b> ${cardDetail.category}</p>
        <p class="card-text"><b>Place:</b> ${cardDetail.place}</p>
        <a href="index.html" class="card-link">Back to Home</a>
      </div>
    </div>
  </div>
</div>`



