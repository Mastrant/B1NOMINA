<template>
    <form class="formulario-empleados">
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch v-model="shearch"/>

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
    import { ref, defineProps, onMounted } from 'vue';
    import axios from 'axios';

    //variables a utilizar

    const {
        ListaEmpleados,
        ListaDepartamentos, 
        ListaGrupos,
        ListaSedes,
        sociedadId,
        grupo,
        shearch
    } = ref()  

    const ListaOptions = ref([
    { text: 'One', value: 'A' },
    { text: 'Two', value: 'B' },
    { text: 'Three', value: 'C' }
    ]);

    const props = defineProps({
        sociedadId: {
            type: String,
            default: ''
        }
    })

    const pedirSedes = () => {
        axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`,{idSociedad: sociedadId})
        .then(
            res => {
                ListaSedes.value = res.data 
                console.log(res.data)
            }
        )
        .then(
            err => {
                if (err.status === 404){
                    console.log("sedes no encontradas")
                }
            }
        )
    };

    const pedirDepartamentos = () => {
        axios.get(`list_departamento_sociedad?idSociedad=${sociedadId.value}&page=1&records=20`,{idSociedad :sociedadId.value})
        .then(
            res => {
                ListaDepartamentos.value = res.data
            }
        )
        .then(
            err => {
                if (err.status === 404){
                    console.log("Departamentos no encontradas")
                }
            }
        )
    };

    const pedirGrupos = () => {
        axios.get('',{idSociedad :sociedadId.value})
        .then(
            res => {
                ListaGrupos.value = res.data 
                console.log(res.data)
            }
        )
        .then(
            err => {
                if (err.status === 404){
                    console.log("Grupos no encontradas")
                }
            }
        )
    };

    const pedirUsuarios = () => {
        axios.get(`/user/list_users?page=1&records=2`,{idSociedad :sociedadId.value})
        .then(
            res => {
                //almacena los datos de la peticion en la variable enviada como props
                ListaEmpleados.value = res.data 
                console.log(res.data)
            }
        )
        .then(
            err => {
                console.log(err)
            }
        )
    };

    onMounted(() => {
       pedirSedes();
       pedirDepartamentos();
       pedirGrupos();
       pedirUsuarios();
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