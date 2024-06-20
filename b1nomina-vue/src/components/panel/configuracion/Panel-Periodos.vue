<template>
    <div class="panel-empleados">
        <div class="acciones-form">
            <div class="filtros">
                <ListaTemplate v-model="filtroPeriodo" :options="ListaPeriodos" optionsSelected="Seleccionar Periodo"/>
            </div>     
            
            <TemplateButton text="Añadir Siguiente Periodo" @click="ActionButton">
                <template #post>
                    <PlusCirculoIcon Stroke="#FFFFFF"/>
                </template>
            </TemplateButton>

        </div><!--final contenedor acciones-form-->
        <!--tabla con los datos
        <div class="cuerpo-tabla">
            <PeriodosGeneral  
                :listaEmpleados="ListaPeriodos"   
                @upData="InteraccionListaEmpleadosSelecionados"
                @actualizar_Lista="pedirEmpleados"
                @mostrarNotificacion="showNotificacion"
            />
        </div>
        -->
        <AlertShort
            ref="notificacionStatus"
        />
    </div>
</template>

<script setup>
    //componentes
    import ListaTemplate from '@/components/listas/Lista-template.vue';
    import PeriodosGeneral from '@/components/tablas/configuracion/Periodos-general.vue';
    import TemplateButton from '@/components/botones/Template-button.vue';
    import PlusCirculoIcon from '@/components/icons/Plus-Circulo-icon.vue';
    //alertas
    import AlertShort from '@/components/alertas/Alert-short-template.vue';

    //librerias
    import { ref, onMounted, reactive, toRefs, watch, inject} from 'vue';

    // Inyectar el valor proporcionado por la url
    import { useRoute } from 'vue-router';

    // Accede a la función proporcionada por el componente padre
    const CambiarNombreRuta = inject('CambiarNombreRuta');
    // Llama a la función para enviar información al componente padre
    CambiarNombreRuta('Periodos');

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

    //toma la referencia del componente notificacion para utilizar el metodo mostrar
    const notificacionStatus = ref(null);

    const showNotificacion = (Data) => {
        notificacionStatus.value.ActivarNotificacion(
            Data //Formato: {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"}   
        );
        ActualizarDatosNavegador();
    }

    //fin control del modal

    //variables a utilizar de forma reactiva
    const state = reactive({
        ListaPeriodos: [], // areglo con los datos de los empleados
    });

    const filtroPeriodo = ref(0)

    //valor ingresado por el usuario
    const shearch = ref('')
    
    //lista de empleados
    const {ListaPeriodos} = toRefs(state); 
    
    //filtros

    /**
    * Asigna el valor de "grupo" al arreglo de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna  0 a 'grupo_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'grupo_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor del grupo que se asignará.
    * @returns {void} No devuelve ningún valor, pero modifica el objeto 'parametrosPeticionEmpleados'.
    */ 
    const addPeriodo = (valor) => {
        if (valor == '' || valor == null) {
            parametrosPeticionEmpleados.grupo_id = 0
        } else {
            //convierte el valor a entero y lo guarda en el arreglo
            parametrosPeticionEmpleados.grupo_id = parseInt(valor);
        }
       
        //solicita la actualizaion de los datos
        /*

        */
    };


    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroPeriodo, addPeriodo);


const ActionButton = () => {
    
}





    // al montar el componente ejecuta las funciones
    onMounted(async () => {
     
    });

    
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-empleados {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
    justify-content: start;

}

/* 
 Sección de acciones del formulario, distribuye los elementos en una fila y justifica el espacio entre ellos
 para una distribución equilibrada.
*/
div.acciones-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

/* 
 Sección de filtros, organiza los elementos en una fila con un espaciado específico entre ellos para
 una fácil navegación y selección de filtros.
*/
div.filtros {
    display: flex;
    flex-direction: row;
    gap: 12px; /* Espaciado entre los elementos de filtro para mantener la interfaz limpia y ordenada */
}

/* 
 Acciones masivas, asegurando que los elementos estén alineados verticalmente en el centro y tengan
 un espaciado específico entre ellos para una presentación clara y organizada.
*/
div.acciones-masivas{
    display: flex;
    gap: 24px; /* Espaciado entre los elementos de acción masiva para una distribución equilibrada */
    align-items: center; /* Alineación vertical de los elementos para una mejor estética y usabilidad */
}

/* 
 Mensaje de "No encontrado", ajustando el tamaño de fuente y el color para proporcionar un feedback
 visual adecuado al usuario.
*/
span.NoEncontrado {
    font-size: 24px;
    color: rgb(56, 56, 56); /* Color gris oscuro para mantener un tono coherente con el diseño */
}

/* 
 Botón de agregar usuario, asegurando que su contenido tenga una posición superior en el eje Z para
 garantizar que se muestre correctamente sobre otros elementos.
*/
div.Add-user-button > div {
    z-index: 50; /* Posicionamiento en el eje Z para asegurar la visibilidad del botón */
}

/* 
 Párrafo dentro del modal, ajustando el margen, alineación del texto y estilos de fuente para una
 mejor legibilidad y presentación del contenido.
*/
p.decripcion-modal{
    margin: 0; /* Elimina el margen por defecto para mantener un diseño limpio */
    text-align: justify; /* Justifica el texto para una lectura más fluida */
    font-size: 16px; /* Tamaño de fuente adecuado para facilitar la lectura */
    font-weight: 400; /* Peso de la fuente para mantener un equilibrio visual */
}
</style>
