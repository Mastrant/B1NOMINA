<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                
                <FormDatosbasicosEmpresa />
                                
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>
                <FormResponsableEmpresa />       
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormDatosbasicosEmpresa from '@/components/formularios/configuracion/datos-empresa/Form-DatosBasicos-Empresa.vue';
import FormResponsableEmpresa from '@/components/formularios/configuracion/datos-empresa/Form-Responsable-Empresa.vue';
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}
</style>