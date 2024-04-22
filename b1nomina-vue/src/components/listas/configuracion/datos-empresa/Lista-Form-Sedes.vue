<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega las sedes de tu empresa</h3>

        <p class="descripcion">
            Las sedes son los lugares, ciudades o puntos de venta en donde tu empresa maneja personal y son importantes para poder segmentar mejor tu nómina a la hora de hacer los cálculos. 
        </p>

        <LayoutFondoBorder v-for="Sede in ListaSedes" :key="Sede.id">
            <template #default>    
               <FormSedes :datos="Sede" />                 
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormSedes from '@/components/formularios/configuracion/datos-empresa/Form-Sedes.vue'

import {ref} from 'vue';

const ListaSedes = ref([
    {
        id: 1
    },
    {
        id: 2
    }
]);
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}

h3.subtitulo {
font-size: 22px;
font-weight: 500;
line-height: 48px;
text-align: left;
margin:0;
}

p.descripcion {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;  
}
</style>