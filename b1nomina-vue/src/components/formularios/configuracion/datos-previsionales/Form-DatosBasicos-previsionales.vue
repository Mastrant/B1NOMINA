<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Configuraciones Básicas</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar valor de salario mínimo actual"
                Titulo="Sueldo Mínimo ($)"
                name="Sueldo"
                v-model="Sueldo"
                @update:modelValue="Sueldo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="1"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Gratificación Ingreso Mínimo (%) *"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            
            <InputBorderDescripcion
                Placeholder="Ingresar tope de gratificación"
                Titulo="Tope de Gratificación (UF)"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="Number"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Días de Vacaciones por año"
                name="Vacaciones"
                v-model="Vacaciones"
                @update:modelValue="Vacaciones = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Horas diarias legales"
                name="HorasDiarias"
                v-model="HorasDiarias"
                @update:modelValue="HorasDiarias = $event"
                :requerido="RequiereActualizar"
                Tipo="number"    
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Retención de honorarios (%)"
                name="Honorarios"
                v-model="Honorarios"
                @update:modelValue="Honorarios = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
                Tipo="number"    
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

const IDFORM = "DatosPrevisionales"

const emit = defineEmits([
    "DataNotificacion",
]);

const Sueldo = ref('');
const Gratificacion = ref('');
const correoEmpresa = ref('');
const Vacaciones = ref('');
const HorasDiarias = ref('');
const Honorarios = ref('');


//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({});

//Contiene la información a enviar
const payload = reactive({});


//Escuchar cambios en las variables
watch(Sueldo, (nuevoValor) => ActualizarPayload('', nuevoValor));
watch(Gratificacion, (nuevoValor) => ActualizarPayload('', nuevoValor?.toUpperCase()));
watch(correoEmpresa, (nuevoValor) => ActualizarPayload('', nuevoValor?.toUpperCase()));
watch(Vacaciones, (nuevoValor) => ActualizarPayload('', nuevoValor?.toUpperCase()));
watch(HorasDiarias, (nuevoValor) => ActualizarPayload('', nuevoValor?.toUpperCase()));
watch(Honorarios, (nuevoValor) => ActualizarPayload('', nuevoValor?.toUpperCase()));


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
    Sueldo.value = (DATA?.nombre == null)? '' :DATA?.nombre;
    Gratificacion.value = (DATA?.nombre == null)? '' :DATA?.nombre;
    correoEmpresa.value = (DATA?.nombre == null)? '' :DATA?.nombre;
    Vacaciones.value = (DATA?.nombre == null)? '' :DATA?.nombre;
    HorasDiarias.value = (DATA?.nombre == null)? '' :DATA?.nombre;
    Honorarios.value = (DATA?.nombre == null)? '' :DATA?.nombre;

    payload_old.sociedad_id = DATA?.id ?? '';
    payload.sociedad_id = DATA?.id ?? '';

    payload_old.sede_id = DATA?.id ?? '';
    payload.sede_id = DATA?.id ?? '';

}


/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
    

    if (RequiereActualizar.value == true) {        
        const respuesta = await peticiones_configuracion_datosEmpresa.ActualizarDatosBasicosEmpresa(
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