<template>
    <div class="conted">
        <!--Tabla con los datos-->
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
                    <WaitButton @click="ActionButton(1,1,item.id)"/>
                    <DescartarButton @click="ActionButton(1,2,item.id)"/>
                    <CorrectButton />
                </template>
                <template v-slot:Contrato>
                    <WaitButton @click="ActionButton(1,3,item.id)"/>
                    <DescartarButton @click="ActionButton(1,4,item.id)"/>
                    <CorrectButton />
                </template>
                <template v-slot:Completado>
                    <EBarraProgresoVue class="icon" porcentaje="15"/>
                </template>
                <template v-slot:accionButton>
                    <CiculoCorrectIcon 
                        @click="ActionButton(2,1,item.id)"
                        class="icon" 
                        style="stroke: #1A245B"
                    />
                    <ExitColorIcon
                        @click="ActionButton(2,2,item.id)" 
                        class="icon" 
                        style="stroke: #1A245B" 
                    />
                </template>
            </EnContratacionRow>
        </table>
        <!--Modales-->
        <TemplateModal 
            @closeModal="showModal" 
            :FormId="IDFormModal"
            :NombreAccion="TituloModal" 
            :textSubmit="TextoButton"
            :activarModal="activarModal"
            :ModalActivo="modalActivo"
            :DataNotification="checkfile"
            
        >
            <template #default><!--Espacio para los formularios -->
                <div v-if="formActivo==1"> <!--Cargar Curriculum-->
                    <LayoutForm>
                        <template v-slot:cabecera>
                            <NavButtonTemplate text="Cargar Curriculum Vitae" :seleccionado="panelShow== 1" @click="showInfo(1)" />
                            <NavButtonTemplate text="Descartar esta acción" :seleccionado="panelShow== 2" @click="showInfo(2)" />  
                        </template>
                        <template v-slot:formulario>
                            <div class="contenedorInfo" v-if="panelShow == 1">
                                <form @submit.prevent="cargarCV" id="CargarDescartarCV" >
                                    <p>En esta sección puedes cargar el Curriculum Vitae del prospecto y tener un soporte anexado al perfil del mismo. </p>
                                    <h3>Cargar Curriculum Vitae</h3>
                                    <InputDocsForm2
                                        @respuesta="checkFile"
                                        @actualizarDocumento="actualizarValorCV"
                                        ref="InputCV"
                                    />
                                </form>
                            </div>
                            <div class="contenedorInfo"  v-if="panelShow == 2">
                                <form @submit.prevent="descartarCV" id="CargarDescartarCV">
                                    <p>
                                        Descarta esta acción si no quieres realizar el proceso de <span> Cargar Curriculum Vitae</span> al prospecto. Una acción descartada cuenta como un proceso "Completado".
                                    </p>
                                </form>
                            </div>
                        </template>
                    </LayoutForm>
                </div>
                <div v-if=" formActivo == 2"> <!--retomar Curriculum-->                    
                    <div class="contenedorInfo" v-show="panelShow == 1">
                        <form @submit.prevent="retomarCV" id="retomarCV" >
                            <p>En caso de que desees retomar el proceso de  <span> cargar  </span>a este prospecto, da clic enretomar acción. </p>                            
                        </form>
                    </div>
                </div>
                <div v-if="formActivo == 3"><!--Cargar contrato-->
                    <LayoutForm>
                        <template v-slot:cabecera>
                            <NavButtonTemplate text="Firma del contrato" :seleccionado="panelShow== 1" @click="showInfo(1)" />
                            <NavButtonTemplate text="Descartar esta acción" :seleccionado="panelShow== 2" @click="showInfo(2)" />  
                        </template>
                        <template v-slot:formulario>
                            <div class="contenedorInfo" v-show="panelShow == 1">
                                <form @submit.prevent="cargarContrato" id="CargarDescartarContrato" >
                                    <p>Recoge firmas de contratos cómo de una forma rápida y segura, cargando aquí tus documentos y permitiendo que las personas firmen desde su correo electrónico. </p>
                                    <h3>Cargar contrato</h3>
                                    <InputDocsForm2
                                        @respuesta="checkFile"
                                        @actualizarDocumento="actualizarValorContrato"
                                        ref="InputContrato"
                                    />
                                    <h3>Quiénes firman este documento</h3>
                                </form>
                            </div>
                            <div class="contenedorInfo"  v-show="panelShow == 2">
                                <form @submit.prevent="descartarContrato" id="CargarDescartarContrato">
                                    <p>
                                        Descarta esta acción si no quieres realizar el proceso de <span> Enviar Firma Electrónica del Contrato </span> al prospecto. Una acción descartada cuenta como un proceso "Completado".   
                                    </p>                                    
                                </form>
                            </div>
                        </template>
                    </LayoutForm>
                </div>
                <div v-if=" formActivo == 4"> <!--retomar contrato-->                    
                    <div class="contenedorInfo" v-show="panelShow == 1">
                        <form @submit.prevent="retomarContrato" id="retomarContrato" >
                            <p>En caso de que desees retomar el proceso de  <span> cargar el contrato </span>a este prospecto, da clic enretomar acción. </p>                          
                        </form>
                    </div>
                </div>
            </template>
        </TemplateModal>

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
    import InputDocsForm2 from '@/components/inputs/Input-Docs-form2.vue';
    import CorrectButton from '@/components/botones/Correct-button.vue';
    import { ref, defineProps, watchEffect, onMounted, defineEmits} from 'vue';
    import almacen from '@/store/almacen.js'
    import axios from 'axios';

    // Define los props
    const props = defineProps({
    listaEmpleados: {
        type: Array,
        default: () => []
    }
    });

    //almacen de los inputs
    const Contrato = ref('');
    const CV = ref({});
    const idCreator = almacen.userID;

    const emit = defineEmits([
        'ActualizarData',
    ]);
    //referencia de los inputs
    const InputCV = ref(null);
    const InputContrato = ref(null);

    

    /////////// programacion de los modales de activacion ///////////////
    const activarModal = ref(false)
    const formActivo = ref(1)
    const TextoButton = ref('')
    const TituloModal = ref('')
    const EmpleadoID_Selecionado = ref(null)
    const modalActivo = ref(0)
    const IDFormModal = ref('')

    /**
    * Controla el despliegue del modal
    * @param mostrarModal
    */
    const showModal = (Id_modal) => {
        activarModal.value = !activarModal.value;
        modalActivo.value = Id_modal;
    };

    const panelShow = ref(1)
    const showInfo = (id) => {
        panelShow.value = id
        if (id == 1){
            TextoButton.value = "Guardar Documento"
        } else {
            TextoButton.value = "Descartar Acción"
        } 
    }

    /**
     * Se ejecuta desde los botones de la tabla de Encontratacion
     * Controla los modales y los formularios activos
     * @param {Number} IdModal Modal a mostrar
     * @param {Number} TipoAccion cargarCV > 1, retomarCV > 2, CargarContrato > 3,  retomarContrato > 4,
     * @param {*}  item_ID 
     */
    const ActionButton = (IdModal = 0, TipoAccion = 0, item_ID = 0) => {
        if (IdModal == 1){
            switch (TipoAccion) {
            case 1:                
                formActivo.value = 1;
                panelShow.value = 1;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Guardar Documento';
                TituloModal.value = 'Cargar Curriculum Vitae / Hoja de vida';
                IDFormModal.value = 'CargarDescartarCV';
                InputCV.value?.reset();
                CV.value = ''

                showModal(IdModal)
                break;
            case 2:
                console.log("cargar retomarCV")
                
                formActivo.value = 2;
                EmpleadoID_Selecionado.value = item_ID;
                TituloModal.value = 'Esta acción ha sido descartada';
                TextoButton.value = 'Retomar Acción';
                IDFormModal.value = 'retomarCV';
                showModal(IdModal)

                break;
            case 3:
                console.log("cargar Contrato")
                panelShow.value = 1;
                formActivo.value = 3;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Guardar Documento';
                TituloModal.value = 'Firma del contrato';
                IDFormModal.value = 'CargarDescartarContrato';
                Contrato.value = '';
                InputContrato.value?.reset();                

                showModal(IdModal)
                break;
            case 4:
                console.log("retomar Contrato")

                formActivo.value = 4;
                EmpleadoID_Selecionado.value = item_ID;
                TituloModal.value = 'Esta acción ha sido descartada';
                TextoButton.value = 'Retomar Acción';
                IDFormModal.value = 'retomarContrato';
                showModal(IdModal)
                break;
            case 5:
                
                break;        
            default:
                // código a ejecutar si la expresión no coincide con ninguno de los valores anteriores
            }
        }
        
    };

    const checkfile = ref({})
    /**
     * Cambia el valor de lanotificacion del modal
     * @param {Objeto} respuesta Recive el diccionario necesario para mostrar la notificacion del modal
    */
    const checkFile = (respuesta) => {
        checkfile.value = respuesta
    };

    /**
 * Actualiza el valor del CV con los datos proporcionados.
 * 
 * @param {File} Datos - Objeto File que contiene los datos del CV.
 * @example
 * const datosCV = new File([""], "cv.pdf", { type: "application/pdf" });
 * actualizarValorCV(datosCV);
 */
