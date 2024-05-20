<template>
    <div class="contend">
        <h3 class="subtitulo">Crea nuevos grupos en tu empresa</h3>

        <p class="descripcion">
            Si deseas tener un control más detallado de tu nómina puedes agrupar a tus empleados y asi pode asignar con mayor facilidad ciertos eventos o configuraciones.
        </p>

        <LayoutFondoBorder v-for="Grupo in ListaGrupos" :key="Grupo.id">
            <template #default>    
                  <FormGrupo :Informacion="Grupo"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Grupo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormGrupo from '@/components/formularios/configuracion/datos-empresa/Form-Grupo.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'

const ID_Sociedad = ref(localStorage.getItem('userId'));

const ListaGrupos = ref([]);


const SolicitarListadoGrupos = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getListadoGrupos(ID_Sociedad);
    if (respuesta.success) {
        ListaGrupos.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

onMounted( async () => {
    SolicitarListadoGrupos(ID_Sociedad.value);
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