<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ejemplo Mercadeo, Operaciones, Comercial, Administrativa, Gerencia, etc."
                Titulo="Departamento"
                name="Departamento"
                v-model="NombreDepartamento"
                @update:modelValue="NombreDepartamento = $event"
                :requerido="RequiereActualizar"
            />
            
            <div class="espacioTrash">
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
import trashIcon from '@/components/icons/trash-icon.vue';

import peticiones_configuracion_datosEmpresa from '@/peticiones/configuracion/datos_empresa.js';

import { defineProps, ref, reactive, watch, defineEmits, onMounted} from 'vue';

const ID_USERMASTER = ref(localStorage.getItem('userId'))

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
});

const RequiereActualizar = ref(false);

const IDFORM = "ActualizarDepartamento" + props.Informacion?.id;

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const NombreDepartamento = ref('');

//Contiene la información original
const payload_old = reactive({
    id: '',
    nombre: "",

});

//Contiene la información a enviar
const payload = reactive({

    id: '',
    nombre: "",

});

//Escuchar cambios en las variables
watch(NombreDepartamento, (nuevoValor) => ActualizarPayload('nombre', nuevoValor));

//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion, (nuevoValor) => { 
    MostrarValores(nuevoValor);
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
    const camposIguales = (payload_old.nombre ==  payload.nombre)
    const campoVacio = payload.nombre == ''
    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !campoVacio );
}

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

NombreDepartamento.value = (DATA?.nombre == null)? '' :DATA?.nombre;

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    RequiereActualizar.value = false
    // utilizando '' si DATA?.documento es null.
    payload_old.id = DATA?.id ?? '';
    payload.id = DATA?.id ?? '';

    payload_old.nombre = DATA?.nombre ?? '';
    payload.nombre = DATA?.nombre ?? '';

    payload.sociedad_id = DATA?.sociedad_id ?? '';
    payload_old.sociedad_id = DATA?.sociedad_id ?? '';
    
    payload.sede_id = DATA?.sede_id ?? '';
    payload_old.sede_id = DATA?.sede_id ?? '';
  
}

const eliminarElemento = () => {
    console.log(props.Informacion)
}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
 
  if (RequiereActualizar.value == true) {
        const respuesta = await peticiones_configuracion_datosEmpresa.ActualizarDepartamento(
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
    justify-content: end;
    align-items: start;
    align-self: flex-start;
}

</style>