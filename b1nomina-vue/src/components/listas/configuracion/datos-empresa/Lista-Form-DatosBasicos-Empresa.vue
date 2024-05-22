<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                <FormDatosbasicosEmpresa 
                    :parametros="listadoLocalidad"
                    :Informacion="DatosBasicosEmpresa"                    
                    @DataNotificacion="RefrescarDatos()"
                    
                /> 
            </template>
        </LayoutFondoBorder>
        
        <LayoutFondoBorder>
            <template #default>
                <FormResponsableEmpresa
                    :Informacion="DatosResponsableEmpresa"
                    @DataNotificacion="RefrescarDatos()"
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
 import {onMounted, ref, inject} from 'vue';

import peticiones from '@/peticiones/p_empleado';
import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'


const ID_Sociedad = ref(inject('SociedadID'))

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre

const listadoLocalidad = ref ({})

const DatosBasicosEmpresa = ref([])
const DatosResponsableEmpresa = ref([])

const pedirListadoLocalidad = async () => {
    const respuesta = await peticiones.ListadoRegiones();
    if (respuesta.success) {
        listadoLocalidad.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const SolicitarDatosBasicosEmpresa = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getDatosBasicosEmpresa(ID_Sociedad);
    if (respuesta.success) {
        //console.log(respuesta.data)
        DatosBasicosEmpresa.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}
const SolicitarResponsableEmpresa = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getDatosRepresentanteEmpresa(ID_Sociedad);
    if (respuesta.success) {
        DatosResponsableEmpresa.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

const RefrescarDatos = () => {
    //solicitar los datos de la empresa
    SolicitarDatosBasicosEmpresa(ID_Sociedad.value)
    SolicitarResponsableEmpresa(ID_Sociedad.value)
    //solicitar la lista de regiones y comunas
    pedirListadoLocalidad();
    MostrarMensaje({Titulo:'Datos Actualizados',Descripcion:'Se han actualizado los datos correctamente.'});
}

onMounted(() => {
    //solicitar los datos de la empresa
    SolicitarDatosBasicosEmpresa(ID_Sociedad.value)
    SolicitarResponsableEmpresa(ID_Sociedad.value)
    //solicitar la lista de regiones y comunas
    pedirListadoLocalidad();

});
</script>

<style scoped>
.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
}
</style>