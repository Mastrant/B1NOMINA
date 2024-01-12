<template>
    <LayoutCore>
        <template #nav>
            <NavegadorVue />                 
        </template>
        <template #header>
            
                
        </template>
    </LayoutCore>
</template>

<script>
import NavegadorVue from '@/components/Navegador.vue';
import LayoutCore from '@/components/Layouts/LayoutCore.vue';

export default {
    components: {
        NavegadorVue,
        LayoutCore,

    }
}
</script>

<style scoped>
</style>