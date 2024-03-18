<template>
    <div class="conted">
        <table class="TablaEncontratacion">
             <!--Encabezado de la tabla-->
             <tr class="rowTabla encabezado">
                <th class="rowNombre">
                    PROSPECTO 
                </th>
                <th class="">
                    RUT
                </th>
                <th class=""> 
                    CV (HOJA DE VIDA)
                </th>
                <th class=""> 
                    CONTRATO
                </th>
                <th class="Estado"> 
                    COMPLETADO 
                </th>
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!--Final encabezado-->

            <EnContratacionRow v-for="(item) in DatosPaginados" :key="item.id">
                {{ item }}
                <template v-slot:Prospecto>
                    Juanito lopez
                </template>
                <template v-slot:rut>
                    1234567-8
                </template>
                <template v-slot:CV>
                    <DescartarButton />
                </template>
                <template v-slot:Contrato>
                    <WaitButton />
                </template>
                <template v-slot:Completado>
                    <EBarraProgresoVue class="icon" porcentaje="15" @click="() => console.log('selecionado')" />
                </template>
                <template v-slot:accionButton>
                    <CiculoCorrectIcon class="icon" style="stroke: #1A245B"/>
                    <ExitColorIcon class="icon" style="stroke: #1A245B" />
                </template>
            </EnContratacionRow>
        </table>
         <!--Fin Tabla-->
         <div class="conted-pagination">
            <!--Espacio para paginacion-->
            <div class="pagination">

            <!--Boton de Previo-->
            <PaginateButton @click="previosPage">
                <template #icono>
                    <img src="@/components/icons/svg/OneLeft-icon.svg" alt="prev"> 
                </template>
            </PaginateButton>

            <!--Listado de opciones-->
            <PaginateButton  v-for="pagina in totalpaginas()" :key="pagina" :texto="pagina" @click="getDataPorPagina(pagina)" />

            <!--Boton de siguiente-->
            <PaginateButton @click="nextPage">
                <template #icono>
                    <img src="@/components/icons/svg/OneRigth-icon.svg" alt="Next"> 
                </template>
            </PaginateButton>
            </div>
        </div>
    </div>
</template>

<script setup>
    import EnContratacionRow from '@/components/tablas/Empleados/EnContratacion-Row.vue';
    import DescartarButton from '@/components/botones/Descartar-button.vue';
    import CiculoCorrectIcon from '@/components/icons/Circulo-correct-icon.vue';
    import ExitColorIcon from '@/components/icons/Exit-color-icon.vue';
    import WaitButton from '@/components/botones/Wait-button.vue';
    import EBarraProgresoVue from '@/components/elementos/E-BarraProgreso.vue';
    import PaginateButton from '@/components/botones/Paginate-button.vue';
    import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

    // Define los props
    const props = defineProps({
    listaEmpleados: {
        type: Array,
        default: () => []
    }
    });

    const ListaEmpleados = ref(props.listaEmpleados);

    //configuracion del paginado
    const DatosPaginados = ref([]); //arreglo con los datos picados
    const paginaActual = ref(1); //inicializacion de la pagina
    const elementosPorPagina = 12; //numero de filas por pagina

    //total de paginas
    const totalpaginas = () => {
        //devuelve el numero de paginas segun los datos y redondea el resultado
        return Math.ceil(ListaEmpleados.value.length / elementosPorPagina);
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
        let ini = (numeroPagina * elementosPorPagina) - elementosPorPagina;
        let fin = (numeroPagina * elementosPorPagina);
        
        //recorre los datos de lista y los indexa en la paginacion
        DatosPaginados.value = ListaEmpleados.value.slice(ini, fin)
    };

    //metodo para retroceder pagina
    const previosPage = () => {
        //evalua si esta al inicio de la paginacion
        if(paginaActual.value > 1){
            paginaActual.value = paginaActual.value - 1; //decrementa la pagina en 1
        }
            //ejecuta la actualizaicon del paginado
        getDataPorPagina(paginaActual.value);
    };

    //metodo para avanzar pagina
    const nextPage = () => {
        //evalua si está al final de la paginacion
        if(paginaActual.value < totalpaginas()){
            paginaActual.value = paginaActual.value + 1; //aumenta la pagina en 1
        }
        //ejecuta la actualizaicon del paginado
        getDataPorPagina(paginaActual.value)
    };
    watch(props.listaEmpleados, () => {
        ListaEmpleados.value = props.listaEmpleados;
        //al detectar el cambio en la lista solicita los datos
        getDataPorPagina();
    })

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
div.contend-pagination {
    width: 100%;
    display: flex;
    justify-content: end;
}
.pagination {
    display: flex;
    width: 100%;
    gap: 4px; /* Espacio entre botones de paginación */
    justify-content: end;
}
.pagination button {
    box-sizing: border-box;
    padding: 4px 12px; /* Espacio interno de los botones de paginación */
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
td,th {
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

/**
 * Estilos para la columna de nombres de empleados
 * Alinea el texto al inicio y limita el ancho máximo para evitar desbordamientos
 */
th.rowNombre,
td.rowNombre > div {
    max-width: 290px;
}

/**
 * Estilos para la columna de estados
 * Utiliza Flexbox para organizar los elementos de estado y centrarlos
 */
td.Estado > div {
    display: flex;
    gap: 10px; /* Espacio entre elementos de estado */
    justify-content: center;
    box-sizing: border-box;
    margin: 0px; /* Sin margen para una alineación precisa */
    align-self: center; /* Centrado verticalmente */
    align-items: center; /* Centrado horizontalmente */
}

/* Estilos para la columna de acciones (iconos) */
.acciones > div {
    display: flex;
    gap: 12px; /* Espacio entre iconos */
    justify-content: center; /* Centrado de iconos */
    white-space: nowrap; /* Evita el salto de línea para iconos */
}

/**
 * Estilo para los iconos dentro de las acciones
 * Indica que los iconos son interactivos (clickeables)
 */
.icon { 
    cursor: pointer; /* Cambia el cursor al pasar sobre el icono */
}

</style>