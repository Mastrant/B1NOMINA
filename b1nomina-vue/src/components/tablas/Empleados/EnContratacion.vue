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
                <template v-slot:Prospecto>
                    {{ item.nombre }} {{ item.apellido_paterno }} {{ item.apellido_materno }}
                </template>
                <template v-slot:rut>
                    {{ item.rut }}
                </template>
                <template v-slot:CV>
                    <WaitButton @click="showModal(1,item.id)"/>
                    <DescartarButton @click="showModal(2,item.id)"/>
                </template>
                <template v-slot:Contrato>
                    <DescartarButton @click="() => console.log(item.id)"/>
                </template>
                <template v-slot:Completado>
                    <EBarraProgresoVue class="icon" porcentaje="15" @click="() => console.log('selecionado')" />
                </template>
                <template v-slot:accionButton>
                    <CiculoCorrectIcon 
                        @click="() => console.log(item.id)"
                        class="icon" 
                        style="stroke: #1A245B"
                    />
                    <ExitColorIcon
                        @click="() => console.log(item.id)" 
                        class="icon" 
                        style="stroke: #1A245B" 
                    />
                </template>
            </EnContratacionRow>
        </table>

        <TemplateModal 
            @closeModal="showModal" 
            FormId="FormSendCV"
            :NombreAccion="TituloModal" 
            :textSubmit="TextoButton"
            :activarModal="activarModal"
            :ModalActivo="1"
        >
            <template #default>
                <div v-if="formActivo==1">
                    <LayoutForm>
                        <template v-slot:cabecera>
                            <NavButtonTemplate text="Cargar Curriculum Vitae" :seleccionado="panelShow== 1" @click="showInfo(1)" />
                            <NavButtonTemplate text="Descartar esta acción" :seleccionado="panelShow== 2" @click="showInfo(2)" />  
                        </template>
                        <template v-slot:formulario>
                            <div class="contenedorInfo" v-if="panelShow ==1">panel 1</div>
                            <div class="contenedorInfo" v-if="panelShow ==2">panel 2</div>
                        </template>
                    </LayoutForm>
                </div>
                <div v-else>
                    formulario contrato
                </div>
            </template>
        </TemplateModal>

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
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    import LayoutForm from '@/components/Layouts/LayoutForm.vue';
    import NavButtonTemplate from '@/components/botones/Nav-button-templateForm.vue';
    import { ref, defineProps, watchEffect, onMounted} from 'vue';

    // Define los props
    const props = defineProps({
    listaEmpleados: {
        type: Array,
        default: () => []
    }
    });

/////////// programacion de los modales de activacion ///////////////
const activarModal = ref(false)
const formActivo = ref(null)
const TextoButton = ref('')
const TituloModal = ref('')
const EmpleadoID_Selecionado = ref(null)
/**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
const showModal = (Id_modal, idEmpleado=null) => {
    
    EmpleadoID_Selecionado.value = idEmpleado
    if(Id_modal == 1){
        activarModal.value = !activarModal.value;
        formActivo.value = 1;
        TextoButton.value = 'Guardar Documento'
        TituloModal.value = 'Cargar Curriculum Vitae / Hoja de vida'
        
    } else if(Id_modal == 2){
        activarModal.value = !activarModal.value;
        formActivo.value = 2;
        TextoButton.value = 'Si, desactivar'
        TituloModal.value = '¿Estás seguro que deseas desactivar a este empleado?'
    } 
};

const panelShow = ref(1)
const showInfo = (id) => {
    panelShow.value = id
}


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
    //al cambiar los datos reinicia el renderizado
    watchEffect(() => {
        ListaEmpleados.value = props.listaEmpleados;
        //al detectar el cambio en la lista solicita los datos
        getDataPorPagina();
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
th {
 word-break: break-word;
 white-space: nowrap;
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

/**
 * Estilos para la columna de nombres de empleados
 * Alinea el texto al inicio y limita el ancho máximo para evitar desbordamientos
 */
th.rowNombre  {
    max-width: 290px;
    text-align: start;
    padding: 24px;
}



/**
 * Estilo para los iconos dentro de las acciones
 * Indica que los iconos son interactivos (clickeables)
 */
.icon { 
    cursor: pointer; /* Cambia el cursor al pasar sobre el icono */
}

</style>