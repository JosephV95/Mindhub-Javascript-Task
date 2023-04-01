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
    this.traerDatosApi()
  },
  methods: {
    traerDatosApi() {
      fetch(this.urlApi)
        .then(response => response.json())
        .then(datosApi => {
          // console.log(datosApi.events);
          this.eventos = datosApi.events;
          // console.log(this.eventos);
        //* El backup guardara los eventos iniciales para que al modificar el array "eventos" no se pierda la información
          this.backupEventos = this.eventos

          this.traerCategorias(datosApi.events)
        })
        .catch(error => console.log(error.message));
    },
    traerCategorias(unArray){
      unArray.forEach(ev => {
        if ( !this.categorias.includes(ev.category)) {
          this.categorias.push(ev.category)
        }
        this.categorias.sort() 
      });
      // console.log(this.categorias); 
    },
  },
  computed: {
    filtroDoble(){
      let primerFiltro = this.backupEventos.filter((ev) => ev.name.toLowerCase().includes(this.textoInput.toLowerCase()))
      if (this.categoriasChecked.length > 0) {
        this.eventos = primerFiltro.filter(evento => this.categoriasChecked.includes(evento.category))
      } else {
        this.eventos = primerFiltro;
      }
    },
    // filtroSearch(){
    //   this.eventos = this.backupEventos.filter((ev) => ev.name.toLowerCase().includes(this.textoInput.toLowerCase()))
    // },
    // filtroCategoria(){
    //   if (this.categoriasChecked.length > 0) {
    //     this.eventos = this.backupEventos.filter((ev)=> this.categoriasChecked.includes(ev.category))
    //   } else {
    //     this.eventos = this.backupEventos
    //   }
    // }, 
  }
}).mount('#app');






