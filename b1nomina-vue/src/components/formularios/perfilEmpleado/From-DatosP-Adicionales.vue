<template>
    
    <form class="formulario" id="ActualizarDatosPrevisionalesAdicionales" @submit.prevent="Enviar">
        
        <p>Selecciona los datos previsionales adcionales correspondientes al empleado. Si tienes inquietudes o dudas ingresa a este 
            <a href="">artículo de nuestro centro de ayuda.</a>
        </p>

        <div class="row-form">
            <span>Aplica Gratificacion Legal</span>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="aplica_Gratificacion_Legal"
                        Objid="aplica_Gratificacion_Legal"
                        :Texto="( aplica_Gratificacion_Legal == true)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="(aplica_Gratificacion_Legal)? true :false"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form">
            <span>Afiliado AFC</span>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="afiliado_AFC"
                        Objid="afiliado_AFC"
                        :Texto="( afiliado_AFC == true)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="afiliado_AFC"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form">
            <span>Antiguedad Máxima AFC</span>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="antiguedad_Maxima_AFC"
                        Objid="antiguedad_Maxima_AFC"
                        :Texto="( antiguedad_Maxima_AFC == true)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="antiguedad_Maxima_AFC"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form">
            <span>Pens. Vejez</span>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="pens_vejez"
                        Objid="pens_vejez"
                        :Texto="( pens_vejez == true)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="pens_vejez"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form">
            <span>Pens. Invalidez</span>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="pens_invalidez"
                        Objid="pens_invalidez"
                        :Texto="( pens_invalidez == true)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="pens_invalidez"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form">
            <span>Es ExINP</span>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="ExINP"
                        Objid="ExINP"
                        :Texto="( ExINP == true)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="ExINP"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
    </form>
</template>

<script setup>
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';
import peticiones from '@/peticiones/p_empleado';

const DatosUsuario = reactive(inject('dataEmpleado'))

const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

//lista de
const ListaTiposDocumentos = [
{
    id: 1,
    nombre: "Pasaporte",
},
{
    id: 2,
    nombre: "RUT",
},
];

const aplica_Gratificacion_Legal = ref(false)
const afiliado_AFC = ref(false)
const antiguedad_Maxima_AFC = ref(false)
const pens_vejez = ref(false)
const pens_invalidez = ref(false)
const ExINP = ref(false)


const payload = reactive({});

const payload_old = reactive({});

const RequiereActualizar  = ref(false);


watch(aplica_Gratificacion_Legal, (nuevoValor) => ActualizarPayload("", (nuevoValor == true)? 1 : 0));
watch(afiliado_AFC, (nuevoValor) => ActualizarPayload("",(nuevoValor == true)? 1 : 0));
watch(antiguedad_Maxima_AFC, (nuevoValor) => ActualizarPayload("",(nuevoValor == true)? 1 : 0));
watch(pens_vejez, (nuevoValor) => ActualizarPayload("",(nuevoValor == true)? 1 : 0));
watch(pens_invalidez, (nuevoValor) => ActualizarPayload("",(nuevoValor == true)? 1 : 0));
watch(ExINP, (nuevoValor) => ActualizarPayload("",(nuevoValor == true)? 1 : 0));


watch(DatosUsuario, (nuevaInfo) => {
    MostrarValores(nuevaInfo)
})

const MostrarValores = (DATA) => {

    // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
    RequiereActualizar.value = false

    
    aplica_Gratificacion_Legal.value = (DATA?.rut == 1)? true : false;

    afiliado_AFC.value = (DATA?.rut == 1)? true : false;

    antiguedad_Maxima_AFC.value = (DATA?.rut == 1)? true : false;

    pens_vejez.value = (DATA?.rut == 1)? true : false;

    pens_invalidez.value = (DATA?.rut == 1)? true : false;

    ExINP.value = (DATA?.rut == 1)? true : false;


    payload_old.rut = DATA?.rut ?? '';
    payload.rut = DATA?.rut ?? '';

}

/**
 * Actualiza el valor de una propiedad específica dentro del objeto 'payload'.
 *
 * @param {string} propiedad - El nombre de la propiedad a actualizar en el objeto 'payload'.
 * @param {any} valor - El nuevo valor que se asignará a la propiedad especificada.
 *
 * @example
 * // 'payload' es un objeto con una estructura predefinida.
 * const payload = {
 *   nombre: '',
 *   edad: 0
 * };
 *
 * // Llamando a ActualizarPayload para cambiar el nombre.
 * ActualizarPayload('nombre', variable);
 *
 * // Ahora, 'payload' se verá así:
 * // {
 * //   nombre: 'Pedro',
 * //   edad: 30
 * // }
 */
 const ActualizarPayload = (propiedad, valor) => {
  // Asigna el nuevo valor a la propiedad especificada dentro del objeto 'payload'.
  payload[propiedad] = valor;
  
  verificarCambios();

};
// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every( key => payload_old[key] == payload[key]);
    
    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}


const emit = defineEmits([
    'respuestaServidor',
]);

onBeforeMount(() => {
    MostrarValores(DatosUsuario.value)
})


/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
 
  if (RequiereActualizar.value == true) {
    const respuesta = await peticiones.ActualizarDatosPrincipales(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
    if(respuesta.success == true){
       emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor': true})
    } else {
        console.error(respuesta?.error)
        emit('respuestaServidor', {'texto': respuesta?.error, 'valor': false})
    }
  } else {
    emit('respuestaServidor', {'texto': "No se requiere actualizar", 'valor': true});
  }
};
</script>


<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap:  16px
}

/* Contenedor para elementos multimedia, organizados 
en columnas con un espacio de  12px entre ellos */
div.multimedia {
    display: flex;
    flex-direction: column;
    gap:  12px;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo{
    border-radius:  6px;
    border:  0.5px #363855 dashed;
    border-width:  5px;
    box-sizing: border-box;
    padding:  12px  48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:  100%;
    height: fit-content;
}

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin:  0px;
    color: #1A2771;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>
