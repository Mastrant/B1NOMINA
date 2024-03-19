<template>
    <LayoutPanel>

        <template #cabecera>
            <Headervue nombrePagina="Empleados > Perfil del Empleado" />
        </template>
        
        <template v-slot:panel>
            
        </template>
    </LayoutPanel>
</template>

<script setup>
//componentes
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import LayoutForm from '@/components/Layouts/LayoutForm.vue'
import NavButtonPanel from '@/components/botones/Nav-button-panel.vue';
import axios from 'axios';

</script>