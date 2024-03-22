<template>
    <div class="panel-PerfilEmpleado">
        <LayoutCabeceraEmpleado>
            <template #Rol>
                admini                
            </template>
            <template #Nombre>
                Ombre del empleado
            </template>
            <template #Cargo>
                admini                
            </template>
        </LayoutCabeceraEmpleado>

        <div>
            cartica 1
        </div>
        <div>
            paginación
        </div>
    </div>
</template>

<script setup>
import LayoutCabeceraEmpleado from '@/components/Layouts/LayoutCabeceraEmpleado.vue'
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-PerfilEmpleado {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}
</style>