<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Cuentas Contables</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta anticipo"
                name="CuentaAnticipo"
                v-model="cuentaAnticipo"
                @update:modelValue="cuentaAnticipo = $event"
                :requerido="RequiereActualizar"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta bonos feriado"
                name="CuentaBonosFeriados"
                v-model="CuentaBonosFeriados"
                @update:modelValue="CuentaBonosFeriados = $event"
                :requerido="RequiereActualizar"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta Prestamos Solidarios"
                name="CuentaPrestamoSolidarios"
                v-model="CuentaPrestamoSolidarios"
                @update:modelValue="CuentaPrestamoSolidarios = $event"
                :requerido="RequiereActualizar"
            />           
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';

import peticiones_configuracion_datosEmpresa from '@/peticiones/configuracion/datos_empresa.js';

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject} from 'vue';

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
    parametros: {
        type: Object,
        default: {}
    },
})

const ID_Sociedad = ref(inject('SociedadID'))
const ID_USERMASTER = ref(localStorage.getItem('userId'))

const IDFORM = "CuentasContables"

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const cuentaAnticipo = ref('');
const CuentaBonosFeriados = ref('');
const CuentaPrestamoSolidarios= ref('');

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({

});

//Contiene la información a enviar
const payload = reactive({

});

//Escuchar cambios en las variables
watch(cuentaAnticipo, (nuevoValor) => ActualizarPayload('', nuevoValor));
watch(CuentaBonosFeriados, (nuevoValor) => ActualizarPayload('', nuevoValor));
watch(CuentaPrestamoSolidarios, (nuevoValor) => ActualizarPayload('', nuevoValor));


//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion.Sociedad, (nuevoValor) => { 
  MostrarValores(nuevoValor) 
});



//actualizar datos del payload a enviar
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    verificarCambios();
};

// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every(key => payload_old[key] == payload[key]);

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {
    RequiereActualizar.value = false;

    cuentaAnticipo.value = (DATA?.responsable == null)? '' :DATA?.responsable;
    CuentaBonosFeriados.value = (DATA?.responsable == null)? '' :DATA?.responsable;
    CuentaPrestamoSolidarios.value = (DATA?.responsable == null)? '' :DATA?.responsable;


    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    payload_old.responsable = DATA?.responsable ?? '';
    payload.responsable = DATA?.responsable ?? '';

}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = async () => {
    //si ID es nulo crea un usuario


    if (RequiereActualizar.value == true) {        
        const respuesta = await peticiones_configuracion_datosEmpresa?.ActualizarCuentasContables(
            ID_USERMASTER.value, ID_Sociedad.value, payload
        );

        if(respuesta.success == true){
            emit('DataNotificacion', {'texto':respuesta?.data?.message, 'valor': true})
        } else {
            console.error(respuesta?.error)
            emit('DataNotificacion', {'texto': respuesta?.error, 'valor': false})
        }
    } else {
        emit('DataNotificacion', {'texto': "No se requiere actualizar", 'valor': true});
    }
};


onMounted(async () => {
  await MostrarValores(props.Informacion?.Sociedad)
});



</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

div.row {
    display: flex;
    justify-content: space-between;
    gap:12px;
}

div.espacioBoto {
    width: 100%;
}

</style>