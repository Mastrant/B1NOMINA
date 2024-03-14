<template>
    <button type="button">
        <RelojIconVue />
        <span>
            {{ Texto }}
        </span>
    </button>    
</template>

<script setup>
import { defineProps } from 'vue';
import RelojIconVue from '../icons/Reloj-icon.vue';

const props = defineProps({
    Texto: {
        type: String,
        default: "Sin Iniciar"
    },
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
    border: #FAB400 solid 1px; 
    cursor: pointer;
    background-color: rgba(237.56, 199.55, 0, 0.30);
    align-items: center;
}

button > span {
    color: #FAB400;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    letter-spacing: 0;
}
</style>
