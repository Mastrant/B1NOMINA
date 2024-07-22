<template>
    <div class="conted"> 
        <!-- Contenedor principal que envuelve la tabla y otros elementos -->
        
        <!-- Tabla para mostrar las asignaciones de préstamos -->
        <table class="TablaEmpleados">
            <!-- Encabezado de la tabla que define las columnas -->
            <tr class="rowTabla encabezado">
                <!-- Columna para el concepto del préstamo -->
                <th class="">
                    CONCEPTO 
                </th>
                <!-- Columna para la descripción del préstamo -->
                <th class="">
                    DESCRIPCION
                </th>
                <!-- Columna para el valor del préstamo -->
                <th class=""> 
                    VALOR
                </th>
                <!-- Columna para el número de cuotas del préstamo -->
                <th class=""> 
                    CUOTAS
                </th>
                <!-- Columna para el estado del préstamo (pagado, por pagar) -->
                <th class=""> 
                    ESTADO
                </th>
                <!-- Columna para las acciones disponibles sobre cada préstamo -->
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!-- Final del encabezado -->

            <!-- Iteración sobre la lista de préstamos para renderizar cada fila -->
            <AsignacionesPrestamosRow v-for="prestamo in ListadoPrestamos" :key="prestamo?.id">
                <!-- Uso de slots personalizados para insertar contenido específico en cada columna -->
                
                <!-- Slot para el concepto del préstamo, mostrando la descripción -->
                <template v-slot:CONCEPTO>
                    {{prestamo?.descripcion}}
                </template>
                <!-- Slot para la descripción del préstamo, mostrando nuevamente la descripción -->
                <template v-slot:DESCRIPCION>
                    {{prestamo?.descripcion}}
                </template>
                <!-- Slot para el valor del préstamo, mostrando el monto y añadiendo el símbolo de dólar -->
                <template v-slot:VALOR>
                    {{prestamo?.monto}} $
                </template>
                <!-- Slot para las cuotas del préstamo -->
                <template v-slot:cuotas>
                    {{prestamo?.cuotas}}
                </template>
                <!-- Slot personalizado sin nombre (usando #estado) para mostrar el estado del préstamo -->
                <template #estado>
                    <!-- Componente StatusButton para mostrar si el préstamo está pagado o por pagar -->
                    <StatusButton 
                        v-show="prestamo?.estado == 2"
                        texto="Pagado"
                    />
                    <StatusButton 
                        v-show="prestamo?.estado == 1"
                        texto="Por pagar"
                        color1="#1A245B"
                        color2="#CDE0F1"
                    />
                </template>
                <!-- Slot para las acciones disponibles sobre cada préstamo -->
                <template v-slot:ACCIONES>
                    <!-- Componente ViewIcon para la acción de ver cuotas -->
                    <ViewIcon Stroke="#1A2771" text="Ver cuotas" @click="emit('verCuotas', prestamo?.detalle_cuotas)"/>
                    <!-- Componente TrashIcon para la acción de eliminar el préstamo -->
                    <TrashIcon Stroke="#1A2771" text="Eliminar" @click="emit('eliminarPrestamo', prestamo)"/>
                </template>
            </AsignacionesPrestamosRow>
            <!-- Final del cuerpo de la tabla -->
        </table>        

        <!-- Comentario sobre un elemento de paginación que podría ser implementado -->
        <!-- elemento para paginación
            <div class="espacio-paginacion" v-if="listadoPrestamos.length > 12">
                <SeleccionarPaginacion @valorSelecionado="asignarValor"/>
                <Paginacion :totalPaginas="totalpaginas()" @NumeroSelecionado="getDataPorPagina"/>
            </div>
            
        -->
    </div>
</template>

<script setup>
import TrashIcon from '@/components/icons/trash-icon.vue'
import ViewIcon from '@/components/icons/Ojito-icon.vue'
import AsignacionesPrestamosRow from '@/components/tablas/perfilEmpleado/asignaciones/AsignacionesPrestamos-row.vue';


import StatusButton from '@/components/botones/Status-button.vue';

import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const sociedadId = route.params.sociedadId;

// Define los props
const props = defineProps({
  Listado: {
    type: Object,
    default: () => []
  }
});
const emit = defineEmits([
    'upData',
    'actualizar_Lista',
    'eliminarPrestamo',
    'mostrarNotificacion',
    'verCuotas',
]);

// Accede a la lista de empleados desde props
const ListadoPrestamos = ref(props.Listado);


//al cambiar los datos reinicia el renderizado
watchEffect(() => {
  ListadoPrestamos.value = props.Listado;
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    ListadoPrestamos.value = props.Listado;
});

/* Codigo para paginacion de ser necesario

// Accede a la lista de empleados desde props
const listadoPrestamos = ref(props.Listado);

//configuracion del paginado
const DatosPaginados = ref([]); //arreglo con los datos picados
const paginaActual = ref(1); //inicializacion de la pagina
const elementosPorPagina = ref(24); //numero de filas por pagina

const asignarValor = (Numero) => {
    elementosPorPagina.value = Numero;
}

//total de paginas
const totalpaginas = () => {
    //devuelve el numero de paginas segun los datos y redondea el resultado
    return Math.ceil(listadoPrestamos.value.length / elementosPorPagina.value);
};

//optener data segun la pagina
function getDataPorPagina(numeroPagina){
    //vacia la lista al cambiar iniciar

    //si el valor de numeroPagina es null o undefined le asigna 1
    (numeroPagina == undefined || numeroPagina == null)
        ? numeroPagina = 1
        : paginaActual.value = numeroPagina;   
    
    DatosPaginados.value = ([]);

    //rango del indice
    let ini = (numeroPagina * elementosPorPagina.value) - elementosPorPagina.value;
    let fin = (numeroPagina * elementosPorPagina.value);
    
    //recorre los datos de lista y los indexa en la paginacion
    DatosPaginados.value = listadoPrestamos.value.slice(ini, fin)
};


//al cambiar los datos reinicia el renderizado
watchEffect(() => {
    listadoPrestamos.value = props.Listado;
  //al detectar el cambio en la lista solicita los datos
  getDataPorPagina();
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    listadoPrestamos.value = props.Listado;
});
*/
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
    height: 100%;
}
</style>
