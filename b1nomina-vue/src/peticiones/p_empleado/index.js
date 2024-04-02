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

    async datosDelEmpleado(id) {
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
    async datosDelUsuario(id){
        await axios.get(`user/${id}/profile`)    
        .then(
            respuesta => {
                console.log(respuesta)
               
            }
        )
        .catch(
            error => {
                console.log(error)
                
            }
        )
    }

}

export default peticiones