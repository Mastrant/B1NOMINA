import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VuePaginate from 'vue-paginate';


//importa la configuracion de axios
import './axios'

// crea la app
const app = createApp(App);


// Registrar vue-paginate como un plugin global
app.use(VuePaginate);
// añade la funcion de vrouter
app.use(router, VuePaginate)


//id donde se renderiza la app en el index.html
app.mount('#app')
