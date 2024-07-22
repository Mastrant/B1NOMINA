<template>
    <form :id="FORM_ID" @submit.prevent="Enviar">
        <span class="span-activar"> {{ texto }}</span>
    </form>
</template>

<script setup>
import {defineProps} from 'vue';
import peticiones from '@/peticiones/p_empleado';

const FORM_ID = "EliminarPrestamo"
const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

const props = defineProps({
    Informacion: {
        type: Object,
        default: null
    }
});

const emit = defineEmits([
    'activarUsuario',
    'notificacion',
    'respuestaServidor'
]);


/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = async () => {
//si ID es nulo crea un usuario

    const respuesta = await peticiones?.deletePrestamo(props.Informacion?.id, ID_USERMASTER);

    if(respuesta.success == true){
       emit('respuestaServidor', {'Titulo': "Eliminacion Exitosa",'Descripcion':respuesta?.data?.message, 'valor':true})
    } else {
        console.error(respuesta?.error)
        emit('respuestaServidor', {'Titulo': "Error al Eliminar",'Descripcion':respuesta?.error, 'valor':false})
    }

};

const texto = "¿Está seguro que desea borrar el prestamo?.";
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
}

form > span.span-activar {
    display: block;
    color: black;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px;
    box-sizing: border-box;
    overflow-wrap: break-word; /* Cambiado de word-wrap a overflow-wrap */
    white-space: normal; /* Asegura que el espacio en blanco se maneje normalmente */
    width: 100%; /* Asegura que el span tenga un ancho definido */
    text-align: justify;
}

</style>