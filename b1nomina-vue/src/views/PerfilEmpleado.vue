<template>
    <Suspense>
        <template #default>
            <div>
                <NotFount v-show="estado == false"/>
                <LayoutPanel v-show="estado == true">
            
                    <template #cabecera>
                        <Headervue nombrePagina="Empleados > Perfil del Empleado" />
                    </template>
                    
                    <template #panel>
                        <PanelPerfilEmpleado 
                            :DatosUsuario="dataEmpleado"
                        />
                    </template>
                </LayoutPanel>
            </div>
        </template>
        <template #fallback>
            <CargandoInformaciónVue />
        </template>
      </Suspense>
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
const empleadoId = route.params.empleadoId;
const error = ref(null); // Estado para manejar errores

const resultado = ref('')

// Observa cambios en 'estado' y 'dataEmpleado'
watch(resultado, (nuevo) => {
    estado.value = nuevo.success;
    dataEmpleado.value = nuevo.data;
});

provide('dataEmpleado', dataEmpleado)

// Al montar el componente, ejecuta las funciones
onMounted(async () => {
    try {
        if (empleadoId) {
            resultado.value = await peticiones.datosDelEmpleado(empleadoId);            
        }
    } catch (error) {
        console.error("Error al solicitar datos del empleado:", error);
        error.value = error; // Actualiza el estado de error
    }
});
</script>
