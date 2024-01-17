<template>
    <div>
        <Header nombrePagina="Eventos" />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    name: 'eventos',
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