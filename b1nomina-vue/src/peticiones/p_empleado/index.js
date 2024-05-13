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

const peticiones = {

    async datosDelEmpleado(id){
        return  await axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data?.data };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    },
        
    async datosDelUsuario(id){
        await axios.get(`user/${id}/profile`)    
        .then(
            respuesta => {
                return true, respuesta
            }
        )
        .catch(
            error => {
                return false, error                
            }
        )
    },

    actualizarValoresNavegacionEmpleado(id){
        return new Promise((resolve, reject) => {

            axios.get(`/sociedad/${id}/resumen_empleados`)
            .then((respuesta) => {
                
                if (respuesta.data?.data) {
                    resolve({ success: true, data: respuesta.data?.data });
                } else {
                    resolve({ success: true, data: respuesta.data });
                }
            })
            .catch((error) => {
                if (error.status == 422) {
                    resolve({ success: false, error: error }); // Problema al pedir los datos, resuelve con null
                } else if (error.status == 404) {
                    resolve({ success: false, error: error }); // Si no hay datos, resuelve con un objeto vacío
                } else {
                    reject({ success: false, error: error }); // Rechaza la promesa con el error
                }
            });
        });
    },
    async ListadoRegiones(){
        return  await axios.get(`parametros_regionales`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data.parametros };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    },

    async pedirParametros(idSociedad){
        return  await axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`)
            .then(respuesta => {
                return { success: true, data: respuesta?.data?.parametros };
            })
            .catch(error => {
                return { success: false, error: error };
            });
    },

    async ActualizarSalario(idEmpleado, idMaster, payload){
        try {
            return await axios.put(`user/${idEmpleado}/update_datos_laborales_salario?user_updater=${idMaster}`, payload)
            .then(
                respuesta => {
                    return { success: true, data: respuesta?.data};
                }
            )
            .catch(
                error => {
                    console.error(error);
                    return { success: false, error: error?.response};
                }
            );
        } catch (error) {
            return { success: false, error: error };
        }  
    },
    async ActualizarContrato(idEmpleado, idMaster, payload){
        try {
            return await axios.put(`user/${idEmpleado}/update_datos_laborales_contrato?user_updater=${idMaster}`, payload)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                console.error(error);
                return { success: false, error: error?.response};
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
    async ActualizarPuesto(idEmpleado, idMaster, payload){
        try {
            return await axios.put(`user/${idEmpleado}/update_datos_laborales_puesto?user_updater=${idMaster}`, payload)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                console.error(error);
                return { success: false, error: error?.response};
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
    async ActualizarDatosPrincipales(idEmpleado, idMaster, payload){
        try {
            return await axios.put(`user/${idEmpleado}/update_datos_personales?user_updater=${idMaster}`, payload)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                console.error(error);
                return { success: false, error: error?.response};
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
    async ActualizarContacto(idEmpleado, idMaster, payload){
        try {
            return await axios.put(`user/${idEmpleado}/update_datos_contacto_ubicacion?user_updater=${idMaster}`, payload)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                console.error(error);
                return { success: false, error: error?.response};
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
    async ActualizarDatosPago(idEmpleado, idMaster, payload){
        try {
            return await axios.put(`user/${idEmpleado}/update_datos_basicos?user_updater=${idMaster}`, payload)
            .then(respuesta => {
                return { success: true, data: respuesta?.data };
            })
            .catch(error => {
                console.error(error);
                return { success: false, error: error?.response};
            });
        } catch (error) {
            return { success: false, error: error };
        }  
    },
}

export default peticiones