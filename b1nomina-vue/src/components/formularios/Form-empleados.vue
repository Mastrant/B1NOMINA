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
            <ListaTemplate :options="ListaOptions" optionsSelected="Acciones en Lote"/>
            <span>Has seleccionado {{ 1 }} de los {{ 12 }} empleados</span>
        </div>
        <!--tabla con los datos-->
        <div class="cuerpo de la tabla">
            <EmpleadosGeneral :listaEmpleados="ListaEmpleados"/>
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
    const id = inject('IDsociedad');

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

    //lista de empleados
    const {ListaEmpleados} = toRefs(state);

    //ejemplo de acciones
    const ListaOptions = ref([
        { nombre: 'One', valor: 'A' },
        { nombre: 'Two', valor: 'B' },
        { nombre: 'Three', valor: 'C' },
    ]);

    
    // solicita a la api los datos de las Sedes y lo envia al componente ListaTemplate como props
    const pedirSedes = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${id}/list_sede?page=${1}&records=20`, {"id": id})
        .then(
            (res) => {
                ListaSedes.value = res.data
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
    };

    // solicita a la api los datos de los Departamentos y lo envia al componente ListaTemplate como props
    const pedirDepartamentos = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${id}/list_departamentos?page=${1}&records=20`, {"id": id})
        .then(
            (res) => {
                ListaDepartamentos.value = res.data
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
    };

    // solicita a la api los datos de los grupos y lo envia al componente ListaTemplate como props
    const pedirGrupos = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${id}/list_grupos_empleados`, {"id": id})
        .then(
            (res) => {
                ListaGrupos.value = res.data
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
    };

    const parametrosPeticionEmpleados = {
        "id": id,
        "idSede": null,
        "idGrupo": null,
        "idDepartamento": null
    }
    
    // solicita a la api los datos de los empleados y lo envia al componente ListaTemplate como props
    const pedirEmpleados = async () => {
        await axios.get(`/sociedad/${id}/list_empleados`, parametrosPeticionEmpleados)
        .then(
            (res) => {
                ListaEmpleados.value = res.data //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                console.log(err) //muestra el error
            }
        )
    };

    

    //filtros


    const addDepartamento = (valor) => {
        console.log(valor);
    };
    const addSede = (valor) => {
        console.log(valor);
    };
    const addGrupo = (valor) => {
        console.log(valor);
    };

    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroSede, addSede);
    watch(filtroDepartamento, addDepartamento);
    watch(filtroGrupo, addGrupo);



    const shearch = ref('')

    
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