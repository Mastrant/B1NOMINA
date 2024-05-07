<template>

    <NotFount v-if="estado == false"/>
    <LayoutPanel v-else>

        <template #cabecera>
            <Headervue nombrePagina="Empleados > Perfil del Empleado" />
        </template>
        
        <template #panel>
            <PanelPerfilEmpleado/>
        </template>
    </LayoutPanel>

</template>

<script setup>
//componentes
import Headervue from '@/components/Header.vue';
import NotFount from '@/components/Not-fount.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import PanelPerfilEmpleado from '@/components/panel/Panel-PerfilEmpleado.vue';
import CargandoInformaciónVue from '@/components/animation/Cargando-Informacion.vue';

import peticiones from '@/peticiones/p_empleado';

import { useRoute } from 'vue-router';

import {onMounted, ref, watch, provide, defineAsyncComponent } from 'vue'

const route = useRoute();

const estado = ref(false)
const dataEmpleado = ref(null)
const empleadoId = route.params?.empleadoId;

const Informacion = ref('')

// Observa cambios en 'estado' y 'dataEmpleado'
watch(Informacion, (nuevo) => {
    estado.value = nuevo.success;
    dataEmpleado.value = nuevo;
    console.log(nuevo)
});

provide('dataEmpleado', dataEmpleado)

const pedirDatos = async () => {
    try {
        if (empleadoId) {
            const resultado = await peticiones.datosDelEmpleado(empleadoId);
            console.log(resultado)
            if (resultado.success){
                Informacion.value = resultado?.data;
            } else {
                console.error(resultado.error);
            }
        }
    } catch (error) {
        console.error("Error al solicitar datos del empleado:", error);
        error.value = error; // Actualiza el estado de error
    }
}

// Al montar el componente, ejecuta las funciones
onMounted(async () => {
   await pedirDatos();
});
</script>
