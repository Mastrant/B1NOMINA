<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>    
                <FormDatosBasicosPrevisionales 
                    :Informacion="DatosPrevisionales"                    
                    @DataNotificacion="RefrescarDatos()"
                />
            </template>
        </LayoutFondoBorder>
        <LayoutFondoBorder>
            <template #default>    
                <FormAFC     
                    :Informacion="DatosAFC"                    
                    @DataNotificacion="RefrescarDatos()"
                />
            </template>
        </LayoutFondoBorder>

    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import FormDatosBasicosPrevisionales from '@/components/formularios/configuracion/datos-previsionales/Form-DatosBasicos-previsionales.vue'
import FormAFC from '@/components/formularios/configuracion/datos-previsionales/Form-AFC.vue';
import {onMounted, ref, inject} from 'vue';

import peticiones_Configuracion from '@/peticiones/configuracion/datos_empresa.js'

const ID_Sociedad = ref(inject('SociedadID'))
const DatosPrevisionales = ref([])
const DatosAFC= ref([])

// Accede a la función proporcionada por el componente padre
const MostrarMensaje = inject('showNotificacionShort'); // Inyecta una función del componente padre
// Llama a la función para enviar información al componente padre


const SolicitarDatosConfiPrevisionales = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getDatosPrevisionalesBasicos(ID_Sociedad);
    if (respuesta.success) {
        DatosPrevisionales.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}
const SolicitarDatosAFC = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getDatosAFC(ID_Sociedad);
    if (respuesta.success) {
        DatosAFC.value = respuesta.data?.data;
    } else {
        console.error(respuesta.error)
    }
};

const RefrescarDatos = async () => {
    await SolicitarDatosConfiPrevisionales(ID_Sociedad.value);
    await SolicitarDatosConfiPrevisionales(ID_Sociedad.value)
    await SolicitarDatosAFC(ID_Sociedad.value)
    MostrarMensaje({Titulo:'Datos Actualizados',Descripcion:'Se han actualizado los datos correctamente.'});
}

onMounted(async () => {
    await SolicitarDatosConfiPrevisionales(ID_Sociedad.value)
    await SolicitarDatosAFC(ID_Sociedad.value)
});
</script>

<style scoped>

.contend {
    display:flex;
    flex-direction: column;
    padding: 0 12px;
    box-sizing: border-box;
}

h3.subtitulo {
    font-size: 22px;
    font-weight: 500;
    line-height: 48px;
    text-align: left;
    margin:0;
}

p.descripcion {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;  
}
</style>