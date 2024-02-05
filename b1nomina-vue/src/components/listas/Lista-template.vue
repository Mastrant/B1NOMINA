<template>
    <select class="lista-general" v-model="selected">

        <option disabled value=""> 
            {{optionsSelected}}
        </option>

        <!---->
        <option v-for="option in options" :key="option.id" :value="option.valor">
          {{ option.text }}
        </option>

    </select>
</template>

<script setup>
import { ref, defineProps } from 'vue';

//valores recibidos
const props = defineProps({
    //Lista de opciones
    options: {
        type: Array ,
        default: [{}]
    },
    //Titulo de la opcion
    optionsSelected: {
        type: String ,
        default: ""
    }
})

//reactividad a la opcion selecionada
const selected = ref('')

</script>

<style scoped>
select.lista-general {
    gap: 24px;
    width: fit-content;
    height: 48px;
    padding: 0px 24px;
    border-radius: 6px;
    border: 1px #363855 solid;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
    text-align: center;

    /*Estilos de fuente*/
    color: #1A245B;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

option {
    text-align: start;
}

</style>