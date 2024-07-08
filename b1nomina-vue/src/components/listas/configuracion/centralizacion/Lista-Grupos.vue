<template>
    <div class="contend">
        <h3 class="subtitulo">Grupos Centralización</h3>

        <p class="descripcion">
            En esta sección puede configurar las cuentas contables de tu grupo de empleados.
        </p>

        <LayoutFondoBorder v-for="Grupo in ListaGruposCentralizacion" :key="Grupo.id">            
            <template #default>   
                <FormGrupoCentralizacion 
                    :Informacion="Grupo"
                
                />
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormGrupoCentralizacion from '@/components/formularios/configuracion/centralizacion/Form-GruposCentralizacion.vue'

import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref, inject} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/centralizacion.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre



const ListaGruposCentralizacion = ref([]);

const SolicitarListadoCentrosCostos = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getCentralizacion(ID_Sociedad);
    console.log(respuesta)
    if (respuesta.success) {
        ListaGruposCentralizacion.value = respuesta.data.data;
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