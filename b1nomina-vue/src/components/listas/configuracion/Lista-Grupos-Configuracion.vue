<template>
    <div class="contend">
        <h3 class="subtitulo">Crea nuevos grupos en tu empresa</h3>

        <p class="descripcion">
            Si deseas tener un control más detallado de tu nómina puedes agrupar a tus empleados y asi pode asignar con mayor facilidad ciertos eventos o configuraciones.
        </p>

        <LayoutFondoBorder v-for="Departamento in ListaDepartamentos" :key="Departamento.id">
            <template #default>    
                  <FormDepartamentos :Datos="Departamento"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Grupo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormDepartamentos from '@/components/formularios/configuracion/datos-empresa/Form-Departamentos.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {ref} from 'vue';

const ListaDepartamentos = ref([
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
    box-sizing: border-box;
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