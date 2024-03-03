<template>
    <select :required="requerido" class="lista-general" v-model="selected">

        <option value=''> 
            {{optionsSelected}}
        </option>

        <!---->
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.nombre }}
        </option>

    </select>
</template>

<script setup>
import { ref, defineProps } from 'vue';

//valores recibidos
const props = defineProps({
    //Lista de opciones
    options: {
        default: () => [{}]
    },
    //Titulo de la opcion
    optionsSelected: {
        type: String ,
        default: 0,
    },
    requerido: {
        type: Boolean,
        default: false
    }
});

//reactividad a la opcion selecionada
const selected = ref('');

</script>

<style scoped>
select.lista-general {
    width: 100%;
    height: 44px;
    padding: 0px 16px;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    
    background: #ffffff;
    
    border-color: white;
    border-bottom: solid 3px #1A245B;
    
    outline: none;
    


    /*Estilos de fuente*/
    color: #1A245B;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

select.lista-general:focus {
    background: #ffffff;
    overflow: hidden;
    border-color:white;
    border-bottom: solid 3px #1A245B;
    outline: none;
}

select.lista-general::after {
    outline: none;
}

option {
    box-sizing: border-box;
    text-align: start;
    
}
</style>