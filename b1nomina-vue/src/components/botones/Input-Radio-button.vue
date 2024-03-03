<template>
    <div class="conted-radius">        
        <input 
            :name="grupo"
            type="radio"
            :id="'Radio'+valor"
            :value="valor"
        >
        <label :for="'Radio'+valor">{{ texto }}</label>
    </div>
</template>

<script setup>
//uso <InputRadioButton v-model="" grupo="" texto="" :valor=""/>
import { defineProps } from 'vue';

const props = defineProps({
    grupo: {
        String,
        default: "Radium"
    },
    valor: {
        Number,
        default: 0
    },
    texto: {
        String,
        default: ''
    }
});
</script>

<style scoped>
.conted-radius {
    display: flex;
    align-self: center;
    gap: 10px;
}

input {
    margin: 0;
}

.conted-radius > label {
    color: #12013D;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}
</style>