//!  Crea una instancia de Vue
const { createApp } = Vue;

createApp({
  data() {
    return {
      // urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
      urlApi: "scripts/amazing_1.json",
      evento: [],
      idParam: new URLSearchParams(location.search).get("id"),
    };
  },
  created() {
    console.log(this.idParam);
    this.traerDatosApi();
  },
  methods: {
    traerDatosApi() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((datosApi) => {
          console.log(datosApi.events);
          this.evento = datosApi.events.find((ev) => (ev._id == this.idParam));
          this.evento.toLocaleString('es-AR')
          console.log(this.evento);
        })
        .catch((error) => console.log(error.message));
    },
    volverAtras(){
      window.history.back();
    }
  },
  computed: {},
}).mount("#app");


