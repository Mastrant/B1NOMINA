<template>
    <div class="conted"> 
        <!--Contenedor de la tabla-->
        <table class="TablaEmpleados">
            <!--Encabezado de la tabla-->
            <tr class="rowTabla encabezado">
                <th class="filaCheckbox"> 
                    <InputCheckbox />
                </th>
                <th class="rowNombre">
                    EMPLEADOS 
                </th>
                <th class="">
                    RUT
                </th>
                <th class=""> 
                    CARGO
                </th>
                <th class=""> 
                    SALARIO BASE
                </th>
                <th class="Estado"> 
                    ESTADO 
                </th>
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!--Final encabezado-->

            <!--Cuerpo de la tabla-->
            <tr class="rowTabla cuerpo" v-for="(item) in DatosPaginados" :key="item.id">
                <td class="filaCheckbox">
                    <InputCheckbox :Objid="item.id" @update="InteraccionListaEmpleadosSelecionados" />
                </td>
                <td class="rowNombre">
                    {{item.nombres}}
                </td>
                <td class="">
                    {{item.rut}}
                </td>
                <td class="">
                    {{ item.cargo }}
                </td>
                <td class="">
                    {{ item.sueldo }}
                </td>
                <td class="Estado">
                    <InterruptorButton @click=" () => console.log('estado cambiado' + item.id)" :Objid="item.id" :Estado="(item.activo == true)? true :false" />
                    <span v-if="item.activo == true">Activo</span>
                    <span v-else>Inactivo</span>
                </td>
                
                <td class="acciones">
                    <OjitoIcon @click="console.log('ir a info' + item.id)" class="icon" />
                    <DescargaIcon @click="console.log('descargar info' + item.id)" class="icon" />
                </td>
            </tr>
            <!--Final cuerpo-->
        </table>

        <!--Fin Tabla-->
        <div class="conted-pagination">
            <!--Espacio para paginacion-->
            <div class="pagination">

            <!--Boton de Previo-->
            <PaginateButton @click="previosPage">
                <template #icono>
                    <img src="../../icons/svg/OneLeft-icon.svg" alt="prev"> 
                </template>
            </PaginateButton>

            <!--Listado de opciones-->
            <PaginateButton  v-for="pagina in totalpaginas()" :key="pagina" :texto="pagina" @click="getDataPorPagina(pagina)" />

            <!--Boton de siguiente-->
            <PaginateButton @click="nextPage">
                <template #icono>
                    <img src='../../icons/svg/OneRigth-icon.svg' alt="next">  
                </template>
            </PaginateButton>
            </div>
        </div>
    </div>
   
</template>

<script setup>
import OjitoIcon from '@/components/icons/Ojito-icon.vue';
import DescargaIcon from '@/components/icons/Descarga-icon.vue';
import PaginateButton from '@/components/botones/Paginate-button.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
import InputCheckbox from '@/components/inputs/Input-Checkbox.vue';

import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

// Define los props
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['upData']);
// Accede a la lista de empleados desde props
const ListaEmpleados = ref(props.listaEmpleados);

const listaEmpleadosSelecionados = ref([])

/**
 * Función para manejar la interacción con una lista de empleados seleccionados.
 * Esta función agrega o remueve un valor de la lista basado en si el valor ya está presente.
 *
 * @param {Number} value - El valor a agregar o remover de la lista.
 */
 const InteraccionListaEmpleadosSelecionados = (value) => {

  // Verifica si el valor no es null
  if (value !== null) {
    // Verifica si el valor ya está en la lista
    if (listaEmpleadosSelecionados.value.includes(value)) {
      // Si el valor ya está en la lista, lo remueve
      // Encuentra el índice del valor en la lista
      const index = listaEmpleadosSelecionados.value.indexOf(value);
      // Verifica si el índice es válido (mayor que -1)
      if (index > -1) {
        // Remueve el valor de la lista usando splice
        listaEmpleadosSelecionados.value.splice(index,   1);
      }
    } else {
      // Si el valor no está en la lista, lo agrega
      // Agrega el valor al final de la lista
      listaEmpleadosSelecionados.value.push(value);
    }
  }
};

const upData = (arrayData) => {
    // Convertir el objeto proxy a un array real
    const arrayReal = [...arrayData];
    emit('upData', arrayReal);
};

watch(listaEmpleadosSelecionados.value, upData)



//configuracion del paginado
const DatosPaginados = ref([]); //arreglo con los datos picados
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

    //si el valor de numeroPagina es null o undefined le asigna 1
    (numeroPagina == undefined || numeroPagina == null)
        ? numeroPagina = 1
        : paginaActual.value = numeroPagina;   
    
    DatosPaginados.value = ([]);

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
  //al detectar el cambio en la lista solicita los datos
  getDataPorPagina();
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    ListaEmpleados.value = props.listaEmpleados;
});

</script>

<style scoped>
.TablaEmpleados {
    width: 100%;
}

/**Contenedor general */
.conted {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 24px;
}

/**Paginacion */
div.contend-pagination {
    width: 100%;
    display: flex;
    justify-content: end;
}
.pagination {
    display: flex;
    width: 100%;
    gap: 4px;
    justify-content: end;
}
.pagination button {
    box-sizing: border-box;
    padding: 4px 12px;
}

/**Estilos del encabezado de la tabla */
tr.encabezado {
    width: 100%;
    height: 24px;
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

/**evitar que el texto sobre salga de la celda */
td,th {
  word-break: break-word;
  white-space: nowrap;
}

/**Estilo del cuerpo de la tabla */

tr.cuerpo {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-self: end;
}

/**Estilo de la fila */
tr.rowTabla {
    width: 100%;
    box-sizing: content-box;
    height: 48px;
    display: table-row;
}

/*Estilos de cada espacio */
tr.cuerpo > td {
    width: auto;
    height: 48px;
    background: none;
    box-sizing: border-box;
    padding: 12px;
    border:#FCFCFD;
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center;
    align-items: center;
    text-align: center;
    margin: auto;
}
/**Columna acciones encabezado */
th.acciones {
    display: flex;
    gap: 12px;
    justify-content: center;
    box-sizing: border-box;
}
/* Primera columna */
.filaCheckbox {
    max-width: 80px !important;
    box-sizing: border-box;
    margin: auto;
}
/**Estilos Columna Empleados */
th.rowNombre,
td.rowNombre {
    text-align: start !important;
    max-width: 290px;
}
/**Estilo columna estados */
td.Estado {
    display: flex;
    gap: 10px;
    justify-content: center;
    box-sizing: border-box;
    height: 52.2px !important;
    margin: 0px;

}

/*columna que contiene los iconos*/

.acciones { 
    gap: 24px;
    justify-content: center;
    white-space: nowrap;
}
/**Clase de los iconos */
.icon { 
    cursor: pointer;
}

</style>