const actualizarValorCV = (Datos) => {
    CV.value = Datos.value;
}

/**
 * Actualiza el valor del contrato con los datos proporcionados.
 * 
 * @param {File} Datos - Objeto File que contiene los datos del contrato.
 * @example
 * const datosContrato = new File([""], "contrato.pdf", { type: "application/pdf" });
 * actualizarValorContrato(datosContrato);
 */
const actualizarValorContrato = (Datos) => {
    CV.value = Datos.value;
}

    const cargarCV = async () => {
        const formData = new FormData();
        formData.append('File', CV.value); // Asume que 'Datos' es un objeto File
        if(CV.value != undefined && CV.value != '') {
            //logica para cargar CV con axios
            console.log("subir CV " + EmpleadoID_Selecionado.value)
        } else {
            checkfile.value = {'texto':'El campo esta vacio', 'valor':false};
        }
        /*
        if(CV.value != {}) {
            await axios.post(`/user/bulk_load_users?sociedadId=${idCreator}&creatorUserId=${idCreator}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(
            // Maneja la respuesta exitosa.
            res => {
                // Verifica si la respuesta tiene un estado HTTP 200 (OK).
                if (res.status == 200 || res.status == 201 ){
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
                    console.log(res)   
                }
            }
            )
            .catch(
            // Maneja los errores de la solicitud.
            err => {
                // Verifica si la respuesta del error contiene un objeto de respuesta.
                if (err.response) { 
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                    console.log(err)           
                }
            }
            );
        } else {
            emit("respuesta", {'texto':'El campo esta vacio', 'valor':false})
        }
        */
    }

    const descartarCV = async () => {
        console.log("decartar" + EmpleadoID_Selecionado.value)
    }

    const retomarCV = () => {
        console.log("retomar CV")

        formActivo.value = 1;
        panelShow.value = 1;
        TextoButton.value = 'Guardar Documento';
        TituloModal.value = 'Cargar Curriculum Vitae / Hoja de vida';
        IDFormModal.value = 'CargarDescartarCV';
        InputCV.value?.reset();
        CV.value = ''
    }

    const cargarContrato = async () => {
        const formData = new FormData();
        formData.append('File', Contrato.value); // Asume que 'Datos' es un objeto File
        if(Contrato.value != undefined && CV.value != '') {
            //logica para cargar CV con axios
            console.log("subir CV " + EmpleadoID_Selecionado.value)
        } else {
            checkfile.value = {'texto':'El campo esta vacio', 'valor':false};
        }
    }

    const descartarContrato = async () => {
        console.log("decartar" + EmpleadoID_Selecionado.value)
    }

    const retomarContrato = () => {
        console.log("retomar Contrato")

        formActivo.value = 3;
        panelShow.value = 1;
        TextoButton.value = 'Guardar Documento';
        TituloModal.value = 'Cargar Curriculum Vitae / Hoja de vida';
        IDFormModal.value = 'CargarDescartarContrato';
        InputContrato.value?.reset();
        Contrato.value = '';
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
    const getDataPorPagina = (numeroPagina) => {
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
.TablaEncontratacion {
    width: 100%; /* Asegura que la tabla ocupe el ancho completo del contenedor */
    box-sizing: border-box;
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


form h3 {
    color: #1A245B;
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    word-wrap: break-word;
}

form p {
    color: black;
    font-size: 16px;
    font-weight: 400;
    line-height: 36px;
    text-align: justify;
    
}

form p > span {
    color: black;
    font-size: 16px;
    font-weight: 600;
    line-height: 36px;
    word-wrap: break-word;
}
</style>