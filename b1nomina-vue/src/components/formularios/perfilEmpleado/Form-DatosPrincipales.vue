<template>
    
    <form class="formulario" id="ActualizarDatosPrincipales" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Principales</h2>
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
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de Documento" :requerido="RequiereActualizar ">
                <template v-slot>
                    <ListaTemplateLineal
                        v-model="tipoDocumentoSelect"
                        :options="ListaTiposDocumentos"
                        :preseleccion="tipoDocumentoSelect" 
                        optionsSelected="Seleccionar"
                        :requerido="RequiereActualizar"
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
                :Deshabilitar="tipoDocumentoSelect != 2"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        </div>

        <div class="row-form">
            

            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de nacimiento"
                v-model="fechaNacimiento"
                @update:modelValue="fechaNacimiento = $event"
                :requerido="RequiereActualizar "
            />

            <LayoutInputLineal textLabel="Género" :requerido="RequiereActualizar ">
                <template v-slot>
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Masculino" 
                        :valor="1"
                        id-radius="Masculino"  
                    />
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Femenino" 
                        :valor="2"
                        id-radius="Femenino"  
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad" :requerido="RequiereActualizar ">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="nacionalidad" 
                        :options="ListaNacionalidad" 
                        :requerido="RequiereActualizar"    
                        :preseleccion="nacionalidad" 
                        optionsSelected="Seleccionar"                    
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Estado civil" :requerido="RequiereActualizar ">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="estadoCivil" 
                        :options="parametros?.estadocivil" 
                        :preseleccion="estadoCivil" 
                        :requerido="RequiereActualizar"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
    </form>
    
</template>

<script setup>
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InputRadioButton from '@/components/botones/Input-Radio-button.vue';

    import {reactive, ref, watch, inject, onMounted} from 'vue';

    import peticiones from '@/peticiones/p_empleado';

    const DatosUsuario = reactive(inject('dataEmpleado'))
    const parametros = reactive(inject('parametros'))
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

    //lista de nacionalidades
    const ListaNacionalidad = [
        {
            id: 1,
            nombre: "Nacional"
        },
        {
            id: 2,
            nombre: "Extrangero"
        },
    ]

    const payload = reactive({
        nacionalidad_id: "",
        sexo_id: "",
        fecha_nacimiento: "",
        estado_civil_id: "",
        apellido_paterno: "",
        rut: "",
        nombres: "",
    });
    const payload_old = reactive({
        nacionalidad_id: "",
        sexo_id: "",
        fecha_nacimiento: "",
        estado_civil_id: "",
        apellido_paterno: "",
        rut: "",
        nombres: "",
    });


    const RequiereActualizar  = ref(false);

    const numeroDocumento = ref("");
    const nombres = ref("");
    const apellidos = ref("");
    const tipoDocumentoSelect = ref(""); //Documento selecionado
    const nacionalidad = ref('');
    const genero = ref('');
    const fechaNacimiento = ref('');
    const estadoCivil = ref(''); 

    watch(numeroDocumento, (nuevoValor) => ActualizarPayload("rut", nuevoValor));
    watch(nombres, (nuevoValor) => ActualizarPayload("nombres", nuevoValor.toUpperCase()));
    watch(apellidos, (nuevoValor) => ActualizarPayload("apellido_paterno", nuevoValor.toUpperCase()));

    watch(nacionalidad, (nuevoValor) => ActualizarPayload('nacionalidad_id', nuevoValor));
    watch(genero, (nuevoValor) => ActualizarPayload('sexo_id', nuevoValor));
    watch(fechaNacimiento, (nuevoValor) => ActualizarPayload('fecha_nacimiento', nuevoValor));
    watch(estadoCivil, (nuevoValor) => ActualizarPayload('estado_civil_id', nuevoValor));

    const MostrarValores = (DATA) => {

        console.log(DATA)
        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        numeroDocumento.value = (DATA?.rut == null)? '' :DATA?.rut;
        payload_old.rut = DATA?.rut ?? '';
        payload.rut = DATA?.rut ?? '';

        nombres.value = (DATA?.nombres == null)? '' :DATA?.nombres;
        payload_old.rut = DATA?.nombres ?? '';
        payload.rut = DATA?.nombres ?? '';

        apellidos.value = (DATA?.apellido_paterno == null)? '' :DATA?.apellido_paterno;
        payload_old.rut = DATA?.apellido_paterno ?? '';
        payload.rut = DATA?.apellido_paterno ?? '';

        nacionalidad.value = (DATA?.unidad_sueldo == null)? '' :DATA?.unidad_sueldo;
        payload_old.rut = DATA?.rut ?? '';
        payload.rut = DATA?.rut ?? '';

        genero.value = (DATA?.salario_base == null)? '' :DATA?.sexo_id;
        payload_old.rut = DATA?.rut ?? '';
        payload.rut = DATA?.rut ?? '';

        fechaNacimiento.value = (DATA?.fecha_nacimiento == null)? '' :DATA?.fecha_nacimiento;
        payload_old.rut = DATA?.fecha_nacimiento ?? '';
        payload.rut = DATA?.fecha_nacimiento ?? '';

        estadoCivil.value = (DATA?.estado_civil_id == null)? '' :DATA?.estado_civil_id;
        payload_old.rut = DATA?.estado_civil_id ?? '';
        payload.rut = DATA?.estado_civil_id ?? '';
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
    })


    const Enviar = () => {
        console.log(payload)
    }
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
