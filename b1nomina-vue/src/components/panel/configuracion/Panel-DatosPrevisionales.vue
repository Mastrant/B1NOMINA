<template>
    <div class="contend">
        <ListaDatosProvisionales />

        <AlertShort
            ref="notificacionStatus"
        />
    </div>
</template>

<script setup>
import ListaDatosProvisionales from '@/components/listas/configuracion/Lista-DatosPrevisionales.vue';
import AlertShort from '@/components/alertas/Alert-short-template.vue';

import { ref, inject, provide } from 'vue'; // Importa las funciones reactivas y de inyección de dependencias de Vue

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Datos Previsionales');

const notificacionStatus = ref(null)

const showNotificacionShort = (Info) => {
    // Check if notificacionStatus exists before accessing.value
    if (notificacionStatus && notificacionStatus.value) {
        notificacionStatus.value.ActivarNotificacion(Info);
    } else {
        console.error('notificacionStatus or notificacionStatus.value is undefined');
    }
}

provide('showNotificacionShort',showNotificacionShort)
</script>

<style scoped>
.contend {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 12px;
}
.vista-panel {
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: center;
}
</style>