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
import {onMounted, ref} from 'vue';

const ID_Sociedad = ref(inject('SociedadID'))

const DatosPrevisionales = ref([])
const DatosAFC= ref([])

const SolicitarDatosConfiPrevisionales = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getDatosPrevisionalesBasicos(ID_Sociedad);
    if (respuesta.success) {
        //console.log(respuesta.data)
        DatosPrevisionales.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}
const SolicitarDatosAFC = async (ID_Sociedad = Number) => {
    const respuesta = await peticiones_Configuracion.getDatosAFC(ID_Sociedad);
    if (respuesta.success) {
        DatosAFC.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
};

onMounted(async () => {
    SolicitarDatosConfiPrevisionales(ID_Sociedad.value)
    SolicitarDatosAFC(ID_Sociedad.value)
})
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