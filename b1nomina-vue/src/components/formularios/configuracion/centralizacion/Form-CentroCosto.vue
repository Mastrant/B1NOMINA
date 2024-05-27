<template>
    <form class="formulario">
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar centro de costos"
                Titulo="Centro de costo"
                name="CentroDeCosto"
                v-model="CentroDeCosto"
                @update:modelValue="CentroDeCosto = $event"
                :requerido="RequiereActualizar"
            />
            <InputBorderDescripcion
                Placeholder="Ingresar código"
                Titulo="Código SAP "
                name="CodigoSAP"
                v-model="CodigoSAP"
                @update:modelValue="CodigoSAP = $event"
                :requerido="RequiereActualizar"
            />

            <LayoutInputBorder textLabel="Dimensión" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Dimension"
                    :options="ListaDimension"
                    :requerido="RequiereActualizar"            
                    :preseleccion="Dimension"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>
            
            <div>
                <trashIcon Stroke="#1A245B"/>    
            </div>
            
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';

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

const IDFORM = "FormCentroCostos"

const ListaDimension = []

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const CentroDeCosto = ref('');
const CodigoSAP = ref('');
const Dimension= ref('');

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({

});

//Contiene la información a enviar
const payload = reactive({

});

//Escuchar cambios en las variables
watch(CentroDeCosto, (nuevoValor) => ActualizarPayload('CentroDeCosto', nuevoValor));
watch(CodigoSAP, (nuevoValor) => ActualizarPayload('CodigoSAP', nuevoValor));
watch(Dimension, (nuevoValor) => ActualizarPayload('Dimension', nuevoValor));

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

    CentroDeCosto.value = (DATA?.responsable == null)? '' :DATA?.responsable;
    CodigoSAP.value = (DATA?.rut_responsable == null)? '' :DATA?.rut_responsable;
    Dimension.value = (DATA?.email_responsable == null)? '' :DATA?.email_responsable;

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