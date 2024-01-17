<template>
    <div>
        <Header nombrePagina="Empleados" />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    name: 'empleados',
    components: {
        Header
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>