<template>
    <button type="button">
        <trashIcon />
        <span>{{ texto }}</span>
    </button>        
</template>

<script setup>
import { defineProps } from 'vue';
import trashIcon from '../icons/trash-icon.vue';

const prosp = defineProps({
    texto: {
        String,
        default: "Descartado"
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
    border: rgba(227,42,64,1) solid 1px; 
    cursor: pointer;
    background-color: #d42e274c;
    align-items: center;
}

button > span {
    color: rgba(227,42,64,1);
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    letter-spacing: 0;
}
</style>