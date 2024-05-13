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
            return { success: false, error: error };
        }  
    }, 
 * 
 */

const peticiones_configuracion_datosEmpresa = {
    getDatosBasicosEmpresa(sociedadID){
        try {
            return axios.get(`sociedad/${sociedadID}/datos_basicos`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                return { success: false, error: error?.response };
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    }, 
    getDatosRepresentanteEmpresa(sociedadID){
        try {
            return axios.get(`sociedad/${sociedadID}/datos_representante`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                return { success: false, error: error?.response };
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    }, 
}

export default peticiones_configuracion_datosEmpresa