<template>    
    <form class="formulario" id="ActualizarAFP" @submit.prevent="Enviar">
        
        <div class="row-form">
            <div class="separador-button">
                <span>Jubilado AFP</span>
                <InterruptorButton 
                    @ValorEstado="(value) => (value == true)? estado_jubiladoAFP = 1 : estado_jubiladoAFP = 0"
                    Objid="aplica_Gratificacion_Legal"
                    :Texto="(estado_jubiladoAFP == true)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(estado_jubiladoAFP)? true :false"
                    :requerido="RequiereActualizar"
                />                
            </div>
        </div>
        <div class="row-form">
            <LayoutInputLineal textLabel="Institución" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="institución" 
                        :options="Parametros?.afp" 
                        :requerido="RequiereActualizar"            
                        :preseleccion="institución" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
            <InputLinealDescripcion 
                v-model="ahorroAFP"
                Placeholder="$ 0" 
                Titulo="Ahorro AFP Cuenta 2 ($)" 
                @update:modelValue="ahorroAFP = $event"
                Tipo="Number"
                :minimo-numeros="0.00"
                :NumeroDecimales="0.01"
                :requerido="RequiereActualizar"
            />
        </div>
    </form>    
</template>

<script setup>
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

    import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';

    import peticiones from '@/peticiones/p_empleado';

    const DatosUsuario = reactive(inject('dataEmpleado'))
    const parametros = reactive(inject('parametros'))
    
    const Parametros = ref({});
    const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

    const RequiereActualizar = ref(false)

    // payload de las peticiones
    const payload = reactive({});
    
    // payload de las peticiones
    const payload_old = reactive({});

    const estado_jubiladoAFP = ref(false);
    watch(estado_jubiladoAFP, (nuevoValor) => ActualizarPayload("jubilado_afp", (nuevoValor == true)? 1: 0));
    
    const institución = ref('')
    watch(institución, (nuevoValor) => ActualizarPayload("afp_id", nuevoValor));

    const ahorroAFP = ref('');
    watch(ahorroAFP, (nuevoValor) =>  ActualizarPayload("ahorro_afp2", Math.abs(nuevoValor)));

    watch(DatosUsuario, (nuevaInfo) => {
        MostrarValores(nuevaInfo)        
    })

    watch(parametros, (nuevaInfo) => {     
        Parametros.value = nuevaInfo
    })

    const MostrarValores = (DATA) => {


        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        estado_jubiladoAFP.value = (DATA?.jubilado_afp == 1)? true : false;
        payload_old.jubilado_afp = (DATA?.jubilado_afp == 1)? 1 : 0;
        payload.jubilado_afp = (DATA?.jubilado_afp == 1)? 1 : 0;
       
        institución.value = (DATA?.afp_id == null || DATA?.afp_id.toLowerCase() == 'no asignado')? '' :DATA?.afp_id;
        payload_old.afp_id = (DATA?.afp_id == null || DATA?.afp_id.toLowerCase() == 'no asignado')? '' :DATA?.afp_id;
        payload.afp_id = (DATA?.afp_id == null || DATA?.afp_id.toLowerCase() == 'no asignado')? '' :DATA?.afp_id;
        
        ahorroAFP.value = (DATA?.ahorro_afp2 == null)? '' :DATA?.ahorro_afp2;
        payload_old.ahorro_afp2 = DATA?.ahorro_afp2 ?? '';
        payload.ahorro_afp2 = DATA?.ahorro_afp2 ?? '';
        RequiereActualizar.value = false;
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

    onMounted(() => {
        MostrarValores(DatosUsuario.value)
    });

    onBeforeMount(() => {
        Parametros.value = parametros.value
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
 
  if (RequiereActualizar.value == true) {
    const respuesta = await peticiones?.ActualizarAFP(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
    if(respuesta.success == true){
       emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
    } else {
        console.error(respuesta?.error)
        emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false})
    }

  } else {
    emit('respuestaServidor', {'texto': "No se requiere actualizar", 'valor':true});
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

div.separador-button {
    display: flex;
    align-items: center;
    gap: 36px;
}
</style>
