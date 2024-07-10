<template>
    
    <form class="formulario" id="ActualizarDatosPrevisionalesAdicionales" @submit.prevent="Enviar">
        
        <p>Selecciona los datos previsionales adcionales correspondientes al empleado. Si tienes inquietudes o dudas ingresa a este 
            <a href="">artículo de nuestro centro de ayuda.</a>
        </p>

        <div class="row-form">
            <span>Aplica Gratificacion Legal</span>
            
            <div class="separador-button">
                <InterruptorButton 
                    @ValorEstado="(value) => aplica_Gratificacion_Legal = value"
                    Objid="aplica_Gratificacion_Legal"
                    :Texto="( aplica_Gratificacion_Legal == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(aplica_Gratificacion_Legal == 1)? true :false"
                    :requerido="RequiereActualizar"
                />                
            </div>
            
        </div>
        <div class="row-form">
            <span>Afiliado AFC</span>
            
            <div class="separador-button">
                <InterruptorButton 
                    @ValorEstado="(value) => afiliado_AFC = value"
                    Objid="afiliado_AFC"
                    :Texto="( afiliado_AFC == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(afiliado_AFC == 1)? true :false"
                    :requerido="RequiereActualizar"
                />                
            </div>
            
        </div>
        <div class="row-form">
            <span>Antiguedad Máxima AFC</span>
            
            <div class="separador-button">
                <InterruptorButton 
                    @ValorEstado="(value) => antiguedad_Maxima_AFC = value"
                    Objid="antiguedad_Maxima_AFC"
                    :Texto="(antiguedad_Maxima_AFC == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(antiguedad_Maxima_AFC == 1)? true : false"
                    :requerido="RequiereActualizar"
                />                
            </div>
            
        </div>
        <div class="row-form">
            <span>Pens. Vejez</span>
            
            <div class="separador-button">
                <InterruptorButton 
                    @ValorEstado="(value) => pens_vejez = value"
                    Objid="pens_vejez"
                    :Texto="( pens_vejez == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(pens_vejez == 1)? true : false"
                    :requerido="RequiereActualizar"
                />                
            </div>
            
        </div>
        <div class="row-form">
            <span>Pens. Invalidez</span>

        <div class="separador-button">
            <InterruptorButton 
                @ValorEstado="(value) => pens_invalidez = value"
                Objid="pens_invalidez"
                :Texto="(pens_invalidez == 1)? 'Activo' : 'Inactivo'"
                Tipo="individual"
                :Estado="(pens_invalidez == 1)? true : false"
                :requerido="RequiereActualizar"
            />

        </div>

        </div>
        <div class="row-form">
            <span>Es ExINP</span>

            <div class="separador-button">
                <InterruptorButton 
                    @ValorEstado="(value) => ExINP = value"
                    Objid="ExINP"
                    :Texto="(ExINP == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(ExINP == 1)? true : false"
                    :requerido="RequiereActualizar"
                />
            </div>
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

watch(aplica_Gratificacion_Legal, (nuevoValor) => ActualizarPayload('gratificacion', nuevoValor));
watch(afiliado_AFC, (nuevoValor) => ActualizarPayload('afiliado_afc', nuevoValor));
watch(antiguedad_Maxima_AFC, (nuevoValor) => ActualizarPayload('antiguedad_afc', nuevoValor));
watch(pens_vejez, (nuevoValor) => ActualizarPayload('vejez', nuevoValor));
watch(pens_invalidez, (nuevoValor) => ActualizarPayload('invalidez', nuevoValor));
watch(ExINP, (nuevoValor) => ActualizarPayload('exinp', nuevoValor));

watch(DatosUsuario, (nuevaInfo) => {
    MostrarValores(nuevaInfo)
})

const MostrarValores = (DATA) => {

    // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
    RequiereActualizar.value = false

    aplica_Gratificacion_Legal.value = (DATA?.gratificacion == 1)? 1 : 0;
    payload_old.gratificacion = DATA?.gratificacion ?? '';
    payload.gratificacion = DATA?.gratificacion ?? '';

    afiliado_AFC.value = (DATA?.afiliado_afc == 1)? 1 : 0;
    payload_old.afiliado_afc = DATA?.afiliado_afc ?? '';
    payload.afiliado_afc = DATA?.afiliado_afc ?? '';

    antiguedad_Maxima_AFC.value = (DATA?.antiguedad_afc == 1)? 1 : 0;
    payload_old.antiguedad_afc = DATA?.antiguedad_afc ?? '';
    payload.antiguedad_afc = DATA?.antiguedad_afc ?? '';

    pens_vejez.value = (DATA?.vejez == 1)? 1 : 0;
    payload_old.vejez = DATA?.vejez ?? '';
    payload.vejez = DATA?.vejez ?? '';

    pens_invalidez.value = (DATA?.invalidez == 1)? 1 : 0;
    payload_old.invalidez = DATA?.invalidez ?? '';
    payload.invalidez = DATA?.invalidez ?? '';

    ExINP.value = (DATA?.exinp == 1)? 1 : 0;
    payload_old.exinp = DATA?.exinp ?? '';
    payload.exinp = DATA?.exinp ?? '';


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
    
    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales);
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
    const respuesta = await peticiones.ActualizarDatosAdicionales(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
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

.row-form > span {
    width: 50%;
    color: black;
    font-size: 17px;
    font-weight: 500;
    line-height: 26px;
    word-wrap: break-word;
    margin-left: 12px;
}
.row-form > div {
    width: 50%;
    display: flex;
    justify-content: center;
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
