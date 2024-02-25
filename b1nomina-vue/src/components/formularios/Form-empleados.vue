<template>
    <div class="formulario-empleados" id="formulario-empleados">
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
                            @click="showModal"
                        />
                    </template>

                    <template #opcion2>
                        <!--Boton de carga masiva-->
                        <BigOptionButton  
                            Accion="Importación Masiva"
                            Texto="Importa de forma masiva los campos personalizados de tus empleados desde un único archivo, para crear múltiples empleados a la vez."
                        />
                    </template>
                    
                    <template #opcion3>
                        <!--Boton de actualizacion masiva-->
                        <BigOptionButton 
                            Accion="Actualización Masiva"
                            Texto="Actualiza de forma masiva los campos personalizados para todos los empleados desde un único archivo."
                        />
                    </template>
                </ListaOpciones>
            </div><!--final contenedor add user-->

        </div><!--final contenedor acciones-form-->

        <div class="acciones-masivas" v-show="ListaIds.length > 0">
            <ListaTemplate optionsSelected="Acciones en Lote"/>
            <span>Has seleccionado {{ ListaIds.length }} de los {{ 12 }} empleados</span>
        </div>

        <TemplateModal @closeModal="showModal" :activarModal="mostrarModal" NombreAccion="Nuevo Registro">
            <p class="decripcion-modal">
                La información de la persona será utilizada para ayudarte a generar la nómina más rápida que has visto, recuerda que siempre podrás regresar a editar cualquier valor.
            </p>
            
            <NavForm :idFormularioActivo="2" />
            
            <FormDatosBasicos />

        </TemplateModal>

        <!--tabla con los datos-->
        <div class="cuerpo-tabla">
            <span class="NoEncontrado" v-if="(ListaEmpleados.length === 0)? true : false">No hay datos asociados a los filtros</span>
            <EmpleadosGeneral v-else :listaEmpleados="ListaEmpleados"/>
        </div>
    </div>
</template>

<script setup>

    //componentes
    import InputShearch from '../inputs/Input-shearch.vue';
    import TemplateButton from '../botones/Template-button.vue';
    import ListaTemplate from '../listas/Lista-template.vue';
    import EmpleadosGeneral from '../tablas/Empleados/Empleados-general.vue';
    import ListaOpciones from '../listas/Lista-Opciones.vue'
    import BigOptionButton from '../botones/Big-Option-button.vue'
    import TemplateModal from '@/components/modal/Template-modal.vue';
    import FormDatosBasicos from './Form-datosBasicos.vue';
    import NavForm from '@/components/navs/Nav-form.vue'


    //iconos
    import PersonPlussIcon from '../icons/Person-Pluss-icon.vue';

    //librerias
    import { ref, onMounted, reactive, toRefs, watch  } from 'vue';
    import axios from 'axios';

    import { inject } from 'vue';

    // Inyectar el valor proporcionado por la url
    const idSociedad = inject('IDsociedad');

    const ListaIds = ref([]); //Contiene los id de los empleados seleccionados

    //controla la visualizacion de las opciones
    const mostrarOpciones = ref(false);
    /**
     * Controla la visualizacion de la lista de opciones de agregar empleado
     * @param mostrarOpciones - variable que cambia de valor
    */
    const showOptions = () => {
        mostrarOpciones.value = !mostrarOpciones.value
    }

    const mostrarModal = ref(false)
    /**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
    const showModal = () => {
        mostrarModal.value = !mostrarModal.value
    }

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
        await axios.get(`/sociedad/${idSociedad}/list_sede?page=${1}&records=20`, {"id": idSociedad})
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
        await axios.get(`/sociedad/${idSociedad}/list_grupos_empleados`, {"id": idSociedad})
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

    //parametros a pasar con la peticion
    const parametrosPeticionEmpleados = {
        "departamento_id": 0,
        "grupo_id": 0,
        "sede_id": 0
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
        await axios.get(`/sociedad/${idSociedad}/list_empleados`, {"id": idSociedad,})
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

    /**
    * Solicita a la API los datos de los empleados según el filtro proporcionado y los almacena en ListaEmpleados.
    *
    * @async
    * @function pedirEmpleado2
    * @returns {Promise} - Una promesa que se resuelve cuando la solicitud HTTP se completa.
    * @throws {Error} - Si ocurre un error durante la solicitud HTTP, se lanzará un error.
    *
    * @example
    * // Llamar a la función para obtener empleados con ciertos parámetros
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
        // Si no se ha establecido la lista original, se guarda
        if (listaEmpleadosOriginal === null) {
            listaEmpleadosOriginal = [...ListaEmpleados.value];
        }

        // Si el texto de entrada es diferente al texto ingresado reasigna el arreglo original
        if (text.trim() === '') {
           ListaEmpleados.value = [...listaEmpleadosOriginal];
           return;
        }

        //convierte la entrada de texto a minusculas y elimina los espacion del inicio
        const normalizarText = text.toLowerCase().trim();
        const filtrado = ListaEmpleados.value.filter(
            (empleado) => empleado.nombres.toLowerCase().includes(normalizarText)
        );

        //asigna el valor del arreglo con el filtro a la variable.
        ListaEmpleados.value = filtrado
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
        
    });
</script>

<style scoped>
form.formulario-empleados{
    gap: 24px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px;
}
div.acciones-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
div.filtros {
    display: flex;
    flex-direction: row;
    gap: 12px;
}
div.acciones-masivas{
    display: flex;
    gap: 24px;
    align-items: center;
}
span.NoEncontrado {
    font-size: 24px;
    color: rgb(56, 56, 56);
}

div.Add-user-button > div {
    z-index: 50;
}
p.decripcion-modal{
    margin: 0;
    text-align: justify;
    font-size: 16px;
    font-weight: 400;
}
</style>