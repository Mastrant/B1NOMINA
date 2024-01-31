<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="Empleados" />
        </template>
        <template #panel>
            <LayoutForm>
                <template #cabecera>
                    <router-link to="empleados">empleaddos</router-link>
                    <router-link to="enContratacion">enContratacion</router-link>
                </template>
                <template #formulario>
                    <router-view name="EMPLEADOS"/>
                </template>
            </LayoutForm>
        </template>
    </LayoutPanel>
</template>

<script>
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import LayoutForm from '@/components/Layouts/LayoutForm.vue'


export default {
    name: 'empleados',
    components: {
        Headervue,
        LayoutPanel,
        LayoutForm,
    },
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>