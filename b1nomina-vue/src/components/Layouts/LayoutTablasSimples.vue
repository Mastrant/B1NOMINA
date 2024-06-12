<template>
    <div class="conted">
        <div class="cabecera">
            <span class="titulo">{{ Titulo }}</span>    
            <slot name="boton"></slot>
        </div>
        <div class="contenido-Slot">
            <slot name="Tabla"></slot>
        </div>
        
    </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({

    Titulo: {
        type: Text,
        default: 'Texto Titulo'
    }
});
</script>

<style scoped>
div.conted {
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
}
div.cabecera {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
}

span.titulo {
    color: #1A2771;
    font-size: 22px;
    font-family: Poppins;
    font-weight: 500;
    line-height: 48px;
    word-wrap: break-word
}
</style>