//Documento con la configuracion de axios

import axios from 'axios'

//base de la URL
axios.defaults.baseURL = 'http://192.168.3.52:8000/V1.0';

// almacena en una variable el valor del token en el localStorage
const token = localStorage.getItem('token')

// si el token existe
if(token){
    //configuracion de la cabezera con el token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

