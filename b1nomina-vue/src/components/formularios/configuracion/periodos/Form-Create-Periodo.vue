<template>
    <form class="formulario" id="AddPeriodo" @submit.prevent="Enviar">
        <span class="mensaje">
            ¿Desea añadir el siguiente periodo contable correspondiente al año: <span class="year">{{Data?.addYear}}</span>
        </span>
    </form>
</template>

<script setup>

import { defineEmits } from 'vue';
import peticiones_configuracion_Periodos from '@/peticiones/configuracion/periodos.js'

const props = defineProps({
    Data: {
        type: Object,
        default: {year: 2000}
    }
})

const emit = defineEmits([
    "DataNotificacion",
]);


const Enviar = async () => {

    const respuesta = await peticiones_configuracion_Periodos?.CrearPeriodo(props.Data?.sociedadID, props.Data?.addYear, props.Data?.creador);
    if(respuesta.success == true){
            emit('DataNotificacion', {'texto':respuesta?.data?.message, 'valor': true})
        } else {
            console.error(respuesta?.error)
            emit('DataNotificacion', {'texto': respuesta?.error.data?.message, 'valor': false})
        }

}
</script>

<style scoped>

form > span.mensaje {
font-family: Poppins;
font-size: 18px;
font-weight: 400;
line-height: 26px;
text-align: justified;

}

form > span.mensaje > span.year{
font-size: 20px;
font-weight: 600;
line-height: 26px;
text-align: justified;
}

</style>