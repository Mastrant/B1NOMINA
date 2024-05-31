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
                :minimo-caracteres="0"
                 -numero-decimales="0.01"
            />
        
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Gratificación Ingreso Mínimo (%)"
                name="Gratificacion_Minimo"
                v-model="Gratificacion_Minimo"
                @update:modelValue="Gratificacion_Minimo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                 -numero-decimales="0.01"
            />
            
            <InputBorderDescripcion
                Placeholder="Ingresar tope de gratificación"
                Titulo="Tope de Gratificación (UF)"
                v-model="TopeGratificacion"
                @update:modelValue="TopeGratificacion = $event"
                Tipo="Number"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
                :minimo-caracteres="0"
                 -numero-decimales="0.01"
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
                 -numero-decimales="0.01"
                   
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Horas diarias legales"
                name="HorasDiarias"
                v-model="HorasDiarias"
                @update:modelValue="HorasDiarias = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                 -numero-decimales="0.01"
            />
            <InputBorderDescripcion
                Placeholder="0"
                Titulo="Retención de honorarios (%)"
                name="Honorarios"
                v-model="Honorarios"
                @update:modelValue="Honorarios = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                 -numero-decimales="0.01"
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
const Gratificacion_Minimo = ref('');
const TopeGratificacion = ref('');
const Vacaciones = ref('');
const HorasDiarias = ref('');
const Honorarios = ref('');


//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    sueldo_minimo: '',
    gratificacion_minimo: '',
    tope_gratificacion: '',
    dias_vacaciones: '',
    horas_legales: '',
    retencion_honorarios: '',
    sociedad_id: '',
});

//Contiene la información a enviar
const payload = reactive({
    sueldo_minimo: '',
    gratificacion_minimo: '',
    tope_gratificacion: '',
    dias_vacaciones: '',
    horas_legales: '',
    retencion_honorarios: '',
    sociedad_id: '',
});


//Escuchar cambios en las variables
watch(Sueldo, (nuevoValor) => ActualizarPayload('sueldo_minimo', nuevoValor));
watch(Gratificacion_Minimo, (nuevoValor) => ActualizarPayload('gratificacion_minimo', nuevoValor));
watch(TopeGratificacion, (nuevoValor) => ActualizarPayload('tope_gratificacion', nuevoValor));
watch(Vacaciones, (nuevoValor) => ActualizarPayload('dias_vacaciones', nuevoValor));
watch(HorasDiarias, (nuevoValor) => ActualizarPayload('horas_legales', nuevoValor));
watch(Honorarios, (nuevoValor) => ActualizarPayload('retencion_honorarios', nuevoValor));

watch(() => props.Informacion, (nuevoValor) => { 

    MostrarValores(nuevoValor?.Configuracion);
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


    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.

    Sueldo.value = (DATA?.sueldo_minimo == null)? '' :DATA?.sueldo_minimo;
    payload_old.sueldo_minimo = DATA?.sueldo_minimo ?? '';
    payload.sueldo_minimo = DATA?.sueldo_minimo ?? '';

    Gratificacion_Minimo.value = (DATA?.gratificacion_minimo == null)? '' :DATA?.gratificacion_minimo;
    payload_old.gratificacion_minimo = DATA?.gratificacion_minimo ?? '';
    payload.gratificacion_minimo = DATA?.gratificacion_minimo ?? '';

    TopeGratificacion.value = (DATA?.tope_gratificacion == null)? '' :DATA?.tope_gratificacion;
    payload_old.tope_gratificacion = DATA?.tope_gratificacion ?? '';
    payload.tope_gratificacion = DATA?.tope_gratificacion ?? '';

    Vacaciones.value = (DATA?.dias_vacaciones == null)? '' :DATA?.dias_vacaciones;
    payload_old.dias_vacaciones = DATA?.dias_vacaciones ?? '';
    payload.dias_vacaciones = DATA?.dias_vacaciones ?? '';

    HorasDiarias.value = (DATA?.horas_legales == null)? '' :DATA?.horas_legales;
    payload_old.horas_legales = DATA?.horas_legales ?? '';
    payload.horas_legales = DATA?.horas_legales ?? '';

    Honorarios.value = (DATA?.retencion_honorarios == null)? '' :DATA?.retencion_honorarios;
    payload_old.retencion_honorarios = DATA?.retencion_honorarios ?? '';
    payload.retencion_honorarios = DATA?.retencion_honorarios ?? '';

    payload_old.sociedad_id = DATA?.sociedad_id ?? ID_Sociedad.value;
    payload.sociedad_id = DATA?.sociedad_id ?? ID_Sociedad.value;

    RequiereActualizar.value = false;

}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
    

    if (RequiereActualizar.value == true) {        
        const respuesta = await peticiones_configuracion_datosEmpresa.ActualizarDatosPrevisionales(
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
    await MostrarValores(props.Informacion.Configuracion)
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