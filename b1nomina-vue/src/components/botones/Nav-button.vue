<template>
    <div class="nav-contend" :class="{'nav-contend-hoverclose': activate}">
        <slot name="direccion">

        </slot>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    activate: {
        Boolean,
        default:false,
    }
})
</script>

<style>
div.nav-contend {
    display: flex;    
    align-items: center;
    padding: 14px;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 1.1rem;
    font-size: 16px;
    gap: 6px;
    align-items: center;
}

div.nav-contend:hover {
    background-color: #1A2771;
    transition: all 0.3s ease-in-out;
}

/* Estilos internos del boton aplicados a lo que recibe */
div.nav-contend > a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 8px;
    margin: auto;
}

div.nav-contend > a > span {
    display: none;
}

.nav-contend-hoverclose {
    position: absolute;
    z-index: 500;
}

</style>