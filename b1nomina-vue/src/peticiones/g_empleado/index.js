import axios from "axios";

/*
const nombreFuncion = async (parametro) =>{
    await axios.get()
    .then(
        respuesta => {
            return respuesta?.data, respuesta.status
        }
    )
    .catch(
        error => {

        }
    )
}
*/

const peticiones_EnContratacion = {

    cargarCV(idEmpleado, idMaster, Data){     
        const formData = new FormData();
        formData.append('File', Data); // Asume que 'Datos' es un objeto File
        try {
            return axios.post(`user/${idEmpleado}/upload_cv_user?creatorUserId=${idMaster}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
            return { success: false, error: error };
        }                    
    },
    DescartarCV(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    },      
    RetomarCV(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    },  

    cargarContrato(idEmpleado, idMaster, Data){
        const formData = new FormData();
        formData.append('File', Data); // Asume que 'Datos' es un objeto File
        try {
            return axios.post(`user/${idEmpleado}/upload_contrato_user?creatorUserId=${idMaster}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
        
                return { success: false, error: error?.response.data.message };
            });
        } catch (error) {
        
            return { success: false, error: error };
        }
    },  
    DescartarContrato(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    }, 
    RetomarContrato(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    },

    ActivarProspecto(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    }, 
    DescarProspecto(idEmpleado, idMaster,){
        return axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    }, 

}

export default peticiones_EnContratacion