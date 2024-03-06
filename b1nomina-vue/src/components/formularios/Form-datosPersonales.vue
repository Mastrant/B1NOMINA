<template>
    <form class="formulario" id="Form2" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos personales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="nacionalidad" 
                        :options="ListaNacionalidad" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Género">
                <template v-slot>
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Masculino" 
                        :valor="0"
                        id-radius="Masculino"  
                    />
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Femenino" 
                        :valor="1"
                        id-radius="Femenino"  
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de nacimiento"
                v-model="fechaNacimiento"
                @update:modelValue="fechaNacimiento = $event"
            />

            <LayoutInputLineal textLabel="Estado civil">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="estadoCivil" 
                        :options="parametros.estadocivil" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <h2 class="titulo-form">Datos de contacto</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Region">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="region" 
                        :options="parametros.regiones" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Localidad">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="localidad" 
                        :options="ListaLocalidad" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingresar dirección" 
                Titulo="Direccion" 
                v-model="direccion"
                @update:modelValue="direccion = $event"
            />
        </div>

        <div class="row-form">

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Celular" 
                v-model="telefonoCelular"
                @update:modelValue="telefonoCelular = $event"
                :minimo-caracteres="8"
                :maximo-caracteres="12"
            />

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Local" 
                v-model="telefonoLocal"
                @update:modelValue="telefonoLocal = $event"
            />
        </div>
        
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InputRadioButton from '../botones/Input-Radio-button.vue';

import { ref, watch, defineEmits, defineProps, reactive, defineExpose } from 'vue';

// Define los eventos que el componente puede emitir
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta"
]);

const props = defineProps({
    EmpleadoID:{
        Number,
    },
    parametros: {
        type: Object,
        default: {}
    }
});

// Método para reiniciar el formulario
const resetForm = () => {
    //datos personales
    const nacionalidad = '';
    const genero = '';
    const fechaNacimiento = '';
    const estadoCivil = '';

    //datos de contacto
    const region = '';
    const localidad = '';
    const direccion = '';
    const telefonoCelular = '';
    const telefonoLocal = '';
    // Reinicia el payload
    Object.keys(payload).forEach(key => {
        payload[key] = '';
    });
}
// Exponer la función de limpieza para que sea accesible desde el componente padre
defineExpose({
    resetForm
});

const NextModal = () => {
    console.log("NextModal")
    emit('nextModal');
};

const sendRespuesta = (Data) => {
  emit("respuesta", Data); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

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

];
const ListaLocalidad = ref(''); //Los datos se asignan segun el idRegion

// inicializacion de variables reactivas
//datos personales
const nacionalidad = ref('');
const genero = ref('');
const fechaNacimiento = ref('');
const estadoCivil = ref(''); 

//datos de contacto
const region = ref('');
const localidad = ref('');
const direccion = ref('');
const telefonoCelular = ref('');
const telefonoLocal = ref('');

// payload del formulario datos personales
const payload = reactive({
    nacionalidad: '',
    genero: 0,
    fechaNacimiento: '',
    estadoCivil: '',
});

// payload del formulario datos de contacto
const payload2 = reactive({
    region: '',
    localidad: '',
    direccion: '',
    telefonoCelular: '',
    telefonoLocal: '',
});

//filtra la lista de regiones segun el id
const filtroRegion = (id) => {
    ListaLocalidad.value = props.parametros.localidad.filter(item => item.idregion == id)
};

//actualizar datos del payload a enviar
const ActualizarPayload1 = (propiedad, valor) => {
    payload[propiedad] = valor;
};
//actualizar datos del payload a enviar
const ActualizarPayload2 = (propiedad, valor) => {
    payload2[propiedad] = valor;
};

//Escuchar cambio en las entradas

watch(nacionalidad, (nuevoValor) => ActualizarPayload1('nacionalidad', nuevoValor));
watch(genero, (nuevoValor) => ActualizarPayload1('genero', nuevoValor));
watch(fechaNacimiento, (nuevoValor) => ActualizarPayload1('fechaNacimiento', nuevoValor));
watch(estadoCivil, (nuevoValor) => ActualizarPayload1('estadoCivil', nuevoValor));

watch(region, (nuevoValor) => {
    filtroRegion(nuevoValor);
    ActualizarPayload2('region', nuevoValor)
    
});

watch(localidad, (nuevoValor) => ActualizarPayload2('localidad', nuevoValor));
watch(direccion, (nuevoValor) => ActualizarPayload2('direccion', nuevoValor));
watch(telefonoCelular, (nuevoValor) => ActualizarPayload2('telefonoCelular', nuevoValor));
watch(telefonoLocal, (nuevoValor) => ActualizarPayload2('telefonoLocal', nuevoValor));


/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {
    console.log("modal Datos Persoanles")
    console.log("Datos User: " + props.EmpleadoID)
    console.log(payload)
    console.log(payload2)
    sendRespuesta({texto:"prueba 2", valor:true})
    NextModal()

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
    color: black;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}

/* Estilo para el texto dentro del botón de añadir una foto, 
asegurando que el texto sea legible y coherente con el diseño */
.add-photo > span {
    color: #C2C2C2;
    font-size:  18px;
    font-family: Poppins;
    font-weight:  600;
    line-height:  40px;
    word-wrap: break-word;
}
</style>
