<template>
    <LayoutPanel>
        <template #default>
            <Header nombrePagina="Gestión de Nómina" />  
        </template>
    </LayoutPanel>
</template>

<script>
import Header from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';

export default {
    name: 'gestionNomina',
    components: {
        Header,
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