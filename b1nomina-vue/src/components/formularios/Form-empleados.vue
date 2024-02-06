<template>
    <form class="formulario-empleados">
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch v-model="shearch"/>

                <ListaTemplate v-model="filtroSede" :options="ListaSedes" optionsSelected="Sede"/>
                <ListaTemplate v-model="filtroDepartamento" :options="ListaDepartamentos" optionsSelected="Departamento"/>
                <ListaTemplate v-model="filtroGrupo" :options="ListaOptions" optionsSelected="Grupo"/>
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
        <div class="cuerpo de la tabla">
            <EmpleadosGeneral :listaEmpleado="ListaEmpleados"/>
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
    import { ref, onMounted, reactive, toRefs  } from 'vue';
    import axios from 'axios';

    import { inject } from 'vue';

// Inyectar el valor proporcionado
    const id = inject('IDsociedad');

    //variables a utilizar
    const state = reactive({
        grupo: '',
        shearch: ''
    });

    const {
        grupo,
        shearch,
    } = ref(state);

    const ListaSedes = ref([]);
    const ListaDepartamentos = ref({});
    const ListaGrupos = ref([]);
    const ListaEmpleados = ref({});

    const ListaOptions = ref([
        { text: 'One', valor: 'A' },
        { text: 'Two', valor: 'B' },
        { text: 'Three', valor: 'C' },
    ]);

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
    const pedirGrupos = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${id}/list_departamentos?page=${1}&records=20`, {"id": id})
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

    const pedirEmpleados = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${id}/list_empleados`, {"id": id})
        .then(
            (res) => {
                ListaEmpleados.value = res.data //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
    };


    
    //al montar el componente
    onMounted(async () => {
        await pedirSedes();
        await pedirDepartamentos();
        await pedirGrupos();
        await pedirEmpleados();
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