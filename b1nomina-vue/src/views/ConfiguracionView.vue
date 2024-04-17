<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="Configuraciones" />
        </template>
        
        <template #panel>            
            <router-view />
        </template>
    </LayoutPanel>
</template>

<script setup>
    import Headervue from '@/components/Header.vue';
    import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>