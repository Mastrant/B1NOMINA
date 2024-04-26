<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="Empleados" />
        </template>
        
        <template v-slot:panel>
            <LayoutForm>
                <template v-slot:cabecera>
                    <NavButtonPanel text="Empleados" direccion="listar" :cantidad="datos?.empleados" :seleccionado=" $route.name === 'listar'" />
                    <NavButtonPanel text="En Contratacion" direccion="enContratacion" :cantidad="datos?.contratacion" :seleccionado="$route.name == 'enContratacion'" />
                    <NavButtonPanel text="Inactivos" direccion="inactivos" :cantidad="datos?.inactivos" :seleccionado="$route.name == 'inactivos'" />
                </template>
                <template v-slot:formulario>
                    <router-view />
                </template>
            </LayoutForm>
          </template>
    </LayoutPanel>
</template>

<script setup>
//componentes
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import LayoutForm from '@/components/Layouts/LayoutForm.vue'
import NavButtonPanel from '@/components/botones/Nav-button-panel.vue';
import almacen from '@/store/almacen.js';

import { onMounted, ref, provide, watch } from 'vue';

import { useRoute } from 'vue-router';
import peticiones from '@/peticiones/p_empleado';

// Accede a la ruta actual
const route = useRoute();

// Accede a un parámetro de la ruta, por ejemplo, 'id'
const IDsociedad = ref(Number(route.params.sociedadId));
almacen.updatedSociedadID(IDsociedad.value)

const datos = ref({})



const actualizarValoresNavegacionEmpleado = async () => {
    const respuesta = await peticiones.actualizarValoresNavegacionEmpleado(IDsociedad.value)
    if (respuesta.success){
        datos.value = respuesta.data
    } else {
        console.error(respuesta.error)
    }
}

// Utiliza provide para exponer valores a los componentes hijos
provide('IDsociedad', IDsociedad.value);
provide('ActualizarValoresNavegacion', actualizarValoresNavegacionEmpleado);

//solicita la cantidad total de elementos para el panel
onMounted(() => {

    actualizarValoresNavegacionEmpleado();
})
</script>
