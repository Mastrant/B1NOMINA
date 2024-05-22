import axios from "axios";
/**
 * Peticion(idEmpleado, idMaster,){
        try {
            return axios.put(`user/${idEmpleado}/skip_contrato_user?creatorUserId=${idMaster}`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data.data };
            })
            .catch(error => {
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            return { success: false, error: error }
        }  
    }, 
 * 
 */
// Definición de un objeto que contiene funciones para realizar peticiones HTTP a una API relacionada con datos de empresas.
const peticiones_configuracion_datosEmpresa = {

    // Función para obtener los datos básicos de una empresa mediante su ID.
    getDatosBasicosEmpresa(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos básicos de la empresa.
            return axios.get(`sociedad/${sociedadID}/datos_basicos`)
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
    // Función para obtener los datos básicos de una empresa mediante su ID.
    ActualizarDatosBasicosEmpresa(sociedadID, idMaster, payload){
        console.log(sociedadID, idMaster, payload)
        try {
            // Realiza una petición GET a la API para obtener los datos básicos de la empresa.
            return axios.put(`sociedad/${sociedadID}/update_basicos?user_updater=${idMaster}`, payload)
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

    // Función para obtener los datos del representante de una empresa mediante su ID.
    getDatosRepresentanteEmpresa(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/datos_representante`)
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
    ActualizarDatosReponsableEmpresa(sociedadID, idMaster, payload){
        console.log(sociedadID, idMaster, payload)
        try {
            // Realiza una petición GET a la API para obtener los datos básicos de la empresa.
            return axios.put(`sociedad/${sociedadID}/update_representante?user_updater=${idMaster}`, payload)
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

    // Función para obtener los datos del representante de una empresa mediante su ID.
    getListadoSedes(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/list_sede`)
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
    CreateSede(idCreador){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.post(`precreate_sede?userCreatorId=${idCreador}`)
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
    ActualizarSede(idMaster, idSede, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`sede/${idSede}/update?user_updater=${idMaster}`,payload)
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

    getListadoGrupos(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/list_grupos_empleados`)
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
    CreateGrupo(idCreador){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.post(`precreate_grupo_empleado?userCreatorId=${idCreador}`)
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
    ActualizarGrupo(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`grupo_empleados/${id}/update?user_updater=${idMaster}`,payload)
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

    getListadoCargos(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`list_cargos`)
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
    CreateCargo(idCreador){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.post(`precreate_cargos?userCreatorId=${idCreador}`)
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
    ActualizarCargo(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`cargos/${id}/update?user_updater=${idMaster}`,payload)
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

    getListadoCamposAdicionales(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/get_campos_adicionales`)
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
    CreateCampoAdicional(idCreador){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.post(`create_campos_adicionales?userCreatorId=${idCreador}`)
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
    ActualizarCampoAdicional(idMaster, id, payload){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.put(`cargos/${id}/update?user_updater=${idMaster}`,payload)
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

    getDatosPrevisionalesBasicos(sociedadID){
        try {
            // Realiza una petición GET a la API para obtener los datos del representante de la empresa.
            return axios.get(`sociedad/${sociedadID}/get_campos_adicionales`)
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
export default peticiones_configuracion_datosEmpresa
