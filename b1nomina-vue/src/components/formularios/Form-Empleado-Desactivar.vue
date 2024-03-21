<template>
    <form id="FormSend" @submit.prevent="Enviar">
        <span>Al desactivarlo debes tener en cuenta que:</span>
        <ol>
            <li>No aparecerá en la sección Gestionar Nómina.</li>
            <li>Como Usuario no podrá acceder a la plataforma.</li>
            <li>Se detendrán los eventos recurrentes asignados para el empleado.</li>
        </ol>                        
    </form>
</template>

<script setup>
import {defineProps} from 'vue';
import axios from 'axios'
const props = defineProps({
    EmpleadoIDSelecionado:{
        type: [String, Number],
        default: null
    }
})

const Enviar = () => {
    axios.put(`user/${props.EmpleadoIDSelecionado}/deactivate_user?user_updater=${IDMaster}`)
    .then()
    .catch()
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
}

form > span {
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
li {
    text-align: start;
}

li::marker {
    text-align: center;
}

</style>