<template>
    <div>

        <AddUserEnContratacion  v-show="show"/>
        <EnContratacion />
    </div>
</template>

<script setup>
import AddUserEnContratacion from '@/components/Add-User-enContratacion.vue'
import EnContratacion from '@/components/tablas/Empleados/EnContratacion.vue'
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>

</style>