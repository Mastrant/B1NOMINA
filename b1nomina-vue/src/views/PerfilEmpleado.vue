<template>
    <LayoutPanel>

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
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import PanelPerfilEmpleado from '@/components/panel/Panel-PerfilEmpleado.vue';
import axios from 'axios';

</script>