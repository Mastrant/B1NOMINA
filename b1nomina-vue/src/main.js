import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//importa la configuracion de axios
import './axios'

// crea la app
const app = createApp(App)

// añade la funcion de vrouter
app.use(router)

//id donde se renderiza la app en el index.html
app.mount('#app')
