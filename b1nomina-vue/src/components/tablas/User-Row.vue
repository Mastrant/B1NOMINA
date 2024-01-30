<template>
    <tr>
        <th class="columna-datos">
            <input type="checkbox">
        </th>
        <th class="columna-datos">
            <span>Nombre del Empleado</span>
        </th>
        <th class="columna-datos">
            <span>Monto Salario Base</span>
        </th>
        <th class="columna-datos">
            <span>Monto Asignaciones</span>
            <button type="button"></button>
        </th>
        <th class="columna-datos">
            <span>Monto Asignaciones</span>
            <button type="button"></button>
        </th>
        <th class="columna-datos">
            <span>Monto Asignaciones</span>
        </th>
        <th class="columna-datos">
            acciones
        </th>
    </tr>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(

);

</script>

<style scoped>

.tr > th.columna-datos {
    color: #667085;
    font-size: 11.5px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 17.31px;
    word-wrap: break-word
}

</style>