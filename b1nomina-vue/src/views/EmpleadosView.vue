<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="Empleados" />
        </template>
        <template #panel>
            
            
            
        </template>
    </LayoutPanel>
</template>

<script>
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';


export default {
    name: 'empleados',
    components: {
        Headervue,
        LayoutPanel,
    },
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>