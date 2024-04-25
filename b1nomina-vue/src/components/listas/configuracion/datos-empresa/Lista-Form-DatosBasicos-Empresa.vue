<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                
                <FormDatosbasicosEmpresa 
                    :Informacion="DatosBasicos" 
                />
                                
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
 // 
import { onMounted, ref } from 'vue';

const DatosBasicos = ref({})

onMounted(() => {
    DatosBasicos.value = {
        Nombre:'2call',
        rut: '',
        correo: '',
        ciudad: 'malave',
        region_id: '1',
        comuna_id: '',
        direccion: '',

        NombreResponsable: '',
        RutResponsable: '',
        emailResponsable: '',
        telefonoResposnable: ''

    }
})
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}
</style>