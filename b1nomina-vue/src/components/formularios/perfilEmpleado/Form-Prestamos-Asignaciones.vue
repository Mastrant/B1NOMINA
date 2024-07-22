<template>
    <!-- Formulario para agregar o editar un préstamo -->
    <form class="formulario" id="addPrestamo" @submit.prevent="Enviar">
        <!-- Sección para ingresar detalles del préstamo, mostrada cuando verFormulario == 1 -->
        <section v-show="verFormulario == 1">
            <!-- Contenedor para el tipo de préstamo -->
            <div class="row-form">
                <!-- Componente personalizado para seleccionar el tipo de préstamo -->
                <LayoutInputLineal textLabel="Tipo" :requerido="RequiereActualizar">
                    <!-- Slot para personalizar el contenido interno -->
                    <template v-slot>
                        <!-- Componente de lista para seleccionar el tipo de préstamo -->
                        <ListaTemplateLineal  
                            v-model="TipoPrestamo" 
                            :options="Parametros?.tipoprestamo" 
                            :requerido="RequiereActualizar"            
                            :preseleccion="TipoPrestamo" 
                            optionsSelected="Seleccionar"
                        />
                    </template>
                </LayoutInputLineal>          
            </div>

            <!-- Contenedor para la descripción del préstamo -->
            <div class="row-form">
                <!-- Componente personalizado para ingresar la descripción del préstamo -->
                <InputLinealDescripcion 
                    v-model="DescripcionPrestamo"
                    Placeholder="Ingresar Descripción" 
                    Titulo="Descripción" 
                    @update:modelValue="DescripcionPrestamo = $event"
                    :requerido="RequiereActualizar"
                />
            </div>

            <!-- Contenedor para el valor de la cuota y el número de cuotas -->
            <div class="row-form">
                <!-- Componente personalizado para ingresar el valor de la cuota -->
                <InputLinealDescripcion 
                    v-model="valorCuota"
                    Placeholder="$ 0" 
                    Titulo="Valor" 
                    @update:modelValue="valorCuota = $event"
                    Tipo="Number"
                    :minimoNumeros="1"
                    :NumeroDecimales="0.01"
                    :requerido="RequiereActualizar"
                />
            </div>

            <!-- Contenedor para el número de cuotas y la fecha del primer pago -->
            <div class="row-form">
                <!-- Componente personalizado para ingresar el número de cuotas -->
                <InputLinealDescripcion 
                    v-model="numeroCuotas"
                    Placeholder="0" 
                    Titulo="Número de cuotas a pagar" 
                    @update:modelValue="numeroCuotas = $event"
                    Tipo="Number"
                    :minimo-numeros="1"
                    :maximo-numeros="200"
                    :requerido="RequiereActualizar"
                />

                <!-- Componente personalizado para seleccionar la fecha del primer pago -->
                <InputLinealDescripcion 
                    v-model="fechaPrimerPago"
                    Placeholder="" 
                    Titulo="Fecha del pago primera cuota" 
                    @update:modelValue="fechaPrimerPago = $event"
                    Tipo="month"
                    :requerido="RequiereActualizar"
                />
            </div>
        </section>

        <!-- Sección para visualizar las cuotas generadas, mostrada cuando verFormulario == 2 -->
        <section v-show="verFormulario == 2" class="tabla-cuotas">
            <!-- Componente personalizado para mostrar las cuotas -->
            <CuotasPrestamos                
                :Listado="ListadoCuotas"
            />
        </section>

        <!-- Contenedor para botones de navegación entre secciones -->
        <div class="espacio-botones">
            <!-- Botón para editar cuotas, visible solo en la vista de cuotas -->
            <PaginateButton 
                v-show="verFormulario == 2"
                texto="Editar Cuotas" 
                @click="() => {
                    verFormulario = 1
                    generarPrestamo = false
                }"
            />

            <!-- Botón para ver cuotas, visible solo en la edición de préstamo y si hay cuotas -->
            <PaginateButton 
                v-show="verFormulario == 1 && ListadoCuotas.length > 0"
                texto="Ver Cuotas" 
                @click="() => {
                    verFormulario = 2
                    generarPrestamo = true
                }"
            />
        </div>
    </form>    
