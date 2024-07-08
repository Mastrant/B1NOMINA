<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                
                <FormActivacionCC
                    Titulo="Centralización por centro de costos"
                    descripcion="Permite agrupar y centralizar datos específicos de tu centro de costos."
                    :Informacion="DatosConfiguracion"
                    @DataNotificacion="RefrescarDatos"
                />
                                
            </template>
        </LayoutFondoBorder>

        <LayoutFondoBorder>
            <template #default>
                <FormActivacionPS
                    Titulo="Préstamo solidario sobre el Imponible (Activo) / Tributable (Inactivo )"
                    descripcion="Permite configurar cómo se declara el préstamo polidario"
                    :Informacion="DatosConfiguracion"
                    @DataNotificacion="RefrescarDatos"
                />
            </template>
        </LayoutFondoBorder>

        <LayoutFondoBorder>
            <template #default>
                <FormCuentasContables 
                    :Informacion="DatosConfiguracion"
                    @DataNotificacion="RefrescarDatos"
                />
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormActivacionCC from '@/components/formularios/configuracion/centralizacion/Form-ActivacionCentrosCostos.vue';
import FormActivacionPS from '@/components/formularios/configuracion/centralizacion/Form-ActivacionPrestamoSolidario.vue';
import FormCuentasContables from '@/components/formularios/configuracion/centralizacion/Form-CuentasContables.vue'

import {onMounted, ref, inject} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/centralizacion.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre

const DatosConfiguracion = ref({})
const ListadoDimensiones = ref({})

const SolicitarConfiguracionGeneral = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getConfiguracionGeneral(ID_Sociedad);
    if (respuesta.success) {
        DatosConfiguracion.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const RefrescarDatos = (respuesta) => {
    if(respuesta?.valor == true) {
        SolicitarConfiguracionGeneral(ID_Sociedad.value);
        MostrarMensaje({Titulo:'Datos Actualizados', Descripcion: respuesta.texto});
    } else {
        MostrarMensaje({Titulo:'Error al actualizar', Descripcion: respuesta.texto});
    }
    
}

onMounted( async () => {
    SolicitarConfiguracionGeneral(ID_Sociedad.value);

});
</script>

<style scoped>
    .contend {
        display:flex;
        flex-direction: column;
        padding: 0 12px;
    }
</style>