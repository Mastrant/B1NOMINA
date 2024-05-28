<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <TemplateModal 
            @closeModal="showModal(false)" 
            :FormId="IDFormModal"
            :NombreAccion="TituloModal" 
            :textSubmit="TextoButton"
            :activarModal="activarModal"
            :ModalActivo="1"
            :DataNotification="InformacionNotificacionModal"
            
        >
            <template #default><!--Espacio para los formularios -->
                <FormConfigGrupoCentralizacion 
                    :FormID="IDFormModal"
                    @DataNotificacion="ActualizarDataNotificacionModal"                
                />
            </template>
        </TemplateModal>
        <div class="row">
            
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del campo"
                :Titulo="`Grupo # ${Informacion.id}`"
                name="CampoAdicional"
                v-model="NombreCampo"
                @update:modelValue="NombreCampo = $event"
                :requerido="RequiereActualizar"
            />
            <div class="espacioTrash">
                
                <TuerquitaIcon
                    Stroke="#1A245B"
                    text="Configurar" 
                    @click="ActionButton"
                />
                
                <trashIcon
                    Stroke="#1A245B" 
                    text="Eliminar"
                    @click="eliminarElemento"
                />
            </div>
            
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';
import TuerquitaIcon from  '@/components/icons/Tuerquita-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';
import TemplateModal from '@/components/modal/TemplateModal.vue'
import FormConfigGrupoCentralizacion from '@/components/formularios/configuracion/centralizacion/Form-Configuracion-GrupoCentralizacion.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject} from 'vue';

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
});

const RequiereActualizar = ref(false);

const ID_Sociedad = ref(inject('SociedadID'))

const IDFORM = "GrupoCentralizacion" + props.Informacion?.id;

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const NombreCampo = ref('');

    const activarModal = ref(false)
    const TextoButton = ref('');
    const TituloModal = ref('');
    const IDFormModal = ref('');
    const InformacionNotificacionModal = ref({})

        /**
     * Cambia el valor de lanotificacion del modal
     * @param {Objeto} respuesta Recive el diccionario necesario para mostrar la notificacion del modal
    */
    const ActualizarDataNotificacionModal = (Informacion) => {
        InformacionNotificacionModal.value = Informacion;
    };

    const showModal = (valor) => {
        activarModal.value = valor;
    };

    const ActionButton = () => {
        TextoButton.value = 'Guardar Configuración';
        TituloModal.value = 'Configuracion Avanzada';
        IDFormModal.value = 'Datos'+ IDFORM;        
        showModal(true)
    }

//Contiene la información original
const payload_old = reactive({
    id:'',
    NombreCampo: "",

});

//Contiene la información a enviar
const payload = reactive({
    id:'',
    NombreCampo: "",

});

//Escuchar cambios en las variables
watch(NombreCampo, (nuevoValor) => ActualizarPayload('NombreCampo', nuevoValor));

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

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);

}

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

    NombreCampo.value = (DATA?.nombre == null)? '' :DATA?.nombre;

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    payload_old.id = DATA?.id ?? '';
    payload.id = DATA?.id ?? '';

    payload_old.NombreCampo = DATA?.nombre ?? '';
    payload.NombreCampo = DATA?.nombre ?? '';
    
};

const eliminarElemento = () => {
    console.log(props.Informacion)
 };

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = async () => {
  //si ID es nulo crea un usuario
 
    if (RequiereActualizar.value == true) {
        const respuesta = await peticiones_configuracion_datosEmpresa.ActualizarCampoAdicional(
            ID_USERMASTER.value , props.Informacion?.id, payload
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

onMounted(() => {
    MostrarValores(props.Informacion)

});

</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
    position:relative;
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
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: start;
    align-self: flex-start;
    position: absolute;
    gap:12px;
    top: -0.6rem; 
    right: 0;
}

</style>