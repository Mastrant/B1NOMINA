<template>
    <header class="Header">
        
        <h2 v-if="rutaNavegada" class="Name-page main" @click="retrocederRuta">{{nombrePagina}}</h2>
        <h2 v-if="rutaNavegada" class="Name-page">{{rutaNavegada}}</h2>
        
        <h2 v-else class="Name-page">{{nombrePagina}}</h2>
    </header>
</template>

<script setup>

import { defineProps } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
        nombrePagina: {},
        rutaNavegada:{},
});

// Define la función que será llamada al hacer clic en el botón
const retrocederRuta = () => {
  // Usa el método go de router para moverse hacia atrás en el historial de navegación
  router.go(-1);
};
</script>

<style scoped>

header.Header {
background: #F8F8F8;
color: #1A2771;
height: 81px;
padding: 20px 30px;
width: 100%;
border-bottom: 2px #CDE0F1 solid;
box-sizing: border-box;
display: flex;
align-items: center;
flex-grow: 1;
gap: 24px;

}

header.Header > * {
    text-decoration: none;
    display: flex;

}

header.Header h2.Name-page.main {

    cursor: pointer;    
}

header.Header h2.Name-page {
    color: #1A2771;
    font-size: 28px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;

    
}
</style>