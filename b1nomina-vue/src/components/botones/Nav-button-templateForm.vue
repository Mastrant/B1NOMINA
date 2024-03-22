<template>

    <span :class="{'activate' : seleccionado}">
        {{text}}
    </span>

</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: ""
    },

    seleccionado: {type:Boolean},
});
</script>

<style scoped>

span {
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
    cursor: pointer;
}

span.activate{
    border-bottom: #1A245B 4px solid;
}

</style>