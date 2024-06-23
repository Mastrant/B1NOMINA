<template>
    <select :required="requerido" class="lista-general" v-model="selected">

        <option value='' v-if="optionsSelected != ''">
           {{optionsSelected}}
        </option>
        
        <option v-for="option in options" :key="option.id" :value="option.id">
           {{ option.nombre }}
        </option>

    </select>
</template>

<script setup>
import { ref, defineProps, watchEffect, watch } from 'vue';

const props = defineProps({
    options: { default: () => [{}] },

    preseleccion:{
        type: [Number, String]
    },

    optionsSelected: { 
        type: String, 
        default: '' 
    },
    
    requerido: { type: Boolean, default: false }
});

const selected = ref('');

// Utiliza watchEffect para establecer el valor inicial de selected
watchEffect(() => {

    if(props.preseleccion) {
        // Busca en options el elemento cuyo id coincida con preseleccion
        const optionPreseleccionada = props.options.find(option => option.id == props.preseleccion);
        
        // Si se encuentra una opción preseleccionada, establece selected al id de esa opción
        if (optionPreseleccionada) {
            selected.value = optionPreseleccionada.id;
        } else if (props.options.length > 0) {
            // Si no hay una opción preseleccionada pero hay opciones disponibles, establece selected al primer id del arreglo
            selected.value = props.options[0].id;
        }
    } else {
        if (props.optionsSelected == '' && props.options.length > 0) {
        selected.value = props.options[0].id; // Establece el valor inicial al primer id del arreglo
    }
    }
    
});


</script>

<style scoped>
select.lista-general {
    gap: 24px;
    width: fit-content;
    height: 48px;
    padding: 0px 16px;
    border-radius: 6px;
    border: 1px #363855 solid;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;

    /*Estilos de fuente*/
    color: #1A245B;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

select.lista-general:focus {
    border-radius: 6px;
}

option {
    text-align: start;
}

</style>