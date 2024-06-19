<template>
    <header class="Header">
        <router-link :to="{ path: `/sociedad/${sociedadId}/${RutaName}` }">
            <h2 class="Name-page">{{nombrePagina}}</h2>
        </router-link>
        <h2 v-if="rutaNavegada" class="Name-page">{{rutaNavegada}}</h2>
    </header>
</template>

<script setup>
import { defineProps } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const sociedadId = route.params.sociedadId;

const props = defineProps({
        nombrePagina: {},
        rutaNavegada:{},
        RutaName:{},
});
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

header.Header h2.Name-page {
    color: #1A2771;
    font-size: 28px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;

    
}
</style>