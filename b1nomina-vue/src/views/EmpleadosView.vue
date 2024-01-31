<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="Empleados" />
        </template>
        <template #panel>
            <LayoutForm>
                <template #cabecera>
                    <router-link :to="{name: 'listar'}">empleados</router-link>
                    <router-link :to="{name: 'enContratacion'}"> En Contratacion</router-link>
                </template>
                <template #formulario>
                    <router-view />
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