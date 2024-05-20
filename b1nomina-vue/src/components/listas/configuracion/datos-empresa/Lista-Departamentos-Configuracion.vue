<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega los departamentos de tu empresa</h3>

        <p class="descripcion">
            Crea los departamentos que maneja internamente tu empresa para poder asociar a los empleados y tener así más información y control sobre los mismos.
        </p>

        <LayoutFondoBorder v-for="Departamento in ListaDepartamentos" :key="Departamento.id">
            <template #default>    
                  <FormDepartamentos :Informacion="Departamento"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Departamento"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormDepartamentos from '@/components/formularios/configuracion/datos-empresa/Form-Departamentos.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'


const ID_Sociedad = ref(localStorage.getItem('userId'));

const ListaDepartamentos = ref([]);

const SolicitarListadoDepartamentos = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getListadoDepartamentos(ID_Sociedad);
    if (respuesta.success) {
        ListaDepartamentos.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

onMounted( async () => {
    SolicitarListadoDepartamentos(ID_Sociedad.value);
});
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