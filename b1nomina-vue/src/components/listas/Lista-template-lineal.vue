<template>
    <div class="contend-select">
        <p>
            {{textLabel}}
            <span>*</span>
        </p>
        <select class="lista-general" v-model="selected">        
            <option value=''> 
                {{optionsSelected}}
            </option>

            <!---->
            <option v-for="option in options" :key="option.id" :value="option.id">
            {{ option.nombre }}
            </option>

        </select>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

//valores recibidos
const props = defineProps({
    //Lista de opciones
    /**
     * id: Number 
     * nombre: String
     */
    options: {
        type: Array,
        default: () => []
    },
    //Titulo de la opcion
    optionsSelected: {
        type: String ,
        default: "Ingrese Valor",
    },
    textLabel: {
        type: String,
        default: "titulo",
    }

});

//reactividad a la opcion selecionada
const selected = ref('');

</script>

<style scoped>

div.contend-select {
    display: flex;
    flex-direction: column;
    width: 48%;
    gap: 1px;
}
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
    overflow: hidden;
    border-color:white;
    border-bottom: 2.5px solid #1A245B;


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
    border-bottom: 2.5px solid #1A245B;
    outline: none;
}
option {
    box-sizing: border-box;
    text-align: start;
    
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