<template>
    <div class="conted"> 
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
            <tbody v-for="(item) in DatosPaginados" :key="item.id">
                <tr class="rowTabla">
                    <td class="checkbox columna ">
                        <input type="checkbox">
                    </td>
                    <td class="columna rowNombre">
                        {{item.nombres}}
                    </td>
                    <td class="columna">
                        {{item.rut}}
                    </td>
                    <td class="columna">
                        {{ item.cargo }}
                    </td>
                    <td class="columna ">
                        {{ item.sueldo }}
                    </td>
                    <td class="columna">
                        {{ item.activo }}
                    </td>
                    <td class="columna acciones">
                        <OjitoIcon @click="console.log('ir a info' + item.id)" class="icon" />
                        <DescargaIcon @click="console.log('descargar info' + item.id)" class="icon" />
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button class="page-item previo">
                <span class="page-link" @click="previosPage" >Previa</span>
            </button>
            <button class="page-item" v-for="pagina in totalpaginas()" :key="pagina" @click="getDataPorPagina(pagina)">
                <span class="page-link" >{{ pagina }}</span>
            </button>
            <button class="page-item next">
                <span class="page-link" @click="nextPage">Siguiente</span>
            </button>
        </div>
    </div>
   
</template>

<script setup>
import OjitoIcon from '@/components/icons/Ojito-icon.vue';
import DescargaIcon from '@/components/icons/Descarga-icon.vue';

import { ref, defineProps, watchEffect, onMounted, onBeforeMount } from 'vue';

// Define tus props
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: () => []
  }
});

// Accede a la lista de empleados desde props
const ListaEmpleados = ref(props.listaEmpleados);

//configuracion del paginado

const DatosPaginados = ref([]) //arreglo con los datos picados
const paginaActual = ref(1); //inicializacion de la pagina
const elementosPorPagina = 12; //numero de filas por pagina

//total de paginas
const totalpaginas = () => {
    //devuelve el numero de paginas segun los datos y redondea el resultado
    return Math.ceil(ListaEmpleados.value.length / elementosPorPagina);
};

//optener data segun la pagina
function getDataPorPagina(numeroPagina){
    //vacia la lista al cambiar iniciar

    paginaActual.value = numeroPagina;
    
    DatosPaginados.value = ([])
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
  console.log("datos actualizados")
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    ListaEmpleados.value = props.listaEmpleados;
});


onBeforeMount(() => {
    console.log("solicitando datos")
    getDataPorPagina()
});
    


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

tbody {
display: block;
}

tbody > tr {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
}
.formato {
    background-color: red;
}
tr.rowTabla {
    width: 100%;
}
tbody > tr > td.columna {
    width: auto;
    height: 50px;
    background: none;
    box-sizing: border-box;
    padding: 12px;
    border:#FCFCFD;
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center;
}
th.rowNombre{
    text-align: start;
    max-width: 290px;
}
th.acciones {
    display: flex;
    gap: 12px;
    justify-content: center;
    box-sizing: border-box;
}
.checkbox {
    max-width: 64px;
    box-sizing: border-box;
    padding: 24px;
}
.icon {
    cursor: pointer;
}
.pagination {
    display: flex;
    width: 400px;
    display: flex;
}
.pagination button {
    box-sizing: border-box;
    padding: 4px 12px;
}

.conted {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>