<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue v-if="RutaNavegada == ''" nombrePagina="Configuraciones" />
            <Headervue v-else :nombrePagina="'Configuración > ' + RutaNavegada " />
        </template>
        
        <template #panel>            
            <router-view />
        </template>
    </LayoutPanel>
</template>

<script setup>
    import Headervue from '@/components/Header.vue';
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';

    import { provide, ref } from 'vue';
    
    // Función que los componentes hijos pueden llamar para enviar información
    const RutaNavegada = ref('')
    const CambiarNombreRuta = (Nombre) => {
        RutaNavegada.value = Nombre;
    };
    
    provide('CambiarNombreRuta', CambiarNombreRuta);
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>