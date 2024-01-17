<template>
    <LayoutCore>
        <template #body>
            <RouterView />
        </template>
        <template #nav>
            <NavegadorVue />                 
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
    },
    async mounted() {
        if(localStorage.getItem('token')){
            console.log("pagina de persona")
        }else{
            this.$router.push("/login")
        }
    },
    }
</script>

<style scoped>
</style>