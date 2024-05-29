<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <div class="row">
            <h4>{{Titulo}}</h4>
            <p>{{descripcion}}</p>
        </div>
        <InterruptorButton 
            Tipo="individual" 
            :Estado="EstadoCampo" 
            :Texto="(EstadoCampo)? 'Activo' : 'Inactivo'"
            @click="Enviar"
        />
    </form>
</template>

<script setup>
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

import { defineProps, ref, watch, defineEmits, onMounted, inject} from 'vue';

import peticiones_configuracion from '@/peticiones/configuracion/centralizacion.js';

const emit = defineEmits([
    "DataNotificacion",
]);


const ID_Sociedad = ref(inject('SociedadID'))
const ID_USERMASTER = ref(localStorage.getItem('userId'))

const IDFORM = "ActivacionCC"


const props = defineProps({
    Titulo: {
        String,
        default: "Titulo del campo"
    },
    descripcion: {
        String,
        default: "Descripcion del elemento."
    },
    Informacion: {
        default: {}
    }
})

const EstadoCampo = ref(true);


//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion, (nuevoValor) => { 
    MostrarValores(nuevoValor.data) 
});

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {
    EstadoCampo.value = (DATA?.usa_centros_costos == 1)? true : false;

};

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
    //si ID es nulo crea un usuario

    const respuesta = await peticiones_configuracion?.ActualizarEstadoCentroCosto(
        ID_USERMASTER.value, ID_Sociedad.value, (EstadoCampo.value == true)? 0 : 1,
    );

    if(respuesta.success == true){
        emit('DataNotificacion', {'texto':respuesta?.data?.message, 'valor': true})
    } else {
        console.error(respuesta?.error)
        emit('DataNotificacion', {'texto': respuesta?.error.data.message, 'valor': false})
    }
};



onMounted(()=> {
    MostrarValores(props.Informacion.data)
})
</script>

<style scoped>
form.formulario {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 12px;
    justify-content: space-between;
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

p {
font-size: 16px;
font-weight: 400;
line-height: 26px;
text-align: left;
color: #000000;
margin: 0;
}

div.row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap:12px;
}
</style>