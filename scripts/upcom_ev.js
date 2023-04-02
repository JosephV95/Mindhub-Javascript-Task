//!  Crea una instancia de Vue
const { createApp } = Vue;

createApp({
  data() {
    return {
      // urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
      urlApi: "scripts/amazing_1.json",
      eventos: [],
      backupEventos: [],
      categorias: [],
      categoriasChecked: [],
      textoInput: "",
    };
  },
  created() {
    this.traerDatosApi();
  },
  mounted() {},
  methods: {
    traerDatosApi() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((datosApi) => {
          console.log(datosApi);
          this.eventos = this.traerEventosFuturos(datosApi);
          this.backupEventos = this.eventos;
          this.traerCategorias(this.eventos);
        })
        .catch((error) => console.log(error.message));
    },
    traerEventosFuturos(unArray) {
      let eventosFuturos = unArray.events.filter(
        (ev) => new Date(ev.date) >= new Date(unArray.currentDate)
      );
      console.log(eventosFuturos);
      return eventosFuturos;
    },
    traerCategorias(unArray) {
      unArray.forEach((ev) => {
        if (!this.categorias.includes(ev.category)) {
          this.categorias.push(ev.category);
        }
      });
      this.categorias.sort();
      console.log(this.categorias);
    },
  },
  computed: {
    filtroDoble() {
      let primerFiltro = this.backupEventos.filter((ev) =>
        ev.name.toLowerCase().includes(this.textoInput.toLowerCase())
      );
      if (this.categoriasChecked.length > 0) {
        this.eventos = primerFiltro.filter((evento) =>
          this.categoriasChecked.includes(evento.category)
        );
      } else {
        this.eventos = primerFiltro;
      }
    },
  },
}).mount("#app");
