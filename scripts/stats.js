const { createApp } = Vue;

createApp({
  data() {
    return {
      // urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
      urlApi: "scripts/amazing_1.json",
      eventosPasados: [],
      eventosFuturos: [],
      Tabla1Asistencia: [],
      Tabla1Capacidad: [],
      infoTabla2: [],
      infoTabla3: [],
    };
  },
  created() {
    this.traerDatosApi();
  },
  methods: {
    traerDatosApi() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((datosApi) => {
          this.eventosPasados = this.traerEvPasados(datosApi);
          this.traerEvFuturos(datosApi);
          // console.log(this.eventosPasados);
          // console.log(this.eventosFuturos);
          this.Tabla1Asistencia = this.asistenciaTabla1(this.eventosPasados);
          // console.log(this.infoTabla1);
          this.Tabla1Capacidad = this.capacidadTabla1(this.eventosPasados);

          this.infoTabla2 = this.calculosTablas(this.eventosFuturos);
          // console.log(this.infoTabla2);
          this.infoTabla3 = this.calculosTablas(this.eventosPasados);
          // console.log(this.infoTabla3);
        })
        .catch((error) => console.log(error.messagge));
    },
    traerEvPasados(unArray) {
      let evPasados = unArray.events.filter(
        (ev) => new Date(ev.date) < new Date(unArray.currentDate)
      );
      return evPasados;
    },
    traerEvFuturos(unArray) {
      this.eventosFuturos = unArray.events.filter(
        (ev) => new Date(ev.date) >= new Date(unArray.currentDate)
      );
    },
    asistenciaTabla1(unArray) {
      const asistenciaT1 = unArray.map((ev) => {
        return {
          asistencia: ((ev.assistance * 100) / ev.capacity).toFixed(2),
          nombre: ev.name,
        };
      });
      // console.log(asistenciaT1);

      //* Se ordena el Array de mayor a menor segun el porcentaje de asistencia
      asistenciaT1.sort((a, b) => b.asistencia - a.asistencia);
      return asistenciaT1;
    },
    capacidadTabla1(unArray) {
      const capacidadT1 = unArray.map((ev) => {
        return {
          capacidad: ev.capacity,
          name: ev.name,
        };
      });
      capacidadT1.sort((a, b) => b.capacidad - a.capacidad);
      // console.log(capacidadT1);
      let capacidad = capacidadT1[0];
      // console.log(capacidad);
      return capacidad;
    },

    // *  Calculos para las tablas 2y3
    calculosTablas(unArray) {
      //? con Array.from() se le da formato de array, ya que new Set() no lo devuelve como array (new Set hace que no haya elementos repetidos en un array)
      let categorias = Array.from(new Set(unArray.map((e) => e.category)));
      // console.log(categorias);
      let evPorCategorias = categorias
        .sort()
        .map((cate) => unArray.filter((evento) => evento.category == cate));
      // console.log(evPorCategorias);
      //todo  Se creara un array que contendra cada categoria como un objeto con sus datos {categoria, ganancias, porcentAsis}
      let eventosCalculados = evPorCategorias.map((evCateg) => {
        let calculos = evCateg.reduce(
          (acum, evento) => {
            acum.categoria = evento.category;
            acum.ganancias +=
              evento.price * (evento.assistance || evento.estimate); //! con el or ("||") hago que la funcion sea generica y se pueda usar para Eventos Futuros o Pasados
            acum.porcentAsis +=
              ((evento.assistance || evento.estimate) * 100) / evento.capacity;
            return acum;
            //* despues de la coma se le asigno Valores Iniciales al evCalculados ,{...}
          },
          {
            categoria: "",
            ganancias: 0,
            porcentAsis: 0,
          }
        );
        //?  se debe dividir el porcentaceDeAsistencia(porcentAsis) por el total de eventos de cada Categoria(evCat.length) para tener el Porcentaje Correcto por Categoria
        calculos.porcentAsis = calculos.porcentAsis / evCateg.length;
        // console.log(calculos);
        return calculos;
      });

      // console.log(eventosCalculados);
      return eventosCalculados;
    },
  },
  computed: {},
}).mount("#app");

//* ----------------- Se termino de implementar Vue  ;) ---------------

