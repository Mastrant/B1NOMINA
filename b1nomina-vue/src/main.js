import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//importa la configuracion de axios
import './axios'

const app = createApp(App)



app.use(router)

app.mount('#app')
