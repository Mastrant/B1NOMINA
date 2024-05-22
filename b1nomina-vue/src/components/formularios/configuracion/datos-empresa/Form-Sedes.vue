<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <div class="contend">
            <div class="row">
                <InputBorderDescripcion
                    Placeholder="Ingresar nombre"
                    Titulo="Nombre"
                    name="nombre"
                    v-model="nombre"
                    @update:modelValue="nombre = $event"
                    :requerido="RequiereActualizar"
                />
                
                <InputBorderDescripcion
                    Placeholder="Ciudad"
                    Titulo="Ciudad"
                    name="Ciudad"
                    v-model="CiudadSede"
                    @update:modelValue="CiudadSede = $event"
                    :requerido="RequiereActualizar"
                />
                
                <LayoutInputBorder textLabel="Región" :requerido="RequiereActualizar">
                    <template v-slot>
                      <ListaTemplateBorder
                        v-model="Region"
                        :options="parametros.regiones"
                        :requerido="RequiereActualizar"            
                        :preseleccion="Region"  
                        optionsSelected="Seleccionar"
                      />
                    </template>
                </LayoutInputBorder>
    
                  <LayoutInputBorder textLabel="Comuna" :requerido="RequiereActualizar">
                    <template v-slot>
                      <ListaTemplateBorder
                        v-model="Comuna"
                        :options="ListaLocalidad"
                        :requerido="RequiereActualizar"            
                        :preseleccion="Comuna"  
                        optionsSelected="Seleccionar"
                      />
                    </template>
                  </LayoutInputBorder>
            </div>
    
            <div class="row">
                <InputBorderDescripcion
                    Placeholder="Ingresar la dirección"
                    Titulo="Dirección de la Sede"
                    name="Dirección"
                    v-model="DireccionSede"
                    @update:modelValue="DireccionSede = $event"
                    :requerido="RequiereActualizar"
                />
            </div>

            <div class="espacioBoto" v-if="RequiereActualizar">
                <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
            </div>
        </div>
        <div class="espacioTrash">
            <trashIcon
                Stroke="#1A245B" 
                text="Eliminar"
                @click="eliminarElemento"
            />
        </div>

    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
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
    parametros: {
        type: Object,
        default: {}
    },
});

const IDFORM = "ActualizarSede" + props.Informacion?.id;

const emit = defineEmits([
    "DataNotificacion",
]);

const nombre = ref('')
const CiudadSede = ref('')
const Region = ref('')
const Comuna = ref('')
const DireccionSede = ref('')

//definicion de vaiables de los parametos
const ListaLocalidad = ref(''); //Los datos se asignan segun el idRegion

//filtra la lista de regiones segun el id
const filtroRegion = (ID_comuna) => {
    ListaLocalidad.value = props.parametros.localidad?.filter(item => item.idregion == ID_comuna);
};

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    nombre: "",
    ciudad: "",
    region_id: "",
    comuna_id: "",
    direccion: "",
    sociedad_id: '',
});

//Contiene la información a enviar
const payload = reactive({
    nombre: "",
    ciudad: "",
    region_id: "",
    comuna_id: "",
    direccion: "",
    sociedad_id:'',
});

//Escuchar cambios en las variables
watch(nombre, (nuevoValor) => ActualizarPayload('nombre', nuevoValor));
watch(CiudadSede, (nuevoValor) => ActualizarPayload('ciudad', nuevoValor));

watch(Region, (nuevoValor) => {
        filtroRegion(nuevoValor);
        ActualizarPayload('region_id', nuevoValor);
    }
);
watch(Comuna, (nuevoValor) => ActualizarPayload('comuna_id', nuevoValor));

watch(DireccionSede, (nuevoValor) => ActualizarPayload('direccion', nuevoValor));

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
    
    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    RequiereActualizar.value = false
    nombre.value = (DATA?.nombre == null)? '' :DATA?.nombre;    
    payload.nombre = DATA?.nombre ?? '';
    payload_old.nombre = DATA?.nombre ?? '';

    CiudadSede.value = (DATA?.ciudad == null)? '' :DATA?.ciudad;
    payload.ciudad = DATA?.ciudad ?? '';
    payload_old.ciudad = DATA?.ciudad ?? '';
    
    Region.value = (DATA?.region_id == null)? '' :DATA?.region_id;
    payload.region_id = DATA?.region_id ?? '';
    payload_old.region_id = DATA?.region_id ?? '';
    
    Comuna.value = (DATA?.comuna_id == null)? '' :DATA?.comuna_id;
    payload.comuna_id = DATA?.comuna_id ?? '';
    payload_old.comuna_id = DATA?.comuna_id ?? '';
    
    DireccionSede.value = (DATA?.direccion == null)? '' :DATA?.direccion;
    payload.direccion = DATA?.direccion ?? '';
    payload_old.direccion = DATA?.direccion ?? '';

    payload.sociedad_id = DATA?.sociedad_id ?? '';
    payload_old.sociedad_id = DATA?.sociedad_id ?? '';

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
        const respuesta = await peticiones_configuracion_datosEmpresa.ActualizarSede(ID_USERMASTER.value ,props.Informacion?.id
    ,payload);
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
    flex-direction: row;
   box-sizing: border-box;
   gap: 12px;
}

div.contend{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
    flex-grow: 1;
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

div.espacioBoto{
    width: 100%;
    display: flex;
}

div.espacioTrash {
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: start;
    align-self: flex-start;
    box-sizing: border-box;

}



</style>