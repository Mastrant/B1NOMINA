<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Cuentas Contables</h4>
        <div class="row">
            <InputBorderList
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta anticipo"
                name="CuentaAnticipo"
                v-model="cuentaAnticipo"
                @update:modelValue="cuentaAnticipo = $event"
                :requerido="RequiereActualizar"
                :opciones="[{id:1, nombre:'opcion'}]"
            />
        
            <InputBorderList
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta bonos feriado"
                name="CuentaBonosFeriados"
                v-model="CuentaBonosFeriados"
                @update:modelValue="CuentaBonosFeriados = $event"
                :requerido="RequiereActualizar"
                :opciones="[{id:1, nombre:'predro'}]"
            />

            <InputBorderList
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta Prestamos Solidarios"
                name="CuentaPrestamoSolidarios"
                v-model="CuentaPrestamoSolidarios"
                @update:modelValue="CuentaPrestamoSolidarios = $event"
                :requerido="RequiereActualizar"
                :opciones="[{id:1, nombre:'predro'},{id:2, nombre:'praedro'}]"
            />           
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderList from '@/components/inputs/Input-Border-List.vue';
import TemplateButton from '@/components/botones/Template-button.vue';

import peticiones_configuracion from '@/peticiones/configuracion/centralizacion.js';

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
watch(cuentaAnticipo, (nuevoValor) => ActualizarPayload('cuenta_anticipo', nuevoValor));
watch(CuentaBonosFeriados, (nuevoValor) => ActualizarPayload('cuenta_bonos_feriado', nuevoValor));
watch(CuentaPrestamoSolidarios, (nuevoValor) => ActualizarPayload('cuenta_prestamos_solidarios', nuevoValor));


//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion, (nuevoValor) => { 
  MostrarValores(nuevoValor.data) 
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

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales);
}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {



    cuentaAnticipo.value = (DATA?.cuenta_anticipo == null)? '' :DATA?.cuenta_anticipo;
    CuentaBonosFeriados.value = (DATA?.cuenta_bonos_feriado == null)? '' :DATA?.cuenta_bonos_feriado;
    CuentaPrestamoSolidarios.value = (DATA?.cuenta_prestamos_solidarios == null)? '' :DATA?.cuenta_prestamos_solidarios;


    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    payload_old.cuenta_anticipo = DATA?.cuenta_anticipo ?? '';
    payload.cuenta_anticipo = DATA?.cuenta_anticipo ?? '';

    payload_old.cuenta_bonos_feriado = DATA?.cuenta_bonos_feriado ?? '';
    payload.cuenta_bonos_feriado = DATA?.cuenta_bonos_feriado ?? '';

    payload_old.cuenta_prestamos_solidarios = DATA?.cuenta_prestamos_solidarios ?? '';
    payload.cuenta_prestamos_solidarios = DATA?.cuenta_prestamos_solidarios ?? '';

    payload_old.sociedad_id = DATA?.sociedad_id ?? ID_Sociedad.value;
    payload.sociedad_id = DATA?.sociedad_id ?? ID_Sociedad.value;

    payload_old.cuenta_anticipo = DATA?.cuenta_anticipo ?? '';
    payload.cuenta_anticipo = DATA?.cuenta_anticipo ?? '';
    
    // Esto forma parte del esquema de datos del payload, pero no se maneja desde acá solo se utiliza la informacion del props
    
    payload_old.cuenta_honorarios = DATA?.cuenta_honorarios ?? '';
    payload.cuenta_honorarios = DATA?.cuenta_honorarios ?? '';
    
    payload_old.usa_centros_costos = DATA?.usa_centros_costos ?? '';
    payload.usa_centros_costos = DATA?.usa_centros_costos ?? '';
    
    payload_old.usa_centros_costos = DATA?.usa_centros_costos ?? 0;
    payload.usa_centros_costos = DATA?.usa_centros_costos ?? 0;
    
    payload_old.prestamo_solidario_imponible = DATA?.prestamo_solidario_imponible ?? 0;
    payload.prestamo_solidario_imponible = DATA?.prestamo_solidario_imponible ?? 0;

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
        const respuesta = await peticiones_configuracion?.ActualizarCuentasContables(
            ID_USERMASTER.value, ID_Sociedad.value, payload
        );

        if(respuesta.success == true){
            emit('DataNotificacion', {'texto':respuesta?.data?.message, 'valor': true})
        } else {
            console.error(respuesta?.error)
            emit('DataNotificacion', {'texto': respuesta?.error.data.message, 'valor': false})
        }
    } else {
        emit('DataNotificacion', {'texto': "No se requiere actualizar", 'valor': true});
    }
};


onMounted(async () => {
  await MostrarValores(props.Informacion?.data)
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