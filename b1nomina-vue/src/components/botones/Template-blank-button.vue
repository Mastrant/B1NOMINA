<template>
    <button type="button">
        <slot name="default">

        </slot>
        <span>
            {{ text }}
        </span>
        <slot name="post">

        </slot>
    </button>    
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    text: ref('')
});
</script>

<style scoped>
button {
    box-sizing: border-box;
    padding-left: 15.39px;
    padding-right: 15.39px; 
    padding-top: 9.62px; 
    padding-bottom: 9.62px;
    background: none;

    border-radius: 6px;
    overflow: hidden;
    border:none;
    justify-content: center;
    align-items: center;
    gap: 7.69px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: fit-content;
    height: 48px;

}

button:hover {
    background: #ebedf1;
}

span {
    /*estilos de fuente*/

    color: #002E99;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}
</style>