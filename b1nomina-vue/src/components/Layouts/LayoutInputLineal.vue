<template>
    <div class="contend-select">
        <p>
            {{textLabel}}
            <span>*</span>
        </p>
        <slot />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    textLabel:{
        type: String,
        default: 'Titulo Layout'
    }
});

</script>

<style scoped>
div.contend-select {
    display: flex;
    flex-direction: column;
    width: 48%;
    gap: 1px;
}

p {
    font-size: 13px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
    color: #888888;
    margin: 1px;
}

p span{
    color: #E32A40;
    font-size: 13px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
}
</style>