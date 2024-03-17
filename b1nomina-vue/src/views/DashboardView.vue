<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="DashBoard" />
        </template>

        <template v-slot:panel>
            <PanelDashboard />
        </template>
    </LayoutPanel>
</template>

<script setup>
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import PanelDashboard from '@/components/panel/Panel-Dashboard.vue';

</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>