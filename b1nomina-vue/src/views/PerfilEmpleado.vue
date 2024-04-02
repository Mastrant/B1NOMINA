<template>
    <NotFount v-if="estado == false"/>
    <LayoutPanel v-else>

        <template #cabecera>
            <Headervue nombrePagina="Empleados > Perfil del Empleado" />
        </template>
        
        <template v-slot:panel>
            <PanelPerfilEmpleado />
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

import {onMounted, ref} from 'vue'

const route = useRoute();

const estado = ref(false)
const dataEmpleado = ref({})

 // al montar el componente ejecuta las funciones
 onMounted(
    async () => {
        estado.value, dataEmpleado.value = peticiones.datosDelEmpleado(route.params?.empleadoId);
    }        
);
</script>