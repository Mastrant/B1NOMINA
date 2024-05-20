<template>
    <div class="contend">
        <h3 class="subtitulo">Agrega las sedes de tu empresa</h3>

        <p class="descripcion">
            Las sedes son los lugares, ciudades o puntos de venta en donde tu empresa maneja personal y son importantes para poder segmentar mejor tu nómina a la hora de hacer los cálculos. 
        </p>

        <LayoutFondoBorder v-for="Sede in ListaSedes" :key="Sede.id">
            <template #default>    
               <FormSedes 
                    :Informacion="Sede"
                    :parametros="listadoLocalidad"
                    @DataNotificacion="RefrescarDatos()"
               />                 
            </template>
        </LayoutFondoBorder>

        
        <TemplateBlankButton text="+ Agregar Nueva Sede" @click="AddCampo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormSedes from '@/components/formularios/configuracion/datos-empresa/Form-Sedes.vue';
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref, inject} from 'vue';

import peticiones from '@/peticiones/p_empleado';
import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

const listadoLocalidad = ref ({})

const ListaSedes = ref([]);

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre


const AddCampo = async () => {
    const respuesta = await peticiones_Configuracion.CreateSede(Number(UserID.value));
    if (respuesta.success) {
        RefrescarDatos();
    } else {
        console.error(respuesta.error)
        MostrarMensaje({Titulo:'Error al añadir',Descripcion: respuesta.error.data.message});
    }
}

const pedirListadoLocalidad = async () => {
    const respuesta = await peticiones.ListadoRegiones(ID_Sociedad)
    if (respuesta.success) {
        listadoLocalidad.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const SolicitarListadoSedes = async () => {
    const respuesta = await peticiones_Configuracion.getListadoSedes(ID_Sociedad.value);
    if (respuesta.success) {
        ListaSedes.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const RefrescarDatos = () => {
    pedirListadoLocalidad();
    SolicitarListadoSedes();
    MostrarMensaje({Titulo:'Datos Actualizados',Descripcion:'Se han actualizado los datos correctamente.'});
}

onMounted( async () => {
    pedirListadoLocalidad();
    SolicitarListadoSedes();
});

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