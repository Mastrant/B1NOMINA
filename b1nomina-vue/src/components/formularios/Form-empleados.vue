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
            <span>Has seleccionado {{ 12 }} de los {{ 12 }} empleados</span>
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
    import { ref, defineProps, onMounted, toRefs, reactive } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        sociedadId: {
            type: String,
            default: ''
        }
    })

    //variables a utilizar
    const state = reactive({
        ListaEmpleados: [],
        ListaDepartamentos: [],
        ListaGrupos: [],
        ListaSedes: [],
        sociedadId: '',
        grupo: '',
        shearch: ''
    });

    const {
        ListaEmpleados,
        ListaDepartamentos, 
        ListaGrupos,
        ListaSedes,
        sociedadId,
        grupo,
        shearch
    } = toRefs(state)  

    const ListaOptions = ref([
        { text: 'One', valor: 'A' },
        { text: 'Two', valor: 'B' },
        { text: 'Three', valor: 'C' },
    ]);

    const pedirSedes = async () => {
        await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`,{idSociedad: sociedadId})
        .then(
            res => {
                ListaSedes.value = res.data 
                console.log(res.data)
            }
        )
        .then(
            err => {
                if (err.request.status == 404){
                    console.log("sedes no encontradas")
                } else if (err.request.status == 422){
                    console.log("Error Sedes 422")
                }
            }
        )
    };

    const pedirDepartamentos = async () => {
        await axios.get(`list_departamento_sociedad?idSociedad=${sociedadId}&page=1&records=20`,{idSociedad :sociedadId})
        .then(
            res => {
                ListaDepartamentos.value = res.data
            }
        )
        .then(
            err => {
                if (err.request.status === 422){
                    console.log("Departamentos no encontradas")
                }
            }
        )
    };

    const pedirGrupos = async () => {
        await axios.get('',{idSociedad :sociedadId})
        .then(
            (res) => {
                ListaGrupos.value = res.data 
                console.log(res.data)
            }
        )
        .then(
            (err) => {
                console.log(err)
            }
        )
    };

    const pedirUsuarios = () => {
        axios.get(`/user/${sociedadId}/associate_user_company`)
        .then(
            (res) => {
                //almacena los datos de la peticion en la variable enviada como props
                //ListaEmpleados.value = res.data 
                console.log(res)
            }
        )
        .then(
            (err) => {
                console.log("error al pedir los usuarios")
            }
        )
    };

    //al montar el componente
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