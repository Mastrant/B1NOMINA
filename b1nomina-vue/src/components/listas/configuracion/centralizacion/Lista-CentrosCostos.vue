<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega Centro de Costo</h3>

        <p class="descripcion">
            Un centro de costos se utiliza en la contabilidad de gestión para recopilar y asignar los gastos generales.    
        </p>

        <LayoutFondoBorder v-for="Centro in ListadoCentrosCostos" :key="Centro.id">
            <template #default>    
                  <FormCentroCosto 
                    :Informacion="Centro"
                    :parametros="ListadoDimensiones"
                    @DataNotificacion="RefrescarDatos"    
                />        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton 
            text="+ Agregar Nuevo Centro de Costo"
            @click="AddCampo"
        />
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCentroCosto from '@/components/formularios/configuracion/centralizacion/Form-CentroCosto.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref, inject, onBeforeMount} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/centralizacion.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre


const ListadoCentrosCostos = ref([]);

const SolicitarListadoCentrosCostos = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getCentroDeCosto(ID_Sociedad);
    if (respuesta.success) {
        ListadoCentrosCostos.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}


const ListadoDimensiones = ref({})
const parametros = ref({})

const SolicitarParametros = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getParametrosConfiguracionGeneral(ID_Sociedad);
    if (respuesta.success) {
        parametros.value = respuesta.data;
        ListadoDimensiones.value = parametros.value?.data;

    } else {
        console.error(respuesta.error)
    }
}

const AddCampo = async () => {
    const respuesta = await peticiones_Configuracion.CreateCentroCosto(Number(ID_Sociedad.value), UserID.value);
    if (respuesta.success) {
        RefrescarDatos();
    } else {
        console.error(respuesta.error)
        MostrarMensaje({Titulo:'Error al añadir', Descripcion: respuesta.error?.data.message});
    }
}

const RefrescarDatos = (respuesta) => {
    if(respuesta?.valor == true) {
        SolicitarListadoCentrosCostos(ID_Sociedad.value);
        MostrarMensaje({Titulo:'Datos Actualizados', Descripcion: respuesta.texto});
    } else {
        MostrarMensaje({Titulo:'Error al actualizar', Descripcion: respuesta.texto});
    }
}

onBeforeMount(() => {
    SolicitarListadoCentrosCostos(ID_Sociedad.value);
    SolicitarParametros(ID_Sociedad.value);
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