</template>


    <script setup>
    // Importación de componentes personalizados y funciones de Vue.js necesarias para el componente.
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import CuotasPrestamos from '@/components/tablas/perfilEmpleado/asignaciones/CuotasPrestamo-General.vue'
    import PaginateButton from '@/components/botones/Paginate-button.vue';

    // Importación de funciones reactivas y de ciclo de vida de Vue.js.
    import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';

    // Importación de funciones para realizar peticiones HTTP.
    import peticiones from '@/peticiones/p_empleado';

    // Uso de Vue Router para obtener parámetros de ruta.
    import {useRoute}  from 'vue-router';

    // Obtención del ID de sociedad desde los parámetros de ruta.
    const route = useRoute();  
    const Sociedad_id = route.params.sociedadId;

    // Acceso al estado global de datos del usuario y parámetros mediante inject.
    const DatosUsuario = reactive(inject('dataEmpleado'));
    const parametros = reactive(inject('parametros'));

    // Definición de varias referencias reactivas para manejar el estado del componente.
    const Parametros = ref({});
    const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));
    const RequiereActualizar = ref(false);

    // Definición de objetos reactivos para manejar los datos del formulario y sus versiones antiguas.
    const payload = reactive({
        tipo_id: '',
        descripcion: '',
        valor: '',
        cuotas: '',
        fecha_inicio: '',
        "sociedad_id": Sociedad_id
    });

    const payload_old = reactive({
        tipo_id: '',
        descripcion: '',
        valor: '',
        cuotas: '',
        fecha_inicio: '',
        "sociedad_id": Sociedad_id
    });

    // Definición de referencias reactivas para controlar la visualización del formulario y los datos ingresados por el usuario.
    const verFormulario = ref(1);
    const TipoPrestamo = ref('');
    const DescripcionPrestamo = ref('');
    const valorCuota = ref('');
    const numeroCuotas = ref('');
    const fechaPrimerPago = ref('');
    const ListadoCuotas = ref([]);
    const generarPrestamo = ref(false);

    // Observadores reactivos para actualizar automáticamente el objeto payload cuando cambian ciertos valores.
    watch(TipoPrestamo, (nuevoValor) => ActualizarPayload('tipo_id', nuevoValor));
    watch(DescripcionPrestamo, (nuevoValor) => ActualizarPayload('descripcion', nuevoValor));
    watch(valorCuota, (nuevoValor) => ActualizarPayload('valor', nuevoValor));
    watch(numeroCuotas, (nuevoValor) => {
        numeroCuotas.value = Math.round(nuevoValor);
        ActualizarPayload('cuotas', nuevoValor);
    });
    watch(fechaPrimerPago, (nuevoValor) => ActualizarPayload('fecha_inicio', nuevoValor));

    // Observador reactivo para resetear el formulario cuando cambian los parámetros globales.
    watch(parametros, (nuevaInfo) => {
        ResetForm();
        Parametros.value = nuevaInfo;
    });

    // Función para resetear el estado del formulario y los payloads.
    const ResetForm = () => {
        RequiereActualizar.value = false;
        
        DescripcionPrestamo.value = '';
        valorCuota.value = '';
        numeroCuotas.value =  '';
        fechaPrimerPago.value = '';
        TipoPrestamo.value = '';

        verFormulario.value = 1;
        ListadoCuotas.value = [];
        generarPrestamo.value = false;

        payload.tipo_id = '';
        payload.descripcion = '';
        payload.valor = '';
        payload.cuotas = '';
        payload.fecha_inicio = '';

        payload_old.tipo_id = '';
        payload_old.descripcion = '';
        payload_old.valor = '';
        payload_old.cuotas = '';
        payload_old.fecha_inicio = '';
    };

    // Función para actualizar el objeto payload con nuevos valores.
    const ActualizarPayload = (propiedad, valor) => {
        payload[propiedad] = valor;
        verificarCambios();
    };

    // Función para verificar si hay cambios entre los valores antiguos y nuevos del payload.
    const verificarCambios = () => {
        const camposIguales = Object.keys(payload_old).every(key => payload_old[key] == payload[key]);
        const alMenosUnValorVacio = Object.values(payload).some(value => value == '');
        RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
    };

    // Uso de los hooks del ciclo de vida para inicializar el estado del componente.
    onMounted(() => {
        ResetForm();
        RequiereActualizar.value == false;
    });

    onBeforeMount(() => {
        ResetForm();
        Parametros.value = parametros.value;
    });

    // Definición de eventos personalizados que pueden ser emitidos por este componente.
    const emit = defineEmits(['respuestaServidor']);

    // Función asíncrona para manejar el envío del formulario, realizando peticiones HTTP según el estado actual.
    const Enviar = async () => {
        if (generarPrestamo.value == false){
            if (RequiereActualizar.value == true) {
                const respuesta = await peticiones?.postCuotas(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
                if (respuesta.success == true) {
                    ListadoCuotas.value = respuesta?.data.data;
                    verFormulario.value = 2;
                    generarPrestamo.value = true;
                } else {
                    console.error(respuesta?.error);
                    emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false});
                }
            } else {
                emit('respuestaServidor', {'texto': "Los campos estan vacios", 'valor':true});
            }
        } else {
            if (RequiereActualizar.value == true) {
                const respuesta = await peticiones?.addPrestamo(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
                if(respuesta.success == true){
                    emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true});
                    ResetForm();
                } else {
                    console.error(respuesta?.error);
                    emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false});
                }
            } else {
                emit('respuestaServidor', {'texto': "Los campos estan vacios", 'valor':true});
            }        
        }  
    };
</script>


<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;

}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario > section {
    display: flex;
    flex-direction: column;
    gap:  16px
}

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin:  0px;
    color: #1A2771;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}
div.espacio-botones{
    display: flex;
    justify-content: end;
    padding: 24px 24px 0px 0px;
}

section.tabla-cuotas {
    box-sizing: border-box;
    max-height: 420px;
    overflow-y: scroll;
}

</style>
