<template>
    <div>
        <Header nombrePagina="Notificaciones" />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    name: 'notificaciones',
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