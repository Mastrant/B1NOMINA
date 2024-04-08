<template>
    <button type="button">
        <CirculoCorrectIcon Stroke="#18B055" />
        <span>{{ texto }}</span>
    </button>        
</template>

<script setup>
import { defineProps } from 'vue';
import CirculoCorrectIcon from '../icons/Circulo-correct-icon.vue';

const prosp = defineProps({
    texto: {
        String,
        default: "Completado"
    } 
});

</script>

<style scoped>
button {
    border-radius: 15px;
    height: 28px;
    width: fit-content;
    box-sizing: border-box;
    padding: 12px;
    display: flex;
    flex-direction: row;
    gap: 6px;
    border: #18B055 solid 1px; 
    cursor: pointer;
    background-color: #2AE3744D;
    align-items: center;
}

button > span {
    color: #18B055;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    letter-spacing: 0;
}
</style>