<template>
    <div class="conted">
        <LayoutTablasSimples Titulo="Asignación de Préstamos">
            <template #boton>
            
                boton        
                
            </template>

            <template #Tabla>
                <AsignacionesPrestamos />
            </template>
        </LayoutTablasSimples>
    </div>
</template>

<script setup>
import LayoutTablasSimples from '@/components/Layouts/LayoutTablasSimples.vue'
import AsignacionesPrestamos from '@/components/tablas/asignaciones/AsignacionesPrestamos-general.vue';
import { ref, watch } from 'vue';
import LayoutTablaDatosEmpleadoVue from '../Layouts/LayoutTabla-datosEmpleado.vue';
const variable = ref('');

</script>

<style scoped>
div.conted {
    width: 100%;
    height: 100%;
}
</style>