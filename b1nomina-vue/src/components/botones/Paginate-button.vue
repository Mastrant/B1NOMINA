<template>
    <button class="page-item">
        <!--si la variable texto esta vacia muestra el elemento enviado-->
        <slot name="icono" v-if="texto == ''">

        </slot>
        <!--Si la variable Texto no esta vacia, muestra el texto-->
        <span class="page-link" v-else >
            {{ texto }}
        </span>
    </button>
</template>

<script setup>
//importa la libreria para recibir datos
import { defineProps } from 'vue';

//recive un texto y lo almacena en la variable texto
const props = defineProps({
    texto: {
        default: ""
    },
});
</script>

<style scoped>

/**estilos del boton */
button.page-item {
    padding: 2px; 
    border-radius: 6px; 
    border: 0.50px #1A2771 solid; 
    justify-content: center; 
    align-items: center; 
    gap: 10px; 
    display: inline-flex;
    background: none;

    width: 36px;
    height: 36px;
    box-sizing: border-box;
}

/**estilo al posicionar el mouse */
button.page-item:hover {

    border: 1px #1A2771 solid; 
    background: #53597e;
}

/**Estilos texto interno */
.page-link {
    color: #1A245B;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    background: none;
}

/**Estilo de la fuente al posicionar el mouse */
button.page-item:hover .page-link {
    color: #F8F8F8;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

</style>

