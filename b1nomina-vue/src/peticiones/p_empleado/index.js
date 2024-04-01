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

const datosDelEmpleado = async (id) =>{
    console.log("123")
    /*await axios.get(`user/${id}/profile`)    
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
    */
}

const datosDelUsuario = async (id) =>{
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

export default datosDelEmpleado