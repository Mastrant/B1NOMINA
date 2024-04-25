<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                <FormDatosbasicosEmpresa 
                    :Informacion="DatosBasicos"
                    :parametros="listadoLocalidad"
                /> 
            </template>
        </LayoutFondoBorder>
        
        <LayoutFondoBorder>
            <template #default>
                <FormResponsableEmpresa
                    :Informacion="DatosBasicos"
                />  
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

const DatosBasicos = ref(
    {
        Nombre:'',
        rut: '',
        correo: '',
        ciudad: '',
        region_id: '1',
        comuna_id: '',
        direccion: '',

        NombreResponsable: '',
        RutResponsable: '',
        emailResponsable: '',
        telefonoResposnable: ''
    }
)

const listadoLocalidad = ref ({})

onMounted(() => {
    //solicitar los datos de la empresa
    DatosBasicos.value = {
        Nombre:'2call',
        rut: '',
        correo: '',
        ciudad: 'malave',
        region_id: '1',
        comuna_id: '',
        direccion: '',

        NombreResponsable: 'pepito',
        RutResponsable: '456789-j',
        emailResponsable: 'takataka@miau.net',
        telefonoResposnable: ''
    }
    //solicitar la lista de regiones y comunas
    listadoLocalidad.value = {

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