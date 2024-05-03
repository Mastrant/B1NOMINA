import axios from "axios";
import almacen from "@/store/almacen";

/*
async nombreFuncion(parametro){
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
}

export default peticiones