<template>
    <table class="TablaEmpleados">
        <thead class="TablaEmpleados">
            <tr class="rowTabla">
                <th class="columna"> 
                    <input type="checkbox">
                </th>
                <th class="columna rowNombre">
                    EMPLEADOS 
                </th>
                <th class="columna">
                    RUT
                </th>
                <th class="columna"> 
                    CARGO
                </th>
                <th class="columna"> 
                    SALARIO BASE
                </th>
                <th class="columna"> 
                    ESTADO 
                </th>
                <th class="columna"> 
                    ACCIONES 
                </th>
            </tr>
        </thead>
        <tbody v-for="(item) in Lista" :key="item.id">
            <tr class="rowTabla">
                <th class="columna">
                    <input type="checkbox">
                </th>
                <th class="columna rowNombre">
                   {{item.nombres}}
                </th>
                <th class="columna">
                    {{item.rut}}
                </th>
                <th class="columna">
                    {{ item.cargo }}
                </th>
                <th class="columna">
                    {{ item.sueldo }}
                </th>
                <th class="columna">
                    {{ item.activo }}
                </th>
                <th class="columna">
                    estado
                </th>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps({
    listaEmpleado : {
        type: Array,
        default: []
    }
})

const Lista = ref(props, 'listaEmpleado')

onMounted(() => {
    console.log(Lista.value)
})


</script>

<style scoped>
.TablaEmpleados {
    width: 100%;
}

thead > tr {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    background: #FCFCFD;
    border-bottom: 0.96px #EAECF0 solid;

    /*Estilos de fuente*/

    color: #667085;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

tbody > tr {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
}

tr th.columna {
    width: auto;
    background: none;
    min-width: 20px;
    box-sizing: border-box;
    padding: 12px;
    border:#FCFCFD;
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center;
}

th.rowNombre{
    text-align: start;
}
</style>