//Documento con la configuracion de axios

import axios from 'axios'

//base de la URL
axios.defaults.baseURL = 'http://192.168.3.52:8000/V1.0';


//configuracion de la cabezera con el token
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');
