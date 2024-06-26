<template>
    <div class="conted"> 
        <!--Contenedor de la tabla-->
        <table class="TablaEmpleados">
            <!--Encabezado de la tabla-->
            <tr class="rowTabla encabezado">
                <th class="celda">
                    PERIODO 
                </th>
                <th class="celda">
                    UF
                </th>
                <th class="celda"> 
                    UTM
                </th>
                <th class="celda"> 
                    FACTOR
                </th>
                <th class="estado"> 
                    ESTADO 
                </th>
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!--Final encabezado-->

            <!--Cuerpo de la tabla-->
            <PeriodosRow  v-for="item in ListaEmpleados" :key="item?.id">
                <!--ChecBox-->

                <template #periodo>
                    {{item?.nombre}} 
                </template>

                <template #uf>
                    {{item?.uf}}
                </template>

                <template #utm>
                    {{ item?.utm }}
                </template>

                <template #factor_actualizacion>
                    {{ item?.factor_actualizacion }}
                </template>
                <!--Estado-->
                <template #activateComponente>
                    <InterruptorButton
                        Tipo="individual"
                        :Texto="(item?.activo == 1)? 'Activo' : 'Inactivo' " 
                        :Estado="(item?.activo == 1)? true : false"
                        @click="activarPeriodo(item)"
                    />
                </template>
                <template v-slot:accionButton>          
                    <EditIcon Stroke="#1A245B" @click="activarFormulario(2, item)" text="Editar"/>
                </template>
            </PeriodosRow>
            <!--Final cuerpo-->
        </table>    

        <CicloConfiguracionPeriodos ref='CicloCrearPeriodo' />            
    </div>
</template>

<script setup>
import EditIcon from '@/components/icons/Edit-icon.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
import PeriodosRow from '@/components/tablas/configuracion/Periodos-row.vue';
import CicloConfiguracionPeriodos from '@/components/elementos/Ciclo-Configuracion-Periodos.vue';

import peticiones_configuracion_Periodos from '@/peticiones/configuracion/periodos.js'

import { ref, defineProps, watchEffect, onMounted, inject} from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const ID_USERMASTER = ref(localStorage.getItem('userId'))

// Define los props
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: () => []
  }
});

const CicloCrearPeriodo = ref(null)


/** 
 *
*/
const activarFormulario = (Action, Data = []) => {
    CicloCrearPeriodo.value?.ActionButton(Action, Data)
}

defineExpose({
    activarFormulario
})

const actualizarData = inject('actualizarData')
const showNotificacion = inject('mostrarNotificacion')

const activarPeriodo = async (InformacionPeriodo) => {

    const Estado = (InformacionPeriodo?.activo == 0)? 1 : 0;
    const respuesta = await peticiones_configuracion_Periodos?.ActualizarEstadoPeriodo(InformacionPeriodo?.id, Estado, ID_USERMASTER.value)

    if(respuesta.success == true){
        showNotificacion({'Titulo': 'Periodo editado con éxito', 'Descripcion':respuesta?.data?.message, 'valor': true})
        actualizarData()
    } else {
        console.error(respuesta?.error)
        showNotificacion({'Titulo': 'Error al cambiar el estado del Periodo', 'Descripcion': respuesta?.error, 'valor': false})
    }
}


// Accede a la lista de empleados desde props
const ListaEmpleados = ref(props.listaEmpleados);

//al cambiar los datos reinicia el renderizado
watchEffect(() => {
  ListaEmpleados.value = props.listaEmpleados;
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    ListaEmpleados.value = props.listaEmpleados;
});
</script>

<style scoped>
/* Estilos generales para la tabla de empleados */
.TablaEmpleados {
    width: 100%; /* Asegura que la tabla ocupe el ancho completo del contenedor */
}

/**
 * Contenedor general de la tabla
 * Utiliza Flexbox para organizar elementos en una columna y alinearlos al final
 */
.conted {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 24px; /* Espacio entre elementos */
}

/**
 * Estilos para la paginación dentro del contenedor
 * Alinea los botones de paginación al final del contenedor
 */
div.espacio-paginacion {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


/**
 * Estilos para el encabezado de la tabla
 * Define el fondo, borde, y estilos de fuente para el encabezado
 */
tr.encabezado {
    width: fit-content;
    height: 24px;
    box-sizing: border-box;
    background: #FCFCFD;
    border-bottom: 0.96px #EAECF0 solid;
    color: #667085;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word; /* Asegura que el texto no exceda el ancho de la celda */
}

/**
 * Evita que el texto sobrepase el límite de la celda
 * Aplica estilos para asegurar que el texto se ajuste dentro de las celdas
 */
th {
 word-break: break-word;
 white-space: nowrap;
}
th.celda {
    flex-grow: 1;
}

/**
 * Estilo general para las filas de la tabla
 * Define la altura y el ancho de las filas
 */
tr.rowTabla {
    width: 100%;
    box-sizing: content-box;
    height: 48px;
    display: table-row;
}

/**
 * Estilos para la columna de acciones (generalmente botones o iconos)
 * Organiza los elementos de acción en un contenedor flex
 */
th.acciones {
    display: flex;
    gap: 12px; /* Espacio entre acciones */
    justify-content: center; /* Centrado de acciones */
    box-sizing: border-box;
}

th.estado {
    max-width: fit-content;
}

</style>
