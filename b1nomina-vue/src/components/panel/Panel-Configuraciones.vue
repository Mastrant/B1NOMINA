<template>
    <div class="panel-config">
        panel con las opciones
        <CardLink />

    <AlertShort />
    </div>
</template>

<script setup>
import AlertShort from '@/components/alertas/Alert-short-template.vue';
import CardLink from '@/components/elementos/Card-Link.vue'
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-config {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}
</style>