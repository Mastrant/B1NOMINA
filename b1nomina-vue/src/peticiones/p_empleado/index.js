import axios from "axios";
import almacen from "@/store/almacen";

/*

async nombreFuncion(parametro,){
        try {
            return await axios.METODO(`RUTA`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data.data };
            })
            .catch(error => {
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
*/
// Objeto que agrupa todas las funciones para interactuar con la API de empleados y usuarios.
const peticiones = {

    // Función asíncrona para obtener datos del perfil de un empleado específico.
    async datosDelEmpleado(id){
        try {
            // Intenta realizar una petición GET para obtener los datos del empleado.
            const respuesta = await axios.get(`user/${id}/profile`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta.data?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },
        
    // Función asíncrona para obtener datos del perfil de un usuario específico.
    async datosDelUsuario(id){
        try {
            // Intenta realizar una petición GET para obtener los datos del usuario.
            const respuesta = await axios.get(`user/${id}/profile`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta.data?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },

    // Función para actualizar los valores de navegación de un empleado.
    actualizarValoresNavegacionEmpleado(id){
        return new Promise((resolve, reject) => {
            // Intenta realizar una petición GET para obtener los datos de los empleados.
            axios.get(`/sociedad/${id}/resumen_empleados`)
           .then((respuesta) => {
                // Si la petición es exitosa, resuelve la promesa con éxito y los datos obtenidos.
                if (respuesta.data?.data) {
                    resolve({ success: true, data: respuesta.data?.data });
                } else {
                    resolve({ success: true, data: respuesta.data });
                }
            })
           .catch((error) => {
                // Maneja errores específicos según el estado de la respuesta.
                if (error.status == 422 || error.status == 404) {
                    resolve({ success: false, error: error });
                } else {
                    reject({ success: false, error: error });
                }
            });
        });
    },

    // Función asíncrona para obtener un listado de regiones.
    async ListadoRegiones(){
        try {
            // Intenta realizar una petición GET para obtener el listado de regiones.
            const respuesta = await axios.get(`parametros_regionales`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data.parametros };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },

    // Función asíncrona para pedir parámetros específicos para crear un usuario.
    async pedirParametros(idSociedad){
        try {
            // Intenta realizar una petición GET para obtener los parámetros necesarios.
            const respuesta = await axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data?.parametros };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error };
        }
    },

    // Función asíncrona para actualizar el salario de un empleado.
    async ActualizarSalario(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el salario del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_laborales_salario?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar el contrato de un empleado.
    async ActualizarContrato(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el contrato del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_laborales_contrato?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar el puesto de un empleado.
    async ActualizarPuesto(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el puesto del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_laborales_puesto?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar los datos principales de un empleado.
    async ActualizarDatosPrincipales(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos principales del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_personales?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar el contacto y ubicación de un empleado.
    async ActualizarContacto(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar el contacto y ubicación del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_datos_contacto_ubicacion?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    // Función asíncrona para actualizar los datos bancarios de un empleado.
    async ActualizarDatosPago(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos bancarios del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_bancarios?user_updater=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },
      
    // Función asíncrona para actualizar los datos bancarios de un empleado.
    async ActualizarAPV(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos bancarios del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_apv?userUpdaterId=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },
    // Función asíncrona para actualizar los datos bancarios de un empleado.
    async ActualizarAFP(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos bancarios del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_afp?userUpdaterId=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },
    // Función asíncrona para actualizar los datos bancarios de un empleado.
    async ActualizarDatosAdicionales(idEmpleado, idMaster, payload){
        try {
            // Intenta realizar una petición PUT para actualizar los datos bancarios del empleado.
            const respuesta = await axios.put(`user/${idEmpleado}/update_prevision_salud_aditional?userUpdaterId=${idMaster}`, payload);
            // Devuelve un objeto con éxito y los datos obtenidos si la petición fue exitosa.
            return { success: true, data: respuesta?.data };
        } catch (error) {
            // En caso de error, devuelve un objeto indicando el fallo y el error.
            return { success: false, error: error?.response };
        }
    },

    /**
     * Actualiza la prevención de salud de un empleado.
     * @param {number} idEmpleado - ID del empleado cuyos datos se van a actualizar.
     * @param {number} idMaster - ID del usuario que realiza la actualización.
     * @param {Object} payload - Objeto con los nuevos datos de prevención de salud.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
    */
   
    async function ActualizarPresvisionSalud(idEmpleado, idMaster, payload) {
        try {
            const respuesta = await axios.put(`user/${idEmpleado}/update_prevision_salud_reduced?userUpdaterId=${idMaster}`, payload);
            return { success: true, data: respuesta?.data };
        } catch (error) {
            return { success: false, error: error?.response };
        }
    },

    /**
     * Agrega una nueva carga previsional para un empleado.
     * @param {number} idEmpleado - ID del empleado al cual se le va a agregar la carga previsional.
     * @param {number} idMaster - ID del usuario que realiza la creación.
     * @param {Object} payload - Objeto con los datos de la carga previsional a agregar.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function addCargaPrevisional(idEmpleado, idMaster, payload) {
        try {
            return await axios.post(`user/${idEmpleado}/create_carga_previsional?userCreatorId=${idMaster}`, payload)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Actualiza una carga previsional existente.
     * @param {number} idPersona - ID de la persona asociada a la carga previsional.
     * @param {number} idMaster - ID del usuario que realiza la actualización.
     * @param {Object} payload - Objeto con los nuevos datos de la carga previsional.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function ActualizarCargaPrevisional(idPersona, idMaster, payload) {
        try {
            const respuesta = await axios.put(`carga_previsional/${idPersona}/update_carga_previsional?userUpdaterId=${idMaster}`, payload);
            return { success: true, data: respuesta?.data };
        } catch (error) {
            return { success: false, error: error?.response };
        }
    },

    /**
     * Obtiene el listado de cargas previsionales de un empleado.
     * @param {number} idEmpleado - ID del empleado cuyo listado se desea obtener.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function getListadoCargaPresionales(idEmpleado) {
        try {
            return axios.get(`user/${idEmpleado}/list_carga_previsional`)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Obtiene el listado de préstamos de un empleado.
     * @param {number} idEmpleado - ID del empleado cuyo listado de préstamos se desea obtener.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function getListadoPrestamos(idEmpleado) {
        try {
            return axios.get(`user/${idEmpleado}/list_prestamos_user`)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Agrega un nuevo préstamo para un empleado.
     * @param {number} idEmpleado - ID del empleado al cual se le va a agregar el préstamo.
     * @param {number} idMaster - ID del usuario que realiza la creación.
     * @param {Object} payload - Objeto con los datos del préstamo a agregar.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function addPrestamo(idEmpleado, idMaster, payload) {
        try {
            return await axios.post(`user/${idEmpleado}/create_prestamos?userCreatorId=${idMaster}`, payload)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Calcula las cuotas de un préstamo.
     * @param {number} idEmpleado - ID del empleado cuyas cuotas se van a calcular.
     * @param {number} idMaster - ID del usuario que realiza el cálculo.
     * @param {Object} payload - Objeto con los datos necesarios para el cálculo de cuotas.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function postCuotas(idEmpleado, idMaster, payload) {
        try {
            return axios.post(`user/${idEmpleado}/calcular_prestamos?userCreatorId=${idMaster}`, payload)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Elimina un préstamo de un empleado.
     * @param {number} idEmpleado - ID del empleado cuyo préstamo se va a eliminar.
     * @param {number} idMaster - ID del usuario que realiza la eliminación.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function deletePrestamo(idEmpleado, idMaster) {
        try {
            return axios.delete(`prestamos/${idEmpleado}/delete_prestamos_user?userUpdaterId=${idMaster}`)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Obtiene el listado de contratos de un empleado.
     * @param {number} idEmpleado - ID del empleado cuyo listado de contratos se desea obtener.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function getListadoDeContrato(idEmpleado) {
        try {
            return axios.get(`user/${idEmpleado}/list_files_users`)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },

    /**
     * Obtiene el listado de archivos de un empleado.
     * @param {number} idEmpleado - ID del empleado cuyo listado de archivos se desea obtener.
     * @returns {Promise<Object>} Resolución de la promesa con un objeto que indica si la operación fue exitosa y los datos resultantes.
     */
    async function getListadoDeArchivos(idEmpleado) {
        try {
            return axios.get(`user/${idEmpleado}/list_files_users`)
            .then(respuesta => ({ success: true, data: respuesta?.data }))
            .catch(error => ({ success: false, error: error?.response }));
        } catch (error) {
            return { success: false, error: error };
        }
    },


        
}

// Exporta el objeto peticiones para su uso en otros módulos.
export default peticiones;
