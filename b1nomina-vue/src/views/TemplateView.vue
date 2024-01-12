<template>
    <section>
        <NavegadorVue /> 
        <div class="router-body">
            <router-view /> 
        </div>
         
    </section>
</template>

<script>
import NavegadorVue from '@/components/Navegador.vue';
export default {
    components: {
        NavegadorVue,
    }
}
</script>

<style scoped>

section {
    width: 100%;
    height: 50%;
}
div.router-body {
    margin-left: 80px;
}
</style>