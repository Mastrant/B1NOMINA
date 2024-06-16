<template>
    <div class="conted"> 
        <!--Contenedor de la tabla-->
        <table class="TablaEmpleados">
            <!--Encabezado de la tabla-->
            <tr class="rowTabla encabezado">
                <th class="rowNombre">
                    PERIODO 
                </th>
                <th class="">
                    UF
                </th>
                <th class=""> 
                    UTM
                </th>
                <th class=""> 
                    Fac. Actualización
                </th>
                <th class="Estado"> 
                    ESTADO 
                </th>
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!--Final encabezado-->

            <!--Cuerpo de la tabla-->
            <PeriodosRow  v-for="(item) in ListaEmpleados" :key="item.id">
                <!--ChecBox-->
                <!--Nombre y apelidos-->
                <template v-slot:NombresApellidos>
                    {{item.nombres}} 
                    {{ item.apellido_paterno }}
                    {{ item.apellido_materno }}
                </template>
                <!--Rut-->
                <template v-slot:rut>
                    {{item.rut}}
                </template>
                 <!--Cargo-->
                <template v-slot:cargo>
                    {{ item.cargo }}
                </template>
                <!--Saladio / sueldo-->
                <template v-slot:sueldo>
                    {{ item.sueldo }}
                </template>
                <!--Estado-->
                <template v-slot:activateComponente>
                    <InterruptorButton 
                        :Objid="item.id" 
                        :Estado="item.activo"
                        @actualizarListado="resultadoActivacion"
                    />
                    <span v-if="item.activo == true">Activo</span>
                    <span v-else>Inactivo</span>
                </template>
                <template v-slot:accionButton>          
                    <EditIcon @click="console.log('descargar info' + item.id)" text="Descargar"/>
                </template>
            </PeriodosRow>
            <!--Final cuerpo-->
        </table>                
    </div>
   
</template>

<script setup>
import EditIcon from '@/components/icons/Edit-icon.vue';
import InterruptorButton from '@/components/inputs/Interruptor-modal-button.vue';
import InputCheckbox from '@/components/inputs/Input-Checkbox.vue';
import PeriodosRow from '@/components/tablas/configuracion/Periodos-row.vue';

import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

import { useRoute } from 'vue-router';

import almacen from '@/store/almacen.js';

const route = useRoute();
const sociedadId = route.params.sociedadId;

// Define los props
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits([
    'upData',
    'actualizar_Lista',
    'mostrarNotificacion',
]);

const resultadoActivacion = (Data) => {
    
    emit('mostrarNotificacion', Data)
    emit('actualizar_Lista')
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
    width: 100%;
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

/**
 * Estilos para el cuerpo de la tabla
 * Define la altura de las filas y utiliza Flexbox para organizar el contenido
 */
tr.cuerpo {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-self: end;
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

/* Estilos para cada celda de la tabla */
tr.cuerpo > td {
    width: auto; /* Ancho automático basado en el contenido */
    height: 48px;
    background: none; /* Sin fondo para una apariencia limpia */
    box-sizing: border-box; /* Para incluir padding y borde en el ancho total */
    padding: 12px; /* Espacio interno para mejorar la legibilidad */
    border:#FCFCFD; /* Borde superior para separar las filas */
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center; /* Centrado verticalmente */
    align-items: center; /* Centrado horizontalmente */
    text-align: center; /* Alineación del texto al centro */
    margin: auto; /* Margen automático para centrar el contenido */
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

/* Estilos para la primera columna, que puede contener checkboxes */
.filaCheckbox {
    max-width: 80px !important; /* Ancho máximo para mantener la consistencia */
    box-sizing: border-box;
    margin: auto; /* Margen automático para centrar */
}

/* Estilos para la columna de acciones (iconos) */
.acciones > div {
    display: flex;
    gap: 12px; /* Espacio entre iconos */
    justify-content: center; /* Centrado de iconos */
    white-space: nowrap; /* Evita el salto de línea para iconos */
}
</style>
