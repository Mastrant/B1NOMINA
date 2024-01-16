//Documento con la configuracion de axios

import axios from 'axios'

//base de la URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/V1.0';


//configuracion de la cabezera con el token
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
