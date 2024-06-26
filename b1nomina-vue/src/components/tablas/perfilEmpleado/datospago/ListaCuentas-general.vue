<template>
    <div class="conted"> 
        <!--Contenedor de la tabla-->
        <table class="TablaEmpleados">
            <!--Encabezado de la tabla-->
            <tr class="rowTabla encabezado">

                <th class="">
                    BANCO 
                </th>
                <th class="">
                    TIPO DE CUENTA
                </th>
                <th class=""> 
                    NÚMERO DE CUENTA
                </th>
                <th class=""> 
                    DE TERCERO
                </th>
                <th class=""> 
                    AUTORIZACION
                </th>
                <th class=""> 
                    ESTADO
                </th>
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!--Final encabezado-->

            <!--Cuerpo de la tabla-->
            <ListaCuentasrow>

                <!--Nombre y apelidos-->
                <template v-slot:banco>
                    BBVA Chile
                </template>
                <!--Rut-->
                <template v-slot:tipoCuenta>
                    Corriente
                </template>
                 <!--Cargo-->
                <template v-slot:NumeroCuenta>
                    000 000 000
                </template>
                <!--Saladio / sueldo-->
                <template v-slot:Tercero>
                   <input type="checkbox">
                </template>
                <template v-slot:Autorizacion>
                    <WaitButton Texto="En Proceso"/>
                    <CorrectButton texto="Completada"/>
                    <DescartarButton texto="Caducada"/>                
                </template>
                <template v-slot:estado>
                    <InterruptorButton
                        Tipo="individual"
                        :Texto="(2 === 0)? 'Activo': 'Inactivo'"
                        :Estado="(2 === 0)? true : false"
                    />
                </template>
                <!--Estado-->
                <template v-slot:ACCIONES>
                    <EditIcon Stroke="#1A2771" text="Editar" />
                    <TrashIcon Stroke="#1A2771" text="Eliminar" />
                </template>
            </ListaCuentasrow>
            <!--Final cuerpo-->
        </table>        
        
    </div>
   
</template>

<script setup>
import TrashIcon from '@/components/icons/trash-icon.vue'
import EditIcon from '@/components/icons/Edit-icon.vue'
import ListaCuentasrow from '@/components/tablas/perfilEmpleado/datospago/ListaCuentas-row.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

import WaitButton from '@/components/botones/Wait-button.vue';
import CorrectButton from '@/components/botones/Correct-button.vue';
import DescartarButton from '@/components/botones/Descartar-button.vue';

import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

import { useRoute } from 'vue-router';

import almacen from '@/store/almacen.js';

const route = useRoute();
const sociedadId = route.params.sociedadId;

// Define los props
const props = defineProps({
  ListadoPrestamos: {
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
const ListadoPrestamos = ref(props.ListadoPrestamos);


const upData = (arrayData) => {
    // Convertir el objeto proxy a un array real
    const arrayReal = [...arrayData];
    emit('upData', arrayReal);
};


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
    return Math.ceil(ListadoPrestamos.value.length / elementosPorPagina.value);
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
    DatosPaginados.value = ListadoPrestamos.value.slice(ini, fin)
};


//al cambiar los datos reinicia el renderizado
watchEffect(() => {
  ListadoPrestamos.value = props.ListadoPrestamos;
  //al detectar el cambio en la lista solicita los datos
  getDataPorPagina();
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    ListadoPrestamos.value = props.ListadoPrestamos;
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
    height: 100%;
}
</style>
