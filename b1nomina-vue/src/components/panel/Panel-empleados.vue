<template>
    <div class="panel-empleados">
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch v-model="shearch" @update:modelValue="shearch = $event" />

                <ListaTemplate v-model="filtroSede" :options="ListaSedes" optionsSelected="Sede"/>
                <ListaTemplate v-model="filtroDepartamento" :options="ListaDepartamentos" optionsSelected="Departamento"/>
                <ListaTemplate v-model="filtroGrupo" :options="ListaGrupos" optionsSelected="Grupo"/>
            </div>     
            <!--contenedor-->
            <div class="Add-user-button">
                <!--Boton para agregar usuarios-->
                <TemplateButton text="Agregar Empleado" @click="showOptions">
                    <template #default >
                        <PersonPlussIcon/>
                    </template>
                </TemplateButton>
                
                <!--Lista de opciones que se despliega-->
                <ListaOpciones v-show="mostrarOpciones" @mouseleave="mostrarOpciones = !mostrarOpciones">
                    <template #opcion1>
                        <!--Boton de carga basica-->
                        <BigOptionButton 
                            Accion="Crear empleado"
                            Texto="Agrega un nuevo empleado y accede directamente a su perfil para completar sus datos."
                            @click="showModal(1)"
                        />
                    </template>

                    <template #opcion2>
                        <!--Boton de carga masiva-->
                        <BigOptionButton  
                            Accion="Importación Masiva"
                            Texto="Importa de forma masiva los campos personalizados de tus empleados desde un único archivo, para crear múltiples empleados a la vez."
                            @click="showModal(2)"
                        />
                    </template>
                    
                    <template #opcion3>
                        <!--Boton de actualizacion masiva-->
                        <BigOptionButton 
                            Accion="Actualización Masiva"
                            Texto="Actualiza de forma masiva los campos personalizados para todos los empleados desde un único archivo."
                            @click="showModal(3)"
                        />
                    </template>
                </ListaOpciones>
            </div><!--final contenedor add user-->

        </div><!--final contenedor acciones-form-->

        <div class="acciones-masivas" v-show="ListaIds.length > 0">
            <ListaTemplate optionsSelected="Acciones en Lote"/>
            <span>Has seleccionado {{ ListaIds.length }} de los {{ 12 }} empleados</span>
        </div>

        <TemplateModal 
            @closeModal="showModal" 
            :activarModal="mostrarModal"
            :FormId="'Form'+idFormularioActivo"
            :DataNotification="dataNotificacion"
            NombreAccion="Nuevo Registro" 
            textSubmit="Guardar"
            :ModalActivo="1"
        >
            <template #default>
            
                <p class="decripcion-modal">
                    La información de la persona será utilizada para ayudarte a generar la nómina más rápida que has visto, 
                    recuerda que siempre podrás regresar a editar cualquier valor.
                </p>
                
                <NavForm 
                    :idFormularioActivo="idFormularioActivo" 
                />
                
                <FormDatosBasicos 
                    @nextModal="avanzarForm"
                    @respuesta="sendData" 
                    :EmpleadoID="ID_Usuario_Creado"                    
                    v-show="idFormularioActivo == 1"
                    ref="Form1" 
                />
                
                <FormDatosPersonalesVue 
                    @nextModal="avanzarForm"
                    @respuesta="sendData"
                    :EmpleadoID="ID_Usuario_Creado"
                    :parametros="parametrosDP"
                    v-show="idFormularioActivo == 2"
                    ref="Form2"
                    
                />
                
                <FormDatosLaborales 
                    @nextModal="avanzarForm"
                    @respuesta="sendData"
                    :EmpleadoID="ID_Usuario_Creado"
                    :parametros="parametrosDL"
                    v-show="idFormularioActivo == 3"
                    ref="Form3"
                />

                <FormDatosPago
                    @closeModal="showModal"
                    @respuesta="sendData"
                    :EmpleadoID="ID_Usuario_Creado"
                    :parametros="parametrosDPa"
                    v-show="idFormularioActivo == 4"
                    ref="Form4"
                />
            
            </template>
            
            <template #boton>
                <TemplateButton2 
                    text="Atras" 
                    @click="retrocederForm" 
                    v-show="idFormularioActivo > 1"
                />        
            </template>
        </TemplateModal>

        <TemplateModal 
            @closeModal="showModal" 
            :activarModal="mostrarModal2"
            FormId="FormImport"
            :DataNotification="dataNotificacion"
            NombreAccion="Importación Masiva" 
            textSubmit="Enviar"
            :ModalActivo="2"
        >
            <template #default>
                <FormImportacionMasiva 
                    @respuesta="sendData"
                    ref="FormCargaMasiva"
                />
            </template>
            
        </TemplateModal>

        <!--tabla con los datos-->
        <div class="cuerpo-tabla">
            <span class="NoEncontrado" v-if="(ListaEmpleados.length < 1)? true : false">
                No hay datos asociados a los filtros
            </span>

            <EmpleadosGeneral v-else :listaEmpleados="ListaEmpleados"   @upData="InteraccionListaEmpleadosSelecionados"/>
        </div>
        <AlertShort
            ref="notificacionStatus"
        />
    </div>
