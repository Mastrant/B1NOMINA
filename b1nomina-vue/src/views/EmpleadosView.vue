<template>
    <div>
        <Headervue nombrePagina="Empleados" />
    </div>
</template>

<script>
import Headervue from '@/components/Header.vue';
export default {
    name: 'empleados',
    components: {
        Headervue,
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