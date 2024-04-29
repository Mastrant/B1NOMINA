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
                return { success: true, data: respuesta.data?.data };
            })
            .catch(error => {
                return { success: false, error: error?.response?.data.message };
            });
        } catch (error) {
            return { success: false, error: error };
        }                    
    },
    descartarCV(idEmpleado, idMaster,){
        try {
            return axios.put(`user/${idEmpleado}/skip_cv_user?creatorUserId=${idMaster}`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data?.data };
            })
            .catch(error => {
                return { success: false, error: error.response?.data?.message };
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },      
    RetomarCV(idEmpleado, idMaster,){
        try {
            return axios.put(`user/${idEmpleado}/activate_contrato_user?creatorUserId=${idMaster}`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data?.data };
            })
            .catch(error => {
                return { success: false, error: (error.response.data.message)?error.response.data?.message: error};
            });
        } catch (error) {
            return { success: false, error: error };
        }
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

    descartarContrato(idEmpleado, idMaster,){
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

    RetomarContrato(idEmpleado, idMaster,){
        try {
            return axios.put(`user/${idEmpleado}/activate_contrato_user?creatorUserId=${idMaster}`)
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

    ActivarProspecto(idMaster, Data){
        console.log(idMaster, Data)
        return new Promise((resolve, reject) => {
            if (idMaster >= 0) {

                axios.post(`/user/contratar?creatorUserId=${idMaster}`, Data)
                .then((respuesta) => {
                    if (respuesta.data?.data) {
                        resolve({ success: true, data: respuesta.data?.data });
                    } else {
                        resolve({ success: true, data: respuesta?.data }); // Si no hay datos, resuelve con un objeto vacío
                    }
                })
                .catch((error) => {
                    console.error(error)
                    if (error.status == 422) {
                        resolve({ success: false, error: error.response }); // Problema al pedir los datos, resuelve con null
                    } else if (error.status == 404) {
                        resolve({ success: false, error: {} }); // Si no hay datos, resuelve con un objeto vacío
                    } else {
                        reject({ success: false, error: error }); // Rechaza la promesa con el error
                    }
                });

            } else {
                resolve({ success: false, error: error });
            }
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

    PedirDatosProspecto(ID_empleado){
        return new Promise((resolve, reject) => {
            if (ID_empleado == null) {

                resolve(null);

            } else if (ID_empleado >= 0) {

                axios.get(`/user/${ID_empleado}/precarga`)
                .then((respuesta) => {
                    if (respuesta.data?.data) {
                        resolve({ success: true, data: respuesta.data.data });
                    } else {
                        resolve({ success: true, data: respuesta.data }); // Si no hay datos, resuelve con un objeto vacío
                    }
                })
                .catch((error) => {
                    console.error(error)
                    if (error.status == 422) {
                        resolve({ success: false, error: error }); // Problema al pedir los datos, resuelve con null
                    } else if (error.status == 404) {
                        resolve({ success: false, error: {} }); // Si no hay datos, resuelve con un objeto vacío
                    } else {
                        reject({ success: false, error: error }); // Rechaza la promesa con el error
                    }
                });

            } else {
                resolve({ success: false, error: error });
            }
        });
    },
    PedirDatosProspectoCompleto(ID_empleado){
        return new Promise((resolve, reject) => {
            if (ID_empleado == null) {

                resolve(null);

            } else if (ID_empleado >= 0) {

                axios.get(`/user/${ID_empleado}/precarga_all`)
                .then((respuesta) => {
                    if (respuesta.data?.data) {
                        resolve({ success: true, data: respuesta.data.data });
                    } else {
                        resolve({ success: true, data: respuesta.data }); // Si no hay datos, resuelve con un objeto vacío
                    }
                })
                .catch((error) => {
                    console.error(error)

                    if (error.status == 422) {
                        resolve({ success: false, error: error }); // Problema al pedir los datos, resuelve con null
                    } else if (error.status == 404) {
                        resolve({ success: false, error: {} }); // Si no hay datos, resuelve con un objeto vacío
                    } else {
                        reject({ success: false, error: error }); // Rechaza la promesa con el error
                    }
                });

            } else {
                resolve({ success: false, error: error });
            }
        });
    },
}

export default peticiones_EnContratacion