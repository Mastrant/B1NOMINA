<template>
    <form class="formulario-empleados">
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch v-model="shearch" @update:modelValue="shearch = $event" />

                <ListaTemplate v-model="filtroSede" :options="ListaSedes" optionsSelected="Sede"/>
                <ListaTemplate v-model="filtroDepartamento" :options="ListaDepartamentos" optionsSelected="Departamento"/>
                <ListaTemplate v-model="filtroGrupo" :options="ListaGrupos" optionsSelected="Grupo"/>
            </div>
            
            <div>
                <TemplateButton text="Agregar Empleado">
                    <template #default >
                        <PersonPlussIcon/>
                    </template>
                </TemplateButton>
            </div>            
        </div>
        <div class="acciones-masivas" v-show="false">
            <ListaTemplate optionsSelected="Acciones en Lote"/>
            <span>Has seleccionado {{ 1 }} de los {{ 12 }} empleados</span>
        </div>

        <!--tabla con los datos-->
        <div class="cuerpo de la tabla">
            <span v-if="(ListaEmpleados.value == [])? true : false">No hay datos</span>
            <EmpleadosGeneral v-else :listaEmpleados="ListaEmpleados"/>
        </div>
    </form>
</template>

<script setup>

    //componentes
    import InputShearch from '../inputs/Input-shearch.vue';
    import TemplateButton from '../botones/Template-button.vue';
    import ListaTemplate from '../listas/Lista-template.vue';
    import EmpleadosGeneral from '../tablas/Empleados/Empleados-general.vue';

    //iconos
    import PersonPlussIcon from '../icons/Person-Pluss-icon.vue';

    //librerias
    import { ref, onMounted, reactive, toRefs, watch  } from 'vue';
    import axios from 'axios';

    import { inject } from 'vue';

    // Inyectar el valor proporcionado por la url
    const idSociedad = inject('IDsociedad');

    //variables a utilizar de forma reactiva
    const state = reactive({
        ListaEmpleados: [],
    });

    //lista de sedes
    const ListaSedes = ref([]);
    const filtroSede = ref('');

    //lista de Departamentos
    const ListaDepartamentos = ref({});
    const filtroDepartamento = ref('')

    //lista de grupos
    const ListaGrupos = ref([]);
    const filtroGrupo = ref('')

    //valor ingresado por el usuario
    const shearch = ref('')
    
    //lista de empleados
    const {ListaEmpleados} = toRefs(state);
    
    // solicita a la api los datos de las Sedes y lo envia al componente ListaTemplate como props
    const pedirSedes = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${idSociedad}/list_sede?page=${1}&records=20`, {"id": idSociedad})
        .then(
            (res) => {
                ListaSedes.value = res.data
            }
        )
        .catch(
            (err) => {
                console.log(err)
                ListaSedes.value = []
            }
        )
    };

    // solicita a la api los datos de los Departamentos y lo envia al componente ListaTemplate como props
    const pedirDepartamentos = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${idSociedad}/list_departamentos?page=${1}&records=20`, {"id": idSociedad})
        .then(
            (res) => {
                ListaDepartamentos.value = res.data
            }
        )
        .catch(
            (err) => {
                console.log(err)
                ListaDepartamentos.value = []
            }
        )
    };

    // solicita a la api los datos de los grupos y lo envia al componente ListaTemplate como props
    const pedirGrupos = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${idSociedad}/list_grupos_empleados`, {"id": idSociedad})
        .then(
            (res) => {
                ListaGrupos.value = res.data
            }
        )
        .catch(
            (err) => {
                console.log(err)
                ListaGrupos.value = []
            }
        )
    };

    //parametros a pasar con la peticion
    const parametrosPeticionEmpleados = {
        "departamento_id": 0,
        "grupo_id": 0,
        "sede_id": 0
    };
    
    // solicita a la api los datos de los empleados y lo envia al componente ListaTemplate como props
    const pedirEmpleados = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_empleados`, {"id": idSociedad,})
        .then(
            (res) => {
                ListaEmpleados.value = res.data //almacena los datos devueltos por la api
                console.log(ListaEmpleados.value)
            }
        )
        .catch(
            (err) => {
                if (err.status == 404){
                    ListaEmpleados.value = []
                }else {
                    ListaEmpleados.value = []
                }
                console.log(err) //muestra el error
            }
        )
    };

    // solicita a la api los datos de los empleados segun el filtro y lo envia al componente ListaTemplate como props
    const pedirEmplead2 = async () => {
        console.log("ejecutando")
        await axios.post(`/user/1/searchsdg`, parametrosPeticionEmpleados)
        .then(
            (res) => {
                ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                console.log(err) //muestra el error
            }
        )
    };

    //filtros

    //asigna el valor "departamento" al arreglo de parametros peticion empleados
    const addDepartamento = (valor) => {
        parametrosPeticionEmpleados.departamento_id = valor;
        //solicita la actualizaion de los datos
        pedirEmplead2();
    };
    //asigna el valor "sede" al arreglo de parametros peticion empleados
    const addSede = (valor) => {
        parametrosPeticionEmpleados.sede_id = valor;
        //solicita la actualizaion de los datos
        pedirEmplead2();
    };
    //asigna el valor "grupo" al arreglo de parametros peticion empleados
    const addGrupo = (valor) => {
        parametrosPeticionEmpleados.grupo_id = valor;
        //solicita la actualizaion de los datos
        pedirEmplead2();
    };

    const filtrar = (text) => {
        const normalizarText = text.toLowerCase().trim();

        const usuariosFiltrados = ListaEmpleados.value.filter(
            function(empleado) {                
                return empleado.nombre.toLowerCase().includes(normalizarText);
            });
        console.log(usuariosFiltrados);
        console.log(`filtro: ${normalizarText}`)
    };

    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroSede, addSede);
    watch(filtroDepartamento, addDepartamento);
    watch(filtroGrupo, addGrupo);

    //al tener cambios en los parametros activa la peticion de empleados
    // test watch(parametrosPeticionEmpleados.departamento_id, console.log("cambios detectados"), { deep: true });

    watch(shearch, filtrar);

    
    //al montar el componente
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

</style>