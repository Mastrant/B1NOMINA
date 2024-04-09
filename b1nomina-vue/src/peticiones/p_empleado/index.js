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

const peticiones = {

    async datosDelEmpleado(id){
        return  await axios.get(`user/${id}/profile`)
            .then(respuesta => {
                return { success: true, data: respuesta.data.data };
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
    }

}

export default peticiones