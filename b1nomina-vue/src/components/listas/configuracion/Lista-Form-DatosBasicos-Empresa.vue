<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                
                <FormDatosbasicosEmpresa />
                                
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>
                          
            </template>
        </LayoutFondoBorder>
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormDatosbasicosEmpresa from '@/components/formularios/configuracion/datos-empresa/Form-DatosBasicos-Empresa.vue';
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;

}
</style>