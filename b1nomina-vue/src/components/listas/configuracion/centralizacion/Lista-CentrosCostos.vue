<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega Centro de Costo</h3>

        <p class="descripcion">
            Un centro de costos se utiliza en la contabilidad de gestión para recopilar y asignar los gastos generales.    
        </p>

        <LayoutFondoBorder v-for="Centro in ListadoCentrosCostos" :key="Centro.id">
            <template #default>    
                  <FormCentroCosto :Informacion="Centro"/>        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Centro de Costo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCentroCosto from '@/components/formularios/configuracion/centralizacion/Form-CentroCosto.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref, inject} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/centralizacion.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre


const ListadoCentrosCostos = ref([
    {
        id: 1
    },
    {
        id: 2
    }
]);

const SolicitarListadoCentrosCostos = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getCentralizacion(ID_Sociedad);
    console.log(respuesta)
    if (respuesta.success) {
        ListaCargos.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const AddCampo = async () => {
    const respuesta = await peticiones_Configuracion.CreateCentroCosto(Number(UserID.value));
    if (respuesta.success) {
        RefrescarDatos();
    } else {
        console.error(respuesta.error)
        MostrarMensaje({Titulo:'Error al añadir',Descripcion: respuesta.error.data.message});
    }
}

const RefrescarDatos = () => {
    SolicitarListadoCargos(ID_Sociedad.value);
    MostrarMensaje({Titulo:'Datos Actualizados', Descripcion:'Se han actualizado los datos correctamente.'});
}

onMounted(() => {
    SolicitarListadoCentrosCostos(ID_Sociedad.value);
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