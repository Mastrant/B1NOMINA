<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                
                <FormActivacionCampoVue
                    Titulo="Centralización por centro de costos"
                    descripcion="Permite agrupar y centralizar datos específicos de tu centro de costos."
                    :Informacion="CentroDecCosto"
                    @DataNotificacion="RefrescarDatos()"
                />
                                
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>
                <FormActivacionCampoVue
                    Titulo="Préstamo solidario sobre el Imponible (Activo) / Tributable (Inactivo )"
                    descripcion="Permite configurar cómo se declara el préstamo polidario"
                    :Informacion="PrestamoSolidario"
                    @DataNotificacion="RefrescarDatos()"
                />
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>
                <FormCuentasContables 
                    :Informacion="CuentasContables"
                    @DataNotificacion="RefrescarDatos()"
                />
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormActivacionCampoVue from '@/components/formularios/configuracion/centralizacion/Form-ActivacionCampo.vue';
import FormCuentasContables from '@/components/formularios/configuracion/centralizacion/Form-CuentasContables.vue'

import {onMounted, ref, inject} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/centralizacion.js'

const ID_Sociedad = ref(inject('SociedadID'))
const UserID = ref(localStorage.getItem('userId'));

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre

const CentroDecCosto = ref('')
const PrestamoSolidario = ref('')
const CuentasContables = ref('')
const ListadoDimensiones = ref({})

const SolicitarSolicitarCentroDeCosto = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getCentroDeCosto(ID_Sociedad);
    if (respuesta.success) {
        CentroDecCosto.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}
const SolicitarPrestamoSolidario = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getPrestamoSolidario(ID_Sociedad);
    if (respuesta.success) {
        PrestamoSolidario.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}
const SolicitarCuentasContables = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getCuentasContables(ID_Sociedad);
    if (respuesta.success) {
        CuentasContables.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const RefrescarDatos = () => {
    SolicitarSolicitarCentroDeCosto(ID_Sociedad.value);
    SolicitarPrestamoSolidario(ID_Sociedad.value);
    SolicitarCuentasContables(ID_Sociedad.value);
    MostrarMensaje(
        {Titulo:'Datos Actualizados', Descripcion:'Se han actualizado los datos correctamente.'}
    );
}

onMounted( async () => {
    SolicitarSolicitarCentroDeCosto(ID_Sociedad.value);
    SolicitarPrestamoSolidario(ID_Sociedad.value);
    SolicitarCuentasContables(ID_Sociedad.value);
});
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}
</style>