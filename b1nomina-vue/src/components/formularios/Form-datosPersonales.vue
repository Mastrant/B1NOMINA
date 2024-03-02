<template>
    <form class="formulario" id="datosPersonales" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos personales</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad">
                <template v-slot>
                    <ListaTemplateLineal 
                        required 
                        v-model="nacionalidad" 
                        :options="ListaNacionalidad" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Género">
                <template v-slot>
                   <InputRadioButton v-model="genero" grupo="genero" texto="Masculino" :valor="0"/>
                   <InputRadioButton v-model="genero" grupo="genero" texto="Femenino" :valor="1"/>
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
                        required 
                        v-model="estadoCivil" 
                        :options="ListaEstadoCivil" 
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
                        required 
                        v-model="region" 
                        :options="ListaRegion" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Localidad">
                <template v-slot>
                    <ListaTemplateLineal 
                        required 
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

import { ref, watch, defineEmits, defineProps } from 'vue';

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

const ListaEstadoCivil = [
    {
        id: 0,
        nombre: "soltero"
    },
    {
        id: 1,
        nombre: "Casado"
    },
    {
        id: 2,
        nombre: "Viudo"
    }
]

const ListaRegion = [];

const ListaLocalidad = [];



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

// payload de la peticion
const payload = {

}

const TestValue = (value) => {
    console.log(value)
};
defineProps({
    EmpleadoID:{
        Number,
    }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'nextModal'
]);

const NextModal = () => {
    console.log("NextModal")
    emit('nextModal');
};

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = () => {
    (tipoDocumentoSelect.value == 0 | tipoDocumentoSelect.value == '')
    ? console.log("falta seleccionar un tipo de documento")
    : console.log(payload)
};


watch(nacionalidad, TestValue);
watch(genero, TestValue);
watch(fechaNacimiento, TestValue);
watch(estadoCivil,TestValue);
watch(region, TestValue);


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