</template>

<script setup>
    //componentes
    import InputShearch from '@/components/inputs/Input-shearch.vue';
    import TemplateButton from '@/components/botones/Template-button.vue';
    import TemplateButton2 from '@/components/botones/Template-button2.vue'
    import ListaTemplate from '@/components/listas/Lista-template.vue';
    import EmpleadosGeneral from '@/components/tablas/Empleados/Empleados-general.vue';
    import ListaOpciones from '@/components/listas/Lista-Opciones.vue'
    import BigOptionButton from '@/components/botones/Big-Option-button.vue'
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    import NavForm from '@/components/navs/Nav-form.vue'
    import FormDatosBasicos from '@/components/formularios/Form-datosBasicos.vue';
    import FormDatosPersonalesVue from '@/components/formularios/Form-datosPersonales.vue';
    import FormDatosLaborales from '@/components/formularios/Form-datosLaborales.vue';
    import FormDatosPago from '@/components/formularios/Form-datosPago.vue';
    import AlertShort from '@/components/alertas/Alert-short-template.vue';
    import FormImportacionMasiva from '@/components/formularios/Form-ImportacionMasiva.vue'

    //iconos
    import PersonPlussIcon from '../icons/Person-Pluss-icon.vue';

    //librerias
    import { ref, onMounted, reactive, toRefs, watch, inject  } from 'vue';
    import axios from 'axios';

    // Inyectar el valor proporcionado por la url
    const idSociedad = inject('IDsociedad');

    const ListaIds = ref([]); //Contiene los id de los empleados seleccionados

    //variable con el valor del formulario a mostrar
    const idFormularioActivo = ref(1);
    //arreglo con la data
    const dataNotificacion = ref({})
    
    const sendData = (DATA) => {
        dataNotificacion.value = DATA //asigna el valor
    }

    const ID_Usuario_Creado = ref('')

    const InteraccionListaEmpleadosSelecionados = (arreglo) => {
        // Convertir el objeto proxy a un array real
        ListaIds.value = Array.from(arreglo);
        //console.log(ListaIds.value); // Ahora debería mostrar un array real
    }

    //toma la referencia del componente notificacion para utilizar el metodo mostrar
    const notificacionStatus = ref(null)
    const showN = (Data) => {
    notificacionStatus.value.ActivarNotificacion(
       Data //Formato: {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"}   
    );
}

    //controla la visualizacion de las opciones
    const mostrarOpciones = ref(false);
    /**
     * Controla la visualizacion de la lista de opciones de agregar empleado
     * @param mostrarOpciones - variable que cambia de valor
    */
    const showOptions = () => {
        mostrarOpciones.value = !mostrarOpciones.value
    }

    // Crear referencias a los componentes hijos
    const Form1 = ref(null);
    const Form2 = ref(null);
    const Form3 = ref(null);
    const Form4 = ref(null);

    const limpiarFormularios = () => {
    // Llamar a las funciones de limpieza de cada componente hijo
        Form1.value?.resetForm();
        Form2.value?.resetForm();
        Form3.value?.resetForm();
        Form4.value?.resetForm();
        ID_Usuario_Creado.value = null
    };

    const mostrarModal = ref(false)
    const mostrarModal2 = ref(false)
    const mostrarModal3 = ref(false)

    /**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
    const showModal = (Id_modal) => {
        if(Id_modal == 1){
            limpiarFormularios();
            if(idFormularioActivo.value != 1 && mostrarModal.value == true){
                showN(
                    {
                    'Titulo': "Empleado Creado con exito", 
                    'Descripcion': "El proceso de creacion del usuario se ha realizazo con éxito"
                    }
                )
            }
            mostrarModal.value = !mostrarModal.value;
            idFormularioActivo.value = 1;
        } else if(Id_modal == 2){
            mostrarModal2.value = !mostrarModal2.value;

        } else if(Id_modal == 3){
            //console.log("mostrarmodal 3")
            //modal en desarrollo
            mostrarModal3.value = !mostrarModal3.value;
        }
    }

    const retrocederForm = () => {
        if(idFormularioActivo.value > 1){
            idFormularioActivo.value--
        }
        
    };
    const avanzarForm = (idEmpleadoCreado) => {
        ID_Usuario_Creado.value = idEmpleadoCreado;
        if(idFormularioActivo.value < 4){
            idFormularioActivo.value++
        }
    };

    //fin control del modal

    //variables a utilizar de forma reactiva
    const state = reactive({
        ListaEmpleados: [], // areglo con los datos de los empleados
    });

    //lista de sedes
    const ListaSedes = ref([]);
    const filtroSede = ref(0);

    //lista de Departamentos
    const ListaDepartamentos = ref({});
    const filtroDepartamento = ref(0)

    //lista de grupos
    const ListaGrupos = ref([]);
    const filtroGrupo = ref(0)

    //valor ingresado por el usuario
    const shearch = ref('')
    
    //lista de empleados
    const {ListaEmpleados} = toRefs(state);
    
    /**
    * Realiza una solicitud GET a la API para obtener la lista de sedes asociadas a una sociedad.
    *
    * @function pedirSedes
    * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se completa la solicitud.
    *
    * @example
    * // Ejemplo de uso:
    * pedirSedes();
    */
    const pedirSedes = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${idSociedad}/list_sede?page=${1}&records=20`)
        .then(
            (res) => {
                ListaSedes.value = res.data; //asigna el valor de la consulta a la variable
            }
        )
        .catch(
            (err) => {
                if (err.status == 404) {
                    ListaSedes.value = []; //asigna el valor vacio si no hay datos.
                }
                ListaSedes.value = [];
            }
        )
    };

    /**
    * Función asíncrona que solicita a la API los datos de los Departamentos y los asigna al componente ListaTemplate.
    *
    * @async
    * @function pedirDepartamentos
    * @returns {Promise<void>} No devuelve nada, pero actualiza el estado de ListaDepartamentos con los datos obtenidos.
    * @throws {Error} Si la solicitud falla, se lanza un error y ListaDepartamentos se establece en un array vacío.
    */
    const pedirDepartamentos = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_departamentos?page=${1}&records=20`, {"id": idSociedad})
        .then(
            (res) => {
                ListaDepartamentos.value = res.data;  //asigna el valor de la consulta a la variable
            }
        )
        .catch(
            (err) => {
                if (err){
                    ListaDepartamentos.value = []; //asigna el valor vacio a la variable
                }
            }
        )
    };

    /**
    * Función asíncrona que solicita a la API los datos de los Departamentos y los asigna al componente ListaTemplate.
    *
    * @async
    * @param idSociedad parametro que recibe de los props
    * @function pedirDepartamentos
    * @returns {Promise<void>} No devuelve nada, pero actualiza el estado de ListaGrupos con los datos obtenidos.
    * @throws {Error} Si la solicitud falla, se lanza un error y ListaGrupos se establece en un array vacío.
    */
    const pedirGrupos = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_grupos_empleados`)
        .then(
            (res) => {
                ListaGrupos.value = res.data;  //asigna el valor de la consulta a la variable
            }
        )
        .catch(
            (err) => {
                console.log(err)
                ListaGrupos.value = [];  //asigna vacio a la data sino hay respuesta
            }
        )
    };  
    
    /**
    * Solicita a la API los datos de los empleados y los almacena en el componente ListaTemplate como props.
    *
    * @async
    * @function pedirEmpleados
    * @param parametrosPeticionEmpleados Json con los datos de la consulta
    * @returns {Promise<void>} No devuelve nada, pero actualiza el valor de ListaEmpleados.
    *
    * @example
    * // Llamada a la función para obtener los datos de los empleados
    * pedirEmpleados();
    *
    * @throws {Error} Si ocurre un error durante la solicitud, se asigna un array vacío a ListaEmpleados.
    */
    const pedirEmpleados = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_empleados`)
        .then(
            (res) => {
                ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                ListaEmpleados.value = []; // si hay un error asigna un valor vacio
            }
        )
    };

    //parametros a pasar con la peticion
    const parametrosPeticionEmpleados = {
        "departamento_id": 0,
        "grupo_id": 0,
        "sede_id": 0
    };

    /**
    * Solicita a la API los datos de los empleados según el filtro proporcionado y los almacena en ListaEmpleados.
    *
    * @async
    * @function pedirEmpleado2
    * @returns {Promise} - Una promesa que se resuelve cuando la solicitud HTTP se completa.
    * @throws {Error} - Si ocurre un error durante la solicitud HTTP, se lanzará un error.
    *
    * @example
    * // Llamar a la función para obtener empleados con ciertos parámetros desde la api
    * pedirEmpleado2();
    */
    const pedirEmplead2 = async () => {
        await axios.post(`/sociedad/${idSociedad}/searchsdg`, parametrosPeticionEmpleados)
        .then(
            (res) => {
                ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                if (err){
                    ListaEmpleados.value = []; //muestra el error
                }
            }
        )
    };

    //parametros formularios
    const parametrosDP = ref({
        nacionalidad: [],
        estadocivil: [],
        regiones: [],
        localidad: [],
    });
    const parametrosDL = ref({
        tipocontrato: [],//
        terminocontrato: [],//
        tiposalario: [], //
        sede: [],//
        departamento: [],//
        cargos: [],//
        grupos: [],//
        nivelestudio: [],//
        unidadessueldo: [],

    });    
    const parametrosDPa = ref({
        bancos: [],        
    });
    
    // Realiza una solicitud GET a la API para obtener parámetros
    const pedirParametros = async () => {
        axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`)
        .then(
            (respuesta) => {              
                // Verifica y procesa los parámetros recibidos para cada categoría
                // Asegúrate de que las propiedades existan dentro de 'respuesta.data.parametros'

                // Mapeo de claves de respuesta.data.parametros a propiedades de destino
                const mapeoParametros = {
                    nacionalidad: 'nacionalidad',
                    estadocivil: 'estadocivil',
                    regiones: 'regiones',
                    localidad: 'localidad',
                    bancos: 'bancos',
                    tipocontrato: 'tipocontrato',
                    terminocontrato: 'terminocontrato',
                    tiposalario: 'tiposalario',
                    sede: 'sede',
                    departamentos: 'departamento',
                    cargos: 'cargos',
                    grupos: 'grupos',
                    unidadessueldo: 'unidadessueldo',
                    nivelestudio: 'nivelestudio'
                };

                // Función para asignar valores a los objetos de destino
                function asignarValores(parametros, objetoDestino) {
                    for (const clave in parametros) {
                        if (parametros.hasOwnProperty(clave) && mapeoParametros[clave]) {
                            const propiedadDestino = mapeoParametros[clave];
                            if (objetoDestino[propiedadDestino]) {
                                objetoDestino[propiedadDestino].push(...parametros[clave]);
                            }
                        }
                    }
                }

                // Asignación de valores
                asignarValores(respuesta.data.parametros, parametrosDP.value);
                asignarValores(respuesta.data.parametros, parametrosDPa.value);
                asignarValores(respuesta.data.parametros, parametrosDL.value);
            }
        )
        .catch(
            err => {
                // Maneja errores de la solicitud
                console.log(err)
            }
        )
    }

    //filtros
    /**
    * Asigna el valor de "departamento" al arreglo de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna  0 a 'departamento_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'departamento_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor del departamento que se asignará.
    * @returns {void} Modifica el objeto 'parametrosPeticionEmpleados.departamento_id'.
    */
    const addDepartamento = (valor) => {
        if (valor == '' || valor == null) {
            // si el valor de la seleccion es texto o nulo asigna 0
            parametrosPeticionEmpleados.departamento_id = 0;
        } else {
            //si el valor es un numero, asigna el valor en entero al arreglo
            parametrosPeticionEmpleados.departamento_id = parseInt(valor);         
        }
        (parametrosPeticionEmpleados.departamento_id === 0 & parametrosPeticionEmpleados.grupo_id === 0 & parametrosPeticionEmpleados.sede_id === 0)
        ? pedirEmpleados() //si los valores de parametrosPeticionEmpleados son 0
        : pedirEmplead2(); //si los valores de parametrosPeticionEmpleados varian de 0        
    };

    /**
    * Asigna el valor de "sede" al objeto de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna   0 a 'sede_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'sede_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor de la sede que se asignará.
    * @returns {void} No devuelve ningún valor, pero modifica el objeto 'parametrosPeticionEmpleados'.
    */ 
    const addSede = (valor) => {
        if (valor == '' || valor == null) {
            //si el valor es vacio o nulo, asigna 0
            parametrosPeticionEmpleados.sede_id = 0
        }else {
            //convierte el valor a entero y lo guarda en el arreglo
            parametrosPeticionEmpleados.sede_id = parseInt(valor);
        }

        //solicita la actualizaion de los datos
        (parametrosPeticionEmpleados.departamento_id === 0 & parametrosPeticionEmpleados.grupo_id === 0 & parametrosPeticionEmpleados.sede_id === 0)?
        pedirEmpleados(): //si los valores de parametrosPeticionEmpleados son 0
        pedirEmplead2(); //si los valores de parametrosPeticionEmpleados varian de 0     
    };

    /**
    * Asigna el valor de "grupo" al arreglo de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna  0 a 'grupo_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'grupo_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor del grupo que se asignará.
    * @returns {void} No devuelve ningún valor, pero modifica el objeto 'parametrosPeticionEmpleados'.
    */ 
    const addGrupo = (valor) => {
        if (valor == '' || valor == null) {
            parametrosPeticionEmpleados.grupo_id = 0
        } else {
            //convierte el valor a entero y lo guarda en el arreglo
            parametrosPeticionEmpleados.grupo_id = parseInt(valor);
        }
       
        //solicita la actualizaion de los datos
        (parametrosPeticionEmpleados.departamento_id === 0 & parametrosPeticionEmpleados.grupo_id === 0 & parametrosPeticionEmpleados.sede_id === 0)?
        pedirEmpleados(): //si los valores de parametrosPeticionEmpleados son 0
        pedirEmplead2(); //si los valores de parametrosPeticionEmpleados varian de 0     
    };

    // Arreglo que contiene el arreglo original
let listaEmpleadosOriginal = null;
/**
     * aplica un filtro segun el texto ingresado
     * @param {String} text - entrada del texto del usuario
    
    */
    const filtrar = (text) => {
    // Si la lista original no está establecida, guarda la lista actual como la original
    if (listaEmpleadosOriginal === null) {
        listaEmpleadosOriginal = [...ListaEmpleados.value];
    }

    // Si el texto es vacío, restablece la lista mostrada a la lista original
    if (text.trim() === '') {
        ListaEmpleados.value = [...listaEmpleadosOriginal];
        return;
    }

    // Normaliza el texto de búsqueda
    let normalizarText = text?.toLowerCase().trim();

    // Filtra la lista original basándose en el texto de búsqueda
    const filtrado = listaEmpleadosOriginal.filter(
        (empleado) => empleado.nombre?.toLowerCase().includes(normalizarText) ||
        empleado.apellido_paterno?.toLowerCase().includes(normalizarText) ||
        empleado.rut?.includes(normalizarText)
    );

    // Actualiza la lista mostrada con los resultados filtrados
    ListaEmpleados.value = filtrado;
};

    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroSede, addSede);
    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroDepartamento, addDepartamento);
    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroGrupo, addGrupo);
    //escucha los cambios en la variable y ejecuta la funcion filtrar
    watch(shearch, filtrar);

    // al montar el componente ejecuta las funciones
    onMounted(async () => {

        await pedirEmpleados(); //solicita los empleados
        await pedirSedes(); //solicita las sedes disponibles
        await pedirDepartamentos(); //solicita los departamentos
        await pedirGrupos(); //solicita los grupos
        await pedirParametros(); //solicita los parametros para crear usuarios
        
    });
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-empleados {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}

/* 
 Sección de acciones del formulario, distribuye los elementos en una fila y justifica el espacio entre ellos
 para una distribución equilibrada.
*/
div.acciones-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

/* 
 Sección de filtros, organiza los elementos en una fila con un espaciado específico entre ellos para
 una fácil navegación y selección de filtros.
*/
div.filtros {
    display: flex;
    flex-direction: row;
    gap: 12px; /* Espaciado entre los elementos de filtro para mantener la interfaz limpia y ordenada */
}

/* 
 Acciones masivas, asegurando que los elementos estén alineados verticalmente en el centro y tengan
 un espaciado específico entre ellos para una presentación clara y organizada.
*/
div.acciones-masivas{
    display: flex;
    gap: 24px; /* Espaciado entre los elementos de acción masiva para una distribución equilibrada */
    align-items: center; /* Alineación vertical de los elementos para una mejor estética y usabilidad */
}

/* 
 Mensaje de "No encontrado", ajustando el tamaño de fuente y el color para proporcionar un feedback
 visual adecuado al usuario.
*/
span.NoEncontrado {
    font-size: 24px;
    color: rgb(56, 56, 56); /* Color gris oscuro para mantener un tono coherente con el diseño */
}

/* 
 Botón de agregar usuario, asegurando que su contenido tenga una posición superior en el eje Z para
 garantizar que se muestre correctamente sobre otros elementos.
*/
div.Add-user-button > div {
    z-index: 50; /* Posicionamiento en el eje Z para asegurar la visibilidad del botón */
}

/* 
 Párrafo dentro del modal, ajustando el margen, alineación del texto y estilos de fuente para una
 mejor legibilidad y presentación del contenido.
*/
p.decripcion-modal{
    margin: 0; /* Elimina el margen por defecto para mantener un diseño limpio */
    text-align: justify; /* Justifica el texto para una lectura más fluida */
    font-size: 16px; /* Tamaño de fuente adecuado para facilitar la lectura */
    font-weight: 400; /* Peso de la fuente para mantener un equilibrio visual */
}
</style>