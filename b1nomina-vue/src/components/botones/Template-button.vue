<template>
    <button>
        <slot name="default">

        </slot>
        <span>
            {{ text }}
        </span>
    </button>    
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    text: ref('')
})
</script>

<style scoped>
button {
    box-sizing: border-box;
    padding-left: 15.39px;
    padding-right: 15.39px; 
    padding-top: 9.62px; 
    padding-bottom: 9.62px;
    background: #1A245B;
    box-shadow: 0px 0.9615941643714905px 1.923188328742981px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    overflow: hidden;
    border: 1px #F8F8F8 solid;
    justify-content: center;
    align-items: center;
    gap: 7.69px;
    display: flex;
    justify-content: space-between;
}

button:hover {
    background: #002E99;
}

span {
    /*estilos de fuente*/

    color: #F8F8F8;
    font-size: 13.46px;
    font-family: Poppins;
    font-weight: 500;
    line-height: 19.23px;
    word-wrap: break-word
}
</style>