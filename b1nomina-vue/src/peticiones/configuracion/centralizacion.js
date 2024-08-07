import axios from "axios";

/*
Ejemplo del equema de las consultas

getListadoDepartamentos(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/list_departamentos`)
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
    CreateDepartamento(idCreador){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.post(`precreate_departamento?userCreatorId=${idCreador}`)
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
    ActualizarDepartamento(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`departamento/${id}/update?user_updater=${idMaster}`,payload)
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
*/
const peticiones_configuracion_Centralizaxiones = {

    getParametrosConfiguracionGeneral(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/parametros_centralizacion`)
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
    getConfiguracionGeneral(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/get_centralizaciones_costos`)
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

    ActualizarEstadoCentroCosto(idMaster, sociedadID, estado){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`sociedad/${sociedadID}/change_estatus_centralizacion?estado=${estado}&user_updater=${idMaster}`)
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


    ActualizarEstadoPrestamoSolidario(idMaster, sociedadID, estado){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`sociedad/${sociedadID}/change_estatus_prestamos_solidario?estado=${estado}&user_updater=${idMaster}`)
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

    ActualizarCuentasContables(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`centralizacion/${id}/update_reduced?user_updater=${idMaster}`,payload)
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

    getCentroDeCosto(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`centros_costo/${sociedadID}/list_centros_costos`)
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

    CreateCentroCosto(sociedadID, idMaster){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.post(`sociedad/${sociedadID}/create_default_centros_costos?userCreatorId=${idMaster}`)
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

    ActualizarCentroDeCosto(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`centros_costos/${id}/update?user_updater=${idMaster}`,payload)
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


    getGrupoCentralizacion(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/get_centralizaciones`)
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
    
    ActualizarNombreGrupoCentralizacion(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`grupo_centralizacion/${id}/update_nombre?nombre=${payload?.nombre}&user_updater=${idMaster}`)
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
    ActualizarConfiguracionGrupoCentralizacion(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`centro_costo/${id}/update?user_updater=${idMaster}`,payload)
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
export default peticiones_configuracion_Centralizaxiones
