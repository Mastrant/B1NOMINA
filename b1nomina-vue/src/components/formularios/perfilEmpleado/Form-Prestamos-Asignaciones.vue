<template>    
    <form class="formulario" id="addPrestamo" @submit.prevent="Enviar">
        <section  v-show="verFormulario == 1">
            <div class="row-form">
                <LayoutInputLineal textLabel="Tipo" :requerido="RequiereActualizar">
                    <template v-slot>
                        <ListaTemplateLineal  
                            v-model="TipoPrestamo" 
                            :options="Parametros?.tipoprestamo" 
                            :requerido="RequiereActualizar"            
                            :preseleccion="TipoPrestamo" 
                            optionsSelected="Seleccionar"
                        />
                    </template>
                </LayoutInputLineal>          
            </div>

            <div class="row-form">
                <InputLinealDescripcion 
                    v-model="DescripcionPrestamo"
                    Placeholder="Ingresar Descripción" 
                    Titulo="Descripción" 
                    @update:modelValue="DescripcionPrestamo = $event"
                    :requerido="RequiereActualizar"
                />
            </div>
            <div class="row-form">
                <InputLinealDescripcion 
                    v-model="valorCuota"
                    Placeholder="$ 0" 
                    Titulo="Valor" 
                    @update:modelValue="valorCuota = $event"
                    Tipo="Number"
                    :minimoNumeros="1"
                    :NumeroDecimales="0.01"
                    :requerido="RequiereActualizar"

                />
            </div>
            <div class="row-form">
                <InputLinealDescripcion 
                    v-model="numeroCuotas"
                    Placeholder="0" 
                    Titulo="Número de cuotas a pagar" 
                    @update:modelValue="numeroCuotas = $event"
                    Tipo="Number"
                    :minimo-numeros="1"
                    :maximo-numeros="200"
                    :requerido="RequiereActualizar"
                />
                <InputLinealDescripcion 
                    v-model="fechaPrimerPago"
                    Placeholder="" 
                    Titulo="Fecha del pago primera cuota" 
                    @update:modelValue="fechaPrimerPago = $event"
                    Tipo="month"
                    :requerido="RequiereActualizar"
                />
            </div>
        </section>

        <section v-show="verFormulario == 2" class="tabla-cuotas">
            <CuotasPrestamos                
                :Listado="ListadoCuotas"
            />
        </section>
        <div class="espacio-botones">
            <PaginateButton 
                v-show="verFormulario == 2"
                texto="Editar Cuotas" 
                @click="() => {
                    verFormulario = 1
                    generarPrestamo = false
                }"
            />

            <PaginateButton 
                v-show="verFormulario == 1 && ListadoCuotas.length > 0"
                texto="Ver Cuotas" 
                @click="() => {
                    verFormulario = 2
                    generarPrestamo = true
                }"
            />
        </div>
    </form>    
</template>

<script setup>
import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import CuotasPrestamos from '@/components/tablas/perfilEmpleado/asignaciones/CuotasPrestamo-General.vue'
import PaginateButton from '@/components/botones/Paginate-button.vue';

import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';

import peticiones from '@/peticiones/p_empleado';

import {useRoute}  from 'vue-router';

const route = useRoute();  
const Sociedad_id = route.params.sociedadId

const DatosUsuario = reactive(inject('dataEmpleado'))
const parametros = reactive(inject('parametros'))

const Parametros = ref({});
const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

const RequiereActualizar = ref(false)

// payload de las peticiones
const payload = reactive({
    tipo_id: '',
    descripcion: '',
    valor: '',
    cuotas: '',
    fecha_inicio: '',
    "sociedad_id": Sociedad_id
});

// payload de las peticiones
const payload_old = reactive({
    tipo_id: '',
    descripcion: '',
    valor: '',
    cuotas: '',
    fecha_inicio: '',
    "sociedad_id": Sociedad_id
});

const verFormulario = ref(1)

const TipoPrestamo = ref('')
const DescripcionPrestamo = ref('')
const valorCuota = ref('')
const numeroCuotas = ref('')
const fechaPrimerPago = ref('')

const ListadoCuotas = ref([])
const generarPrestamo = ref(false)

watch(TipoPrestamo, (nuevoValor) =>  ActualizarPayload('tipo_id', nuevoValor));
watch(DescripcionPrestamo, (nuevoValor) =>  ActualizarPayload('descripcion', nuevoValor));
watch(valorCuota, (nuevoValor) =>  ActualizarPayload('valor', nuevoValor));
watch(numeroCuotas, (nuevoValor) =>  {
    numeroCuotas.value = Math.round(nuevoValor)
    ActualizarPayload('cuotas', nuevoValor)
});
watch(fechaPrimerPago, (nuevoValor) =>  ActualizarPayload('fecha_inicio', nuevoValor));

watch(parametros, (nuevaInfo) => {  
    ResetForm()   
    Parametros.value = nuevaInfo
})

const ResetForm = () => {
    RequiereActualizar.value = false;
    
    TipoPrestamo.value = '';
    DescripcionPrestamo.value = '';
    valorCuota.value = '';
    numeroCuotas.value =  '';
    fechaPrimerPago.value = '';

    verFormulario.value = 1
    ListadoCuotas.value = []
    generarPrestamo.value = false
    

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

onMounted(() => {
    ResetForm()
    RequiereActualizar.value == false
});

onBeforeMount(() => {
    ResetForm()
    Parametros.value = parametros.value;
})

const emit = defineEmits([
    'respuestaServidor',
]);

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
    //si ID es nulo crea un usuario
    if (generarPrestamo.value == false){
        if (RequiereActualizar.value == true) {
            const respuesta = await peticiones?.postCuotas(DatosUsuario.value?.user_id, ID_USERMASTER, payload);

            if (respuesta.success == true) {

                ListadoCuotas.value = respuesta.data.data
                verFormulario.value = 2
                generarPrestamo.value = true

            } else {
                console.error(respuesta?.error)
                emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false})
            }
        } else {
            emit('respuestaServidor', {'texto': "Los campos estan vacios", 'valor':true});
        }
    } else {
        if (RequiereActualizar.value == true) {
                const respuesta = await peticiones?.addPrestamo(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
                if(respuesta.success == true){
                    emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
                } else {
                    console.error(respuesta?.error)
                    emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false})
                }

        } else {
            emit('respuestaServidor', {'texto': "Los campos estan vacios", 'valor':true});
        }        
    }

    
    
};

</script>

<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;

}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario > section {
    display: flex;
    flex-direction: column;
    gap:  16px
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
div.espacio-botones{
    display: flex;
    justify-content: end;
    padding: 24px 24px 0px 0px;
}

section.tabla-cuotas {
    box-sizing: border-box;
    max-height: 420px;
    overflow-y: scroll;
}

</style>
