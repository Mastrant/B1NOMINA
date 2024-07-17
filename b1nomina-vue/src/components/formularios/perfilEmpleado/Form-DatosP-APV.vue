<template>    
    <form class="formulario" id="ActualizarAPV" @submit.prevent="Enviar">
        
        <div class="row-form">
            <div class="separador-button">
                <span>Activo</span>
                <InterruptorButton 
                    @ValorEstado=" (value) => Activo = value"
                    Objid="Activo"
                    :Texto="(Activo == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(Activo == 1)? true :false"
                    :requerido="RequiereActualizar"
                />                
            </div>
            <div class="separador-button">
                <span>Colectivo</span>
                <InterruptorButton 
                    @ValorEstado="(value) => Colectivo = value"
                    Objid="Colectivo"
                    :Texto="(Colectivo == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(Colectivo == 1)? true :false"
                    :requerido="RequiereActualizar"
                />                
            </div>
            <div class="separador-button">
                <span>Pago Directo</span>
                <InterruptorButton 
                    @ValorEstado="(value) => PagoDirecto = value"
                    Objid="aplica_Gratificacion_Legal"
                    :Texto="(PagoDirecto == 1)? 'Activo' : 'Inactivo'"
                    Tipo="individual"
                    :Estado="(PagoDirecto == 1)? true :false"
                    :requerido="RequiereActualizar"
                />                
            </div>
        </div>
        <div class="row-form">
            <LayoutInputLineal textLabel="Institución" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="institución" 
                        :options="Parametros?.instituciones_apv" 
                        :requerido="RequiereActualizar"            
                        :preseleccion="institución" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                v-model="Pactado"
                Placeholder="$ 0" 
                Titulo="Pactado($)" 
                @update:modelValue="Pactado = $event"
                Tipo="Number"
                :NumeroDecimales="0.01"
                :minimo-numeros="0.00"
                :requerido="RequiereActualizar"
            />

            <LayoutInputLineal textLabel="Unidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Unidad" 
                        :options="Parametros?.unidadessueldo" 
                        :requerido="RequiereActualizar"            
                        :preseleccion="Unidad" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
            <LayoutInputLineal textLabel="Regimen" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Regimen" 
                        :options="Parametros?.regimen" 
                        :requerido="RequiereActualizar"            
                        :preseleccion="Regimen" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                v-model="NConvenio"
                Titulo="N° Convenio" 
                Placeholder="Ingresar Número" 
                Tipo="Number"
                @update:modelValue="NConvenio = $event"
                :minimo-caracteres="1"
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

    
    const Activo = ref(false);
    watch(Activo, (nuevoValor) => ActualizarPayload('activo', (nuevoValor == true)? 1: 0));

    const Colectivo = ref(false);
    watch(Colectivo, (nuevoValor) => ActualizarPayload('colectivo', (nuevoValor == true)? 1: 0));

    const PagoDirecto = ref(false);
    watch(PagoDirecto, (nuevoValor) => ActualizarPayload('pago_directo', (nuevoValor == true)? 1: 0));
    
    const institución = ref('')
    watch(institución, (nuevoValor) => ActualizarPayload('apv_institucion_id', nuevoValor));
    
    const Pactado = ref('')
    watch(Pactado, (nuevoValor) => {
        ActualizarPayload('monto_pacto', (nuevoValor))
    });

    const Unidad = ref('')
    watch(Unidad, (nuevoValor) => ActualizarPayload('unidad_pacto_id', nuevoValor));

    const Regimen = ref('')
    watch(Regimen, (nuevoValor) => ActualizarPayload('regimen', String(nuevoValor)));

    const NConvenio = ref('')
    watch(NConvenio, (nuevoValor) => ActualizarPayload('nconvenio', nuevoValor));


    watch(DatosUsuario, (nuevaInfo) => {
        MostrarValores(nuevaInfo)        
    })

    watch(parametros, (nuevaInfo) => {     
        Parametros.value = nuevaInfo
    })

    const MostrarValores = (DATA) => {
        RequiereActualizar.value = false;
        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        
        Activo.value = (DATA?.apv_activo == 1)? 1 : 0;
        payload_old.activo = (DATA?.apv_activo == 1)? DATA?.apv_activo : 0;
        payload.activo = (DATA?.apv_activo == 1)? DATA?.apv_activo : 0;

        Colectivo.value = (DATA?.colectivo == 1)? 1 : 0;
        payload_old.colectivo = (DATA?.colectivo == 1)? DATA?.colectivo : 0;
        payload.colectivo = (DATA?.colectivo == 1)? DATA?.colectivo : 0;

        PagoDirecto.value = (DATA?.pago_directo == 1)? 1 : 0;
        payload_old.pago_directo = (DATA?.pago_directo == 1)? DATA?.pago_directo : 0;
        payload.pago_directo = (DATA?.pago_directo == 1)? DATA?.pago_directo : 0;

        institución.value = (DATA?.apv_institucion_id == null || DATA?.apv_institucion_id.toLowerCase() == 'no asignado')? '' :DATA?.apv_institucion_id;
        payload_old.institución = (DATA?.apv_institucion_id == null || DATA?.apv_institucion_id.toLowerCase() == 'no asignado')? '' :DATA?.apv_institucion_id;
        payload.institución = (DATA?.apv_institucion_id == null || DATA?.apv_institucion_id.toLowerCase() == 'no asignado')? '' :DATA?.apv_institucion_id;
        
        Pactado.value =  (DATA?.monto_pacto == null || DATA?.monto_pacto.toLowerCase() == 'no asignado') ? '' :DATA?.monto_pacto;
        payload_old.Pactado = (DATA?.monto_pacto == null || DATA?.monto_pacto.toLowerCase() == 'no asignado') ? '' :DATA?.monto_pacto;
        payload.Pactado = (DATA?.monto_pacto == null || DATA?.monto_pacto.toLowerCase() == 'no asignado') ? '' :DATA?.monto_pacto;

        Unidad.value = (DATA?.unidad_pacto_id == null || DATA?.unidad_pacto_id.toLowerCase() == 'no asignado')? '' :DATA?.unidad_pacto_id;
        payload_old.unidad_pacto_id = (DATA?.unidad_pacto_id == null || DATA?.unidad_pacto_id.toLowerCase() == 'no asignado')? '' :DATA?.unidad_pacto_id;
        payload.unidad_pacto_id = (DATA?.unidad_pacto_id == null || DATA?.unidad_pacto_id.toLowerCase() == 'no asignado')? '' :DATA?.unidad_pacto_id;

        Regimen.value = (DATA?.regimen == null)? '' :DATA?.regimen;
        payload_old.regimen = DATA?.regimen ?? '';
        payload.regimen = DATA?.regimen ?? '';

        NConvenio.value = (DATA?.nconvenio == null)? '' :DATA?.nconvenio;
        payload_old.NConvenio = DATA?.nconvenio ?? '';
        payload.NConvenio = DATA?.nconvenio ?? '';

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
    const respuesta = await peticiones?.ActualizarAPV(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
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
