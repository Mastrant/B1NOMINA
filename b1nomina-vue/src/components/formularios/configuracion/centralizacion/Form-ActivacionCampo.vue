<template>
    <form class="formulario">
        <div class="row">
            <h4>{{Titulo}}</h4>
            <p>{{descripcion}}</p>
        </div>
        <InterruptorButton Tipo="individual" :Estado="EstadoCampo" :Texto="(EstadoCampo)? 'Activo' : 'Inactivo'"/>
    </form>
</template>

<script setup>
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted} from 'vue';

const ID_USERMASTER = ref(localStorage.getItem('userId'))

const props = defineProps({
    Titulo: {
        String,
        default: "Titulo del campo"
    },
    descripcion: {
        String,
        default: "Permite agrupar y centralizar datos específicos de tu centro de costos."
    },
    Informacion: {
        default: {}
    }
})

const EstadoCampo = ref(true);

//Contiene la información a enviar
const payload = reactive({
    id:'',
    estado: "",

});

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {


    EstadoCampo.value = (DATA?.nombre == true)? false :DATA?.nombre;

// Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    payload.id = DATA?.id ?? '';

    payload.nombre = DATA?.nombre ?? '';
  
    payload.sociedad_id = DATA?.sociedad_id ?? '';
    
    payload.sede_id = DATA?.sede_id ?? '';

    payload.nivel_cargo = DATA?.nivel_cargo ?? '';

};

onMounted(()=> {
    MostrarValores(props.Informacion)
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