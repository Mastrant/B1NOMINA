<template>
    <button class="nav-button" :class="{'activate': activar}" type="button">
        <span>{{texto}}</span>
    </button>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    activar:{
        type: Boolean,
        default: false
    },
    texto: {
        type: String,
        default: 'Texto Default'
    }
});

</script>

<style scoped>
.nav-button {
    height: fit-content;
    width: 217px;
    padding: 12px 12px;
    background: white;
    border-radius: 6px;
    border: 2px #1A2771 solid;
    justify-content: center;
    align-items: center;
    gap: 12px;
    display: inline-flex;
}

.nav-button:hover {
    background: rgb(237, 237, 237);
}

.nav-button span {
    color: #002E99;
    font-size: 16px;
    font-weight: 550;
    line-height: 28px;
    word-wrap: break-word
}

.nav-button.activate {
    background: #1A2771;
    border: 2px #0f163f solid;
}

.nav-button.activate span {
    color: #F8F8F8;
}


</style>