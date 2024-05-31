<template>
    <div class="contend">
        <h3 class="subtitulo">Campos Adicionales del Empleado</h3>

        <p class="descripcion">
            Crea hasta 5 campos personalizados para completar el perfil de tus empleados, estos campos son una opción pensada para suplir necesidades especificas de información que quieras adicionar a B1 Nómina.        
        </p>
        <LayoutFondoBorder v-for="Campo in ListaCamposAdicionales" :key="Campo.id">
            <template #default>    
                <FormCamposAdicionales 
                    :Informacion="Campo"
                    @DataNotificacion="RefrescarDatos()"
                />        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Campo" @click="AddCampo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCamposAdicionales from '@/components/formularios/configuracion/datos-empresa/Form-CamposAdicionales.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';


import {onMounted, ref, inject} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre

const ListaCamposAdicionales = ref([]);

const AddCampo = async () => {
    const respuesta = await peticiones_Configuracion.CreateCampoAdicional(ID_Sociedad.value, Number(UserID.value));
    if (respuesta.success) {
        RefrescarDatos();
    } else {
        console.error(respuesta.error)
        MostrarMensaje({Titulo:'Error al añadir',Descripcion: respuesta.error.data.message});
    }
}

const SolicitarlistaCamposAdicionales = async (IDSociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getListadoCamposAdicionales(IDSociedad);
    console.log(respuesta)
    if (respuesta.success) {
        ListaCamposAdicionales.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const RefrescarDatos = () => {
    SolicitarlistaCamposAdicionales(ID_Sociedad.value);
    MostrarMensaje({Titulo:'Datos Actualizados',Descripcion:'Se han actualizado los datos correctamente.'});
}

onMounted( () => {
    SolicitarlistaCamposAdicionales(ID_Sociedad.value);
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