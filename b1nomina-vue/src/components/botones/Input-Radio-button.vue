<template>
    <div class="conted-radius">        
        <input 
            :name="grupo"
            type="radio"
            :id="idRadius"
            :value="valor"
            :checked="valor === modelValue"
            @change="onChange"
        >
        <label :for="idRadius">{{ texto }}</label>
    </div>
</template>

<script setup>
/*uso 
    <InputRadioButton 
        v-model="variable" 
        grupo="" 
        texto="" 
        :valor="0"
        id-radius="" default: 'Radio'+valor
    />
*/
import { defineProps, defineEmits } from 'vue';

// Definición de propiedades
const props = defineProps({
    grupo: {
        type: String,
        default: "Radium"
    },
    valor: {
        type: [String,Number],
        default: 0
    },
    texto: {
        type: String,
        default: ''
    },
    modelValue: {
        default: null
    },
    idRadius: {
        type:String,
        default: 'Radio'
    }
});

// Definición de eventos
const emit = defineEmits(['update:modelValue']);

// Propiedad computada para v-model
const modelValue = props.modelValue;

// Método para manejar el cambio de valor
const onChange = () => {
    emit('update:modelValue', props.valor);
};
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