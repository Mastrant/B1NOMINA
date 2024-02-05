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

    //props
    const props = defineProps({
        sociedadId: {
            type: String,
            default: ''
        }
    })

    //variables a utilizar

    const {
        ListaEmpleados,
        ListaDepartamentos, 
        ListaGrupos,
        ListaSedes,
        grupo,
    } = ref([])  

    const { 
        sociedadId,
        shearch
    } = ref('')  
    

    const ListaOptions = ref([
    { id: 1, text: 'One', value: 'A' },
    { id: 2, text: 'Two', value: 'B' },
    { id: 3, text: 'Three', value: 'C' }
    ]);

  

    const pedirDepartamentos = () => {
        axios.get(`/sociedad/${sociedadId}/list_departamentos?page=1&records=20`,{id: sociedadId})
        .then(
            (respuesta) => {
                console.log(respuesta)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    };

    onMounted(
        pedirDepartamentos);

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