<template>
    <div>
        <Header nombrePagina="Gestión de Nómina" />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    name: 'gestionNomina',
    components: {
        Header
    },
}
</script>
<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>