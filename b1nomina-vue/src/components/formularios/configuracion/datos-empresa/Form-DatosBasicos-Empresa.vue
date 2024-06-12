<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Datos básicos de tu empresa</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre"
                Titulo="Nombre de la Empresa"
                name="nombre"
                v-model="NombreEmpresa"
                @update:modelValue="NombreEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Rut"
                Titulo="Rut de la empresa"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"/>
            
            <InputBorderDescripcion
                Placeholder="Ingresar Correo Electrónico "
                Titulo="Email de contacto"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="email"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <h4>Ubicación de la empresa</h4>
        <div class="row">
            <InputBorderDescripcion 
                Placeholder="Ingresar nombre de la ciudad"
                Titulo="Ciudad"
                name="Ciudad"
                v-model="CiudadEmpresa"
                @update:modelValue="CiudadEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
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
                Placeholder="Ingresar dirección de la empresa"
                Titulo="Dirección de la empresa"
                name="Direccion"
                v-model="Direccion"
                @update:modelValue="Direccion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        </div>
        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject, onBeforeMount} from 'vue';

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

const IDFORM = "DatosBasicosEmpresa"

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const NombreEmpresa = ref('');
const numeroDocumento = ref('');
const correoEmpresa= ref('');
const CiudadEmpresa = ref('');
const Region = ref('');
const Comuna = ref('');
const Direccion = ref('');

//definicion de vaiables de los parametos
const AllLocalidades = ref(props.parametros.localidad)
const ListaLocalidad = ref({}); //Los datos se asignan segun el idRegion

const filtroRegion = async (ID_Region) => {
    
    if (AllLocalidades.value == undefined || AllLocalidades.value == {}) {
        // Espera 1000 milisegundos (1 segundo) antes de continuar
        setTimeout(async () => {
            if (AllLocalidades.value!== undefined) {
                ListaLocalidad.value = await AllLocalidades.value.filter(item => item.idregion == ID_Region);
            }
        }, 1000);
    } else {
        ListaLocalidad.value = AllLocalidades.value.filter(item => item.idregion == ID_Region);
    }
};


//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    nombre: "",
    rut: "",
    email: "",
    ciudad: "",
    region_id: "",
    comuna_id: "",
    direccion: "",
});

//Contiene la información a enviar
const payload = reactive({
    nombre: "",
    rut: "",
    email: "",
    ciudad: "",
    region_id: "",
    comuna_id: "",
    direccion: "",
});

//Escuchar cambios en las variables
watch(NombreEmpresa, (nuevoValor) => ActualizarPayload('nombre', nuevoValor?.toUpperCase()));
watch(numeroDocumento, (nuevoValor) => ActualizarPayload('rut', nuevoValor));
watch(correoEmpresa, (nuevoValor) => ActualizarPayload('email', nuevoValor?.toUpperCase()));
watch(CiudadEmpresa, (nuevoValor) => ActualizarPayload('ciudad', nuevoValor?.toUpperCase()));
watch(Region, (nuevoValor) => {
        filtroRegion(nuevoValor);
        ActualizarPayload('region_id', nuevoValor);
    }
);
watch(Comuna, (nuevoValor) => ActualizarPayload('comuna_id', nuevoValor));

watch(Direccion, (nuevoValor) => ActualizarPayload('direccion', nuevoValor));

//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion?.Sociedad, (nuevoValor) => { 
     MostrarValores(nuevoValor) 
});

watch(() => props.parametros?.localidad, (nuevoValor) => { 
    AllLocalidades.value = nuevoValor;
    filtroRegion(Region.value)
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

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    NombreEmpresa.value = (DATA?.nombre == null)? '' :DATA?.nombre;
    payload_old.nombre = DATA?.nombre ?? '';
    payload.nombre = DATA?.nombre ?? '';
    
    numeroDocumento.value = (DATA?.rut == null)? '' :DATA?.rut;
    payload_old.rut = DATA?.rut ?? '';
    payload.rut = DATA?.rut ?? '';

    correoEmpresa.value = (DATA?.email == null)? '' : DATA?.email;
    payload_old.email = DATA?.email ?? '';
    payload.email = DATA?.email ?? '';

    CiudadEmpresa.value = (DATA?.ciudad == null)? '' :DATA?.ciudad;
    payload_old.ciudad = DATA?.ciudad ?? '';
    payload.ciudad = DATA?.ciudad ?? '';

    Region.value = (DATA?.region_id == null)? '' :DATA?.region_id;
    payload_old.region_id = DATA?.region_id ?? '';
    payload.region_id = DATA?.region_id ?? '';

    Comuna.value = (DATA?.comuna_id == null)? '' :DATA?.comuna_id;
    payload_old.comuna_id = DATA?.comuna_id ?? '';
    payload.comuna_id = DATA?.comuna_id ?? '';

    Direccion.value = (DATA?.direccion == null)? '' :DATA?.direccion;
    payload_old.direccion = DATA?.direccion ?? '';
    payload.direccion = DATA?.direccion ?? '';

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
   await MostrarValores(props.Informacion?.Sociedad)
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