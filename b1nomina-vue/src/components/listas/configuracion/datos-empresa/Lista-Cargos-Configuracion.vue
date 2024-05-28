<template>
    <div class="contend">
        <h3 class="subtitulo">
            Asigna los cargos en tu empresa
        </h3>

        <p class="descripcion">
            Crea los cargos de tu empresa, para poder asociar a los empleados y poder tener así más información y control.
        </p>

        <LayoutFondoBorder v-for="cargo in ListaCargos" :key="cargo.id">
            <template #default>    
                <FormCargos 
                    :Informacion="cargo"
                    @DataNotificacion="RefrescarDatos()"
                />        
            </template>
        </LayoutFondoBorder>

        <TemplateBlankButton text="+ Agregar Nuevo Cargo"  @click="AddCampo"/>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormCargos from '@/components/formularios/configuracion/datos-empresa/Form-Cargo.vue'
import TemplateBlankButton from '@/components/botones/Template-blank-button.vue';

import {onMounted, ref, inject} from 'vue';


import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre

const ListaCargos = ref([]);

const SolicitarListadoCargos = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getListadoCargos(ID_Sociedad);
    if (respuesta.success) {
        ListaCargos.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const AddCampo = async () => {
    const respuesta = await peticiones_Configuracion.CreateCargo(Number(UserID.value));
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
    SolicitarListadoCargos(ID_Sociedad.value);
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