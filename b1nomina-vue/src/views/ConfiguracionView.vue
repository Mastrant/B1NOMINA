<template>
    <LayoutPanel>
        <template #cabecera>
            <Header nombrePagina=" Configuración" />
        </template>
        
        <template v-slot:panel>            
            <router-view />
        </template>
    </LayoutPanel>
</template>

<script>
import Header from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
export default {
    name: 'configuracion',
    components: {
        Header,
        LayoutPanel
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