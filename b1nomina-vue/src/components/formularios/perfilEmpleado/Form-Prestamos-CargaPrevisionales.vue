<template>
    
    <form class="formulario" id="CargaPrevisionales" @submit.prevent="Enviar">

        <div class="row-form">
            <LayoutInputLineal textLabel="Parentesco" :requerido="RequiereActualizar ">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="parentesco" 
                        :options="Parametros?.parentescos" 
                        :requerido="RequiereActualizar"    
                        :preseleccion="parentesco" 
                        optionsSelected="Seleccionar"                    
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion
                Placeholder="Ejemplo: 1234567-8"
                Titulo="Número de documento"
                name="rut"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar "
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        </div>

        <div class="row-form">
            <InputLinealDescripcion
                Placeholder="Ejemplo: Juan"
                Titulo="Nombres"
                v-model="nombres"
                @update:modelValue="nombres = $event"
                :requerido="RequiereActualizar"
                name="Nombres"
            />
            <InputLinealDescripcion
                Placeholder="Ejemplo: Peres"
                Titulo="Apellido Paterno"
                v-model="apellidos"
                @update:modelValue="apellidos = $event"
                :requerido="RequiereActualizar "
                name="Apellidos"
            />            

            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de nacimiento"
                v-model="fechaNacimiento"
                @update:modelValue="fechaNacimiento = $event"
                :requerido="RequiereActualizar "
            />

        </div>

        <LayoutInputLineal textLabel="Condición" :requerido="RequiereActualizar ">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="condicion" 
                        :options="Parametros?.condicion" 
                        :requerido="RequiereActualizar"    
                        :preseleccion="condicion" 
                        optionsSelected="Seleccionar"                    
                    />
                </template>
            </LayoutInputLineal>


    </form>
    
</template>

<script setup>
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InputRadioButton from '@/components/botones/Input-Radio-button.vue';
    
    import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';
    import peticiones from '@/peticiones/p_empleado';

    const DatosUsuario = reactive(inject('dataEmpleado'))
    const parametros = reactive(inject('parametros'))
    const Parametros = ref({});
    const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));
    
    //lista de
    const ListaTiposDocumentos = [
    {
        id: 1,
        nombre: "Pasaporte",
    },
    {
        id: 2,
        nombre: "RUT",
    },
    ];

    const payload = reactive({
        rut: "",
        estado_civil_id: "",
        nombres: "",
        apellido_paterno: "",
        fecha_nacimiento: "",
        sexo_id: "",
    });
    
    const payload_old = reactive({
        rut: "",
        estado_civil_id: "",
        nombres: "",
        apellido_paterno: "",
        fecha_nacimiento: "",
        sexo_id: "",
    });


    const RequiereActualizar  = ref(false);

    const parentesco = ref('');
    const numeroDocumento = ref("");
    const nombres = ref("");
    const apellidos = ref("");
    const fechaNacimiento = ref('');
    const condicion = ref('')




    watch(parentesco, (nuevoValor) => ActualizarPayload("parentesco", nuevoValor));
    watch(numeroDocumento, (nuevoValor) => ActualizarPayload("rut", nuevoValor));
    watch(nombres, (nuevoValor) => ActualizarPayload("nombre", nuevoValor));
    watch(apellidos, (nuevoValor) => ActualizarPayload("apellidos", nuevoValor));
    watch(fechaNacimiento, (nuevoValor) => ActualizarPayload("fecha_nacimiento", nuevoValor));
    watch(condicion, (nuevoValor) => ActualizarPayload("condicion", nuevoValor));


    watch(DatosUsuario, (nuevaInfo) => {
        MostrarValores(nuevaInfo)
    })

    watch(parametros, (nuevaInfo) => {     
        Parametros.value = nuevaInfo
    })


    const MostrarValores = (DATA) => {

        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        RequiereActualizar.value = false

        payload_old.rut = DATA?.rut ?? '';
        payload.rut = DATA?.rut ?? '';
        

    }

/**
 * Actualiza el valor de una propiedad específica dentro del objeto 'payload'.
 *
 * @param {string} propiedad - El nombre de la propiedad a actualizar en el objeto 'payload'.
 * @param {any} valor - El nuevo valor que se asignará a la propiedad especificada.
 *
 * @example
 * // 'payload' es un objeto con una estructura predefinida.
 * const payload = {
 *   nombre: '',
 *   edad: 0
 * };
 *
 * // Llamando a ActualizarPayload para cambiar el nombre.
 * ActualizarPayload('nombre', variable);
 *
 * // Ahora, 'payload' se verá así:
 * // {
 * //   nombre: 'Pedro',
 * //   edad: 30
 * // }
 */
 const ActualizarPayload = (propiedad, valor) => {
    // Asigna el nuevo valor a la propiedad especificada dentro del objeto 'payload'.
    payload[propiedad] = valor;
    
    verificarCambios();

};
// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every( key => payload_old[key] == payload[key]);
    
    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}

    onMounted(() => {
        MostrarValores(DatosUsuario.value)
    });

    const emit = defineEmits([
        'respuestaServidor',
    ]);

    onBeforeMount(() => {
        Parametros.value = parametros.value
    })


/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario

        console.log(DatosUsuario.value)


    if (RequiereActualizar.value == true) {
        const respuesta = await peticiones.ActualizarDatosPrincipales(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
        if(respuesta.success == true){
        emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor': true})
        } else {
            console.error(respuesta?.error)
            emit('respuestaServidor', {'texto': respuesta?.error, 'valor': false})
        }
    } else {
        emit('respuestaServidor', {'texto': "No se requiere actualizar", 'valor': true});
    }
};
</script>


<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap:  16px
}

/* Contenedor para elementos multimedia, organizados 
en columnas con un espacio de  12px entre ellos */
div.multimedia {
    display: flex;
    flex-direction: column;
    gap:  12px;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo{
    border-radius:  6px;
    border:  0.5px #363855 dashed;
    border-width:  5px;
    box-sizing: border-box;
    padding:  12px  48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:  100%;
    height: fit-content;
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


</style>
