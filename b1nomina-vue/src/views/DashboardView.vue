<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="DashBoard" />
        </template>

        <template v-slot:panel>
            <span>En Desarrollo, gracias por su paciencia.</span>
            <button @click="showNotificacion">
                show
            </button>
            <TemplateAlertModal 
                @closeNotificacion="showNotificacion()" 
                :activarNotifiacion="mostrarNotificacion" 
                Mensaje="Texto a mostrar" 
                :Status="true"
            />
        </template>
    </LayoutPanel>
</template>

<script setup>
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import TemplateAlertModal from '@/components/modal/TemplateAlertModal.vue';
import { ref } from 'vue';

const mostrarNotificacion = ref(false)
    /**
     * Controla el despliegue de la notificacion
     * @param mostrarNotificacion
     */
    const showNotificacion = () => {
        mostrarNotificacion.value = !mostrarNotificacion.value;
    };
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>