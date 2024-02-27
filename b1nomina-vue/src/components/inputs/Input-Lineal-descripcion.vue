<template>
    <div class="input-line-contend">
        <label class="input-label">
            {{Titulo}}
            <span>
                *
            </span>
        </label>
        
        <input class="input-template"
           required
           :disabled="Deshabilitar"
           :type="Tipo" 
           :placeholder="Placeholder"
           :minlength="minimoCaracteres"
           :maxlength="maximoCaracteres"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           >
    </div>        
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    
    //props de funcionamiento
    modelValue: {
        type: String,
        default: '',
    },
    //props de formato y estilos
    Placeholder : {
        type: String,
        default: 'Datos del campo',
    },
    Titulo: {
        type: String, // Corrección aquí
        default: "Titulo"
    },
    Tipo: {
        type: String, // Corrección aquí
        default: 'text'
    },
    Deshabilitar: {
        type: Boolean,
        default:false,
    },
    minimoCaracteres: {
        type: Number,
        default: 3
    },
    maximoCaracteres: {
        type: Number,
        default: 100
    }
});
</script>


<style scoped>
div.input-line-contend {
    border-bottom: 2.5px solid #000741 ;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
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
    height: 50px;
}

input.input-template:focus {
    outline: none;
}


</style>
