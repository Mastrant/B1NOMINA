<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <p>Ingrese los datos correspondientes al periodo: <span>{{Informacion?.nombre}}</span></p>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar monto"
                Titulo="UF"
                name="uf"
                v-model="monto_UF"
                @update:modelValue="monto_UF = $event"
                :requerido="RequiereActualizar"
                Tipo="Number"
                :minimoNumeros="0"
                :NumeroDecimales="0.01"

            />
            <InputBorderDescripcion
                Placeholder="Ingresar monto"
                Titulo="UTM"
                name="monto_UTM"
                v-model="monto_UTM"
                @update:modelValue="monto_UTM = $event"
                :requerido="RequiereActualizar"
                Tipo="Number"
                :minimoNumeros="0"
                :NumeroDecimales="0.01"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar monto"
                Titulo="FACTOR ACTUALIZACIÓN"
                name="factor_actualizacion"
                v-model="factor_actualizacion"
                @update:modelValue="factor_actualizacion = $event"
                :requerido="RequiereActualizar"
                Tipo="Number"
                :minimoNumeros="0"
                :NumeroDecimales="0.01"
            />

        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject} from 'vue';

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
})

const ID_Sociedad = ref(inject('SociedadID'))
const ID_USERMASTER = ref(localStorage.getItem('userId'))

const IDFORM = "EditPeriodo"

const ListaDimension = []

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const monto_UF = ref('');
const monto_UTM = ref('');
const factor_actualizacion= ref('');

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({});

//Contiene la información a enviar
const payload = reactive({});

//Escuchar cambios en las variables
watch(monto_UF, (nuevoValor) => ActualizarPayload('monto_UF', nuevoValor));
watch(monto_UTM, (nuevoValor) => ActualizarPayload('monto_UTM', nuevoValor));
watch(factor_actualizacion, (nuevoValor) => ActualizarPayload('factor_actualizacion', nuevoValor));

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

    monto_UF.value = (DATA?.responsable == null)? '' :DATA?.responsable;
    monto_UTM.value = (DATA?.rut_responsable == null)? '' :DATA?.rut_responsable;
    factor_actualizacion.value = (DATA?.email_responsable == null)? '' :DATA?.email_responsable;

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    payload_old.responsable = DATA?.responsable ?? '';
    payload.responsable = DATA?.responsable ?? '';
    
    payload_old.rut_responsable = DATA?.rut_responsable ?? '';
    payload.rut_responsable = DATA?.rut_responsable ?? '';

    payload_old.email_responsable = DATA?.email_responsable ?? '';
    payload.email_responsable = DATA?.emailResponsable ?? '';

    payload_old.telefono_responsable = DATA?.telefono_responsable ?? '';
    payload.telefono_responsable = DATA?.telefono_responsable ?? '';

}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = async () => {
    //si ID es nulo crea un usuario


    if (RequiereActualizar.value == true) {        
        const respuesta = await peticiones_configuracion_datosEmpresa?.ActualizarCentroDeCosto(
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
    gap: 12px;
    box-sizing: border-box;
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

div.espacioTrash {
    width: 100%;
    display:flex;
    justify-content: end;
}

</style>