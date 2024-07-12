<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <div class="row">           

            <InputBorderList
                Placeholder="Ingresar centro de costos"
                Titulo="Centro de costo"
                name="CentroDeCosto"
                v-model="CentroDeCosto"
                @update:modelValue="CentroDeCosto = $event"
                :requerido="RequiereActualizar"
                :opciones="[]"
                ParametroFiltro="id"
                id_list="listadoCC"

            /> 
            
            <InputBorderList
                Placeholder="Ingresar código"
                Titulo="Código SAP"
                name="CodigoSAP"
                v-model="CodigoSAP"
                @update:modelValue="CodigoSAP = $event"
                :requerido="RequiereActualizar"
                :opciones="parametros?.SAP_codigo"
                ParametroFiltro="id"
                id_list="listadoSAP"
            /> 

            <LayoutInputBorder textLabel="Dimensión" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Dimension"
                    :options="parametros?.dimensiones"
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
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>

    </form>
</template>

<script setup>
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';
import InputBorderList from '@/components/inputs/Input-Border-List.vue';

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

const IDFORM = "FormCentroCostos"

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs
const ID_Elemento = ref('0000')
const CentroDeCosto = ref('');
const CodigoSAP = ref('');
const Dimension= ref('');

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({});

//Contiene la información a enviar
const payload = reactive({});

//Escuchar cambios en las variables
watch(CentroDeCosto, (nuevoValor) => ActualizarPayload('centro_costo', nuevoValor));
watch(CodigoSAP, (nuevoValor) => ActualizarPayload('codigo_sap', nuevoValor));
watch(Dimension, (nuevoValor) => ActualizarPayload('dimension_id', nuevoValor));

//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion, (nuevoValor) => { 
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

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales);
}

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {
    console.log(DATA)

    ID_Elemento.value = (DATA?.id == null)? '' :DATA?.id
    CentroDeCosto.value = (DATA?.centro_costo == null)? '' :DATA?.centro_costo;
    CodigoSAP.value = (DATA?.codigo_sap == null)? '' :DATA?.codigo_sap;
    Dimension.value = (DATA?.dimension_id == null)? '' :DATA?.dimension_id;

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    payload_old.centro_costo = DATA?.centro_costo ?? '';
    payload.centro_costo = DATA?.centro_costo ?? '';
    
    payload_old.codigo_sap = DATA?.codigo_sap ?? '';
    payload.codigo_sap = DATA?.codigo_sap ?? '';

    payload_old.dimension_id = DATA?.dimension_id ?? '';
    payload.dimension_id = DATA?.dimension_id ?? '';

    payload_old.sociedad_id = DATA?.sociedad_id ?? '';
    payload.sociedad_id = DATA?.sociedad_id ?? '';

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
        const respuesta = await peticiones_configuracion?.ActualizarCentroDeCosto(
            ID_USERMASTER.value, ID_Elemento.value, payload
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