<template>

    <router-link :class="{'activate' : seleccionado}" :to="{name: direccion}">
        {{text}}
        <span class="cantidad">
            {{ cantidad }}
        </span>
    </router-link>

</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: ""
    },
    direccion: {type:String},
    cantidad: {
        type: String,
        default: '0',
    },
    seleccionado: {type:Boolean},
});
</script>

<style scoped>

a {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 100%;
    box-sizing: border-box;
    gap: 8px;
    padding-top: 4px;

    /*Estulos de fuente*/
    color: #1A2771;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    text-decoration: none;
}

a > span.cantidad {
    padding: 1px;
    min-width: 24px;
    width: fit-content;
    height: 24px;
    box-sizing: border-box;
    padding: 8px 4px;
    background: #CDE0F1; 
    border-radius: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    display: inline-flex;

    /*Estilos de fuente*/
    color: #1A245B;
    font-size: 12px;
    font-weight: 600;
    line-height: 14.40px;
    word-wrap: break-word;
}

a.activate{
    border-bottom: #1A245B 4px solid;
}

</style>