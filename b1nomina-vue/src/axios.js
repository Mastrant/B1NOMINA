//Documento con la configuracion de axios

import axios from 'axios'

//base de la URL


axios.defaults.baseURL = 'http://192.168.3.52:8000/V1.0';

//axios.defaults.baseURL = 'http://10.0.2.3:8000/V1.0'

// almacena en una variable el valor del token en el localStorage
const token = localStorage.getItem('token')

// si el token existe
if(token){
    //configuracion de la cabezera con el token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

import router from '@/router'; // Asegúrate de importar tu instancia de Vue Router

//captura las peticiones
axios.interceptors.response.use(
    response => response,
    error => {
      // Verifica si el error es un error  500
      if (error.response && error.response.status ===  500) {
        // Elimina el token del almacenamiento local
        localStorage.removeItem('token');
  
        // Utiliza Vue Router para redirigir al usuario a la página de inicio de sesión
        router.replace('/login');
      }
  
      // Retorna el error para que pueda ser manejado posteriormente
      return Promise.reject(error);
    }
  );

