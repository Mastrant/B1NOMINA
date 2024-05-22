<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Responsable de la empresa</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre"
                Titulo="Nombre"
                name="Nombre"
                v-model="NombreResponsable"
                @update:modelValue="NombreResponsable = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Rut"
                Titulo="RUT"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"/>
            
            <InputBorderDescripcion
                Placeholder="Ingresar Email "
                Titulo="Email de contacto"
                v-model="correoResponsable"
                @update:modelValue="correoResponsable = $event"
                Tipo="email"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar Teléfono"
                Titulo="Teléfono  de contacto"
                v-model="telefonoResponsable"
                @update:modelValue="telefonoResponsable = $event"
                :requerido="RequiereActualizar"
                name="Telefono"
                Tipo="tel"
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

const IDFORM = "DatosResponsableEmpresa"

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const NombreResponsable = ref('');
const numeroDocumento = ref('');
const correoResponsable= ref('');
const telefonoResponsable = ref('');

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    responsable: "",
    rut_responsable: "",
    email_responsable: "",
    telefono_responsable: "",
});

//Contiene la información a enviar
const payload = reactive({
    responsable: "",
    rut_responsable: "",
    email_responsable: "",
    telefono_responsable: "",
});

//Escuchar cambios en las variables
watch(NombreResponsable, (nuevoValor) => ActualizarPayload('responsable', nuevoValor));
watch(numeroDocumento, (nuevoValor) => ActualizarPayload('rut_responsable', nuevoValor));
watch(correoResponsable, (nuevoValor) => ActualizarPayload('email_responsable', nuevoValor));
watch(telefonoResponsable, (nuevoValor) => ActualizarPayload('telefono_responsable', nuevoValor));

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
    console.log
}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {
    RequiereActualizar.value = false;

    NombreResponsable.value = (DATA?.responsable == null)? '' :DATA?.responsable;
    numeroDocumento.value = (DATA?.rut_responsable == null)? '' :DATA?.rut_responsable;
    correoResponsable.value = (DATA?.email_responsable == null)? '' :DATA?.email_responsable;
    telefonoResponsable.value = (DATA?.telefono_responsable == null)? '' :DATA?.telefono_responsable;


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
        const respuesta = await peticiones_configuracion_datosEmpresa?.ActualizarDatosReponsableEmpresa(
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

</style>