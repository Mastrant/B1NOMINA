<template>
    <NotFount v-if="estado == false"/>
    <LayoutPanel v-else>

        <template #cabecera>
            <Headervue nombrePagina="Empleados > Perfil del Empleado" />
        </template>
        
        <template v-slot:panel>
            <PanelPerfilEmpleado 
                :DatosUsuario="dataEmpleado"
            />
        </template>
    </LayoutPanel>
</template>

<script setup>
//componentes
import Headervue from '@/components/Header.vue';
import NotFount from '@/components/Not-fount.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import PanelPerfilEmpleado from '@/components/panel/Panel-PerfilEmpleado.vue';

import peticiones from '@/peticiones/p_empleado';

import { useRoute } from 'vue-router';

import {onMounted, ref, watch} from 'vue'

const route = useRoute();

const estado = ref(false)
const dataEmpleado = ref(null)
const empleadoId = route.params.empleadoId;

const resultado = ref('')

const solicitarDatos = async () => {
    try {
        if (empleadoId) {
            resultado.value = await peticiones.datosDelEmpleado(empleadoId);            
        }
    } catch (error) {
        console.error("Error al solicitar datos del empleado:", error);
        // Manejar el error según sea necesario
    }
};

// Observa cambios en 'estado' y 'dataEmpleado'
watch(resultado, (nuevo) => {
    estado.value = nuevo.success;
    dataEmpleado.value = nuevo.data;
});

// Al montar el componente, ejecuta las funciones
onMounted(() => {
    solicitarDatos();
});
</script>