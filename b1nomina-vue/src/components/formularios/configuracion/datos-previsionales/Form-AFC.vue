<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Seguro de Cesantía (AFC)</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Seguro AFC Empresa (%)"
                name="Seguro AFC"
                v-model="SeguroAFCEmpresa"
                Tipo="Number"
                @update:modelValue="SeguroAFCEmpresa = $event"
                :requerido="RequiereActualizar"
                minimo-caracteres="0"
                -numero-decimales="0.01"
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Seguro AFC Empleado (%) "
                name="SeguroAFCEmpleado"
                v-model="SeguroAFCEmpleado"
                Tipo="Number"
                @update:modelValue="SeguroAFCEmpleado = $event"
                :requerido="RequiereActualizar"
                minimo-caracteres="0"
                -numero-decimales="0.01"
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="AFC Cont. Plazo Fijo (%)"
                name="AFCPlazofijo"
                v-model="AFC_plazo_fijo"
                Tipo="Number"
                @update:modelValue="AFC_plazo_fijo = $event"
                :requerido="RequiereActualizar"
                minimo-caracteres="0"
                -numero-decimales="0.01"
            />
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="AFC 11 Años antigüedad (%)"
                name="AFC Antiguedad"
                v-model="AFC_Antiguedad"
                Tipo="Number"
                @update:modelValue="AFC_Antiguedad = $event"
                :requerido="RequiereActualizar"
                minimo-caracteres="0"
                -numero-decimales="0.01"
            />
            <InputBorderDescripcion
                Placeholder="Ingresar tope de seguro AFC"
                Titulo="Tope Seguro AFC (UF)"
                name="Tope AFC"
                v-model="UF"
                minimo-caracteres="0"
                -numero-decimales="0.01"
                Tipo="Number"
                @update:modelValue="UF = $event"
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

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject} from 'vue';

import peticiones_configuracion_datosEmpresa from '@/peticiones/configuracion/datos_empresa.js';

const ID_Sociedad = ref(inject('SociedadID'))
const ID_USERMASTER = ref(localStorage.getItem('userId'))

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

const IDFORM = "DatosAFC"

const emit = defineEmits([
    "DataNotificacion",
]);

const SeguroAFCEmpresa = ref('');
const SeguroAFCEmpleado = ref('');
const AFC_plazo_fijo = ref('');
const AFC_Antiguedad = ref('');
const UF = ref('');


//Contiene la información a enviar
const payload_old = reactive({
    sociedad_id: '',
    afc_empresa: '',
    afc_empleado: '',
    afc_plazo_fijo: '',
    afc_antiguedad: '',
    tope_seguro_afc: '',
});
//Contiene la información a enviar
const payload = reactive({
    sociedad_id: '',
    afc_empresa: '',
    afc_empleado: '',
    afc_plazo_fijo: '',
    afc_antiguedad: '',
    tope_seguro_afc: '',
});

//Escuchar cambios en las variables
watch(SeguroAFCEmpresa, (nuevoValor) => ActualizarPayload('afc_empresa', nuevoValor));
watch(SeguroAFCEmpleado, (nuevoValor) => ActualizarPayload('afc_empleado', nuevoValor));
watch(AFC_plazo_fijo, (nuevoValor) => ActualizarPayload('afc_plazo_fijo', nuevoValor));
watch(AFC_Antiguedad, (nuevoValor) => ActualizarPayload('afc_antiguedad', nuevoValor));
watch(UF, (nuevoValor) => ActualizarPayload('tope_seguro_afc', nuevoValor));

watch(() => props.Informacion, (nuevoValor) => { 
    MostrarValores(nuevoValor);
});

//control para envio de informacion
const RequiereActualizar = ref(false);

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

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.

    SeguroAFCEmpresa.value = (DATA?.afc_empresa == null)? '' :DATA?.afc_empresa;
    payload_old.afc_empresa = DATA?.afc_empresa ?? '';
    payload.afc_empresa = DATA?.afc_empresa ?? '';

    SeguroAFCEmpleado.value = (DATA?.afc_empleado == null)? '' :DATA?.afc_empleado;
    payload_old.afc_empleado = DATA?.afc_empleado ?? '';
    payload.afc_empleado = DATA?.afc_empleado ?? '';

    AFC_plazo_fijo.value = (DATA?.afc_plazo_fijo == null)? '' :DATA?.afc_plazo_fijo;
    payload_old.afc_plazo_fijo = DATA?.afc_plazo_fijo ?? '';
    payload.afc_plazo_fijo = DATA?.afc_plazo_fijo ?? '';

    AFC_Antiguedad.value = (DATA?.afc_antiguedad == null)? '' :DATA?.afc_antiguedad;
    payload_old.afc_antiguedad = DATA?.afc_antiguedad ?? '';
    payload.afc_antiguedad = DATA?.afc_antiguedad ?? '';

    UF.value = (DATA?.tope_seguro_afc == null)? '' :DATA?.tope_seguro_afc;
    payload_old.tope_seguro_afc = DATA?.tope_seguro_afc ?? '';
    payload.tope_seguro_afc = DATA?.tope_seguro_afc ?? '';

    payload_old.sociedad_id = DATA?.sociedad_id ?? ID_Sociedad.value;
    payload.sociedad_id = DATA?.sociedad_id ?? ID_Sociedad.value;
}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
    

    if (RequiereActualizar.value == true) {        
        const respuesta = await peticiones_configuracion_datosEmpresa.ActualizarDatosAFC(
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
    await MostrarValores(props.Informacion)
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