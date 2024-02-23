<template>
    <div class="input-line-contend">
        <label class="input-label">
            {{Titulo}}
            <span>
                *
            </span>
        </label>
        
        <input
           required
           :type="Tipo" 
           :placeholder="Placeholder"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="input-template"
        >
    </div>        
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Placeholder : {
        type: String,
        default: 'Datos del campo',
    },
    modelValue: {
        type: String,
        default: '',
    },
    Titulo: {
        String,
        default: "Titulo"
    },
    Tipo: {
        String,
        default: 'text'
    }
});

</script>

<style scoped>
div.input-line-contend {
    border-bottom: 2.5px solid #000741 ;
    display: flex;
    flex-direction: column;
    max-width: 351px;
    box-sizing: border-box;
    width: 48%;
    max-height: 66px;
    align-self: center;
}

label.input-label {
    font-size: 13px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
    color: #888888
    
}
label.input-label span{
    color: #E32A40;
    font-size: 13px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
}

input.input-template {
    margin-top: 8px;
    color: #1A245B; 
    font-size: 18px;
    border: none;

    height: fit-content;
}

input.input-template:focus {
    outline: none;
}


</style>
