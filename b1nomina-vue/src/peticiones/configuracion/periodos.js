import axios from "axios";

const peticiones_configuracion_Periodos = {

    getListadoPeriodos(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedades/${sociedadID}/get_periodos_by_sociedad`)
            // Si la petición es exitosa, devuelve un objeto con éxito y los datos recibidos.
           .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            // En caso de error en la petición, devuelve un objeto indicando el fallo y el mensaje de error.
           .catch(error => {
                return { success: false, error: error?.response };
            });
        } catch (error) {
            // Captura errores generales del bloque try-catch y devuelve un objeto indicando el fallo.
            return { success: false, error: error };
        }  
    }, 
}


// Exporta el objeto peticiones_configuracion_datosEmpresa para su uso en otros módulos.
export default peticiones_configuracion_Periodos