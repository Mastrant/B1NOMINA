<template>
    <div class="input-line-contend">
        <label class="input-label">
            {{Titulo}}
            <span v-show="requerido">
                *
            </span>
        </label>
        
        <input class="input-template"
           :required="requerido"
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
/* uso 
    <InputLinealDescripcion 
        Tipo="" Tipo de entrada
        Titulo="" Titulo superior
        v-model="" captura del valor
        Placeholder="" Texto interno
        @update:modelValue="variable = $event" Sincronizacion entre padre/hijo
        requerido="" Si el campo es requerido o no
        :minimo-caracteres="" minimo de caracteres del campo
        :maximo-caracteres="" maximo de caracteres del campo
    />
*/
import { defineProps } from 'vue';

const props = defineProps({
    
    //props de funcionamiento
    modelValue: {
        type: [String, Number],
        default: '',
    },
    //props de formato y estilos
    Placeholder : {
        type: [String, Number],
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
        type: [Number, String],
        default: 3
    },
    maximoCaracteres: {
        type:[Number, String],
        default: 100
    },
    requerido: {
        type: Boolean,
        default: false
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
