<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="DashBoard" />
        </template>

        <template v-slot:panel>
            <span>En Desarrollo, gracias por su paciencia.</span>
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