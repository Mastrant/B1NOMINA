<template>
    <!-- Contenedor principal que envuelve toda la entrada de línea -->
    <div class="input-line-contend">
        <!-- Etiqueta que describe el campo de entrada, mostrando el título y, opcionalmente, un asterisco si el campo es requerido -->
        <label class="input-label">
            {{Titulo}}
            <span v-show="requerido">*</span>
        </label>
        
        <!-- Campo de entrada personalizable con varios atributos y eventos -->
        <input class="input-template"
            :required="requerido"
            :disabled="Deshabilitar"
            :type="Tipo" 
            :placeholder="Placeholder"
            :minlength="minimoCaracteres"
            :maxlength="maximoCaracteres"
            :step="NumeroDecimales"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :list="id_list"
        >
        
        <!-- Lista de opciones para autocompletar el campo de entrada -->
        <datalist class="datalistEstilos" :id="id_list" v-if="withNombre == true">
            <!-- Genera opciones dinámicamente basadas en el array 'opciones' -->
            <option v-for="opcion in opciones" :key="opcion?.id" :value="opcion[ParametroFiltro]"> {{opcion.nombre}} </option>
        </datalist>
        <!-- Lista de opciones para autocompletar el campo de entrada -->
        <datalist class="datalistEstilos" :id="id_list" v-else>
            <!-- Genera opciones dinámicamente basadas en el array 'opciones' -->
            <option v-for="opcion in opciones" :key="opcion?.id" :value="opcion[ParametroFiltro]"></option>
        </datalist>
    </div>        
        
</template>

<script setup>
/* uso 
    <InputLinealDescripcion 
        Tipo="" Tipo de entrada
        Titulo="" Titulo superior
        v-model="" captura del valor
        Placeholder="" Texto interno
        @update:modelValue="variable = $event" Sincronizacion entre padre/hijo
        requerido="" Si el campo es requerido o no
        :minimo-caracteres="" minimo de caracteres del campo
        :maximo-caracteres="" maximo de caracteres del campo
        :opciones="[] o {}" Lista de opciones a selecionar
    />
*/
/* Componente de entrada de línea con soporte para diversas propiedades y eventos */
import { defineProps } from 'vue';

// Propiedades que el componente acepta //

const props = defineProps({
    // Propiedad para capturar el valor del campo de entrada
    modelValue: {
        type: [String, Number],
        default: '',
        description: 'El valor actual del campo de entrada.'
    },
    // Propiedad para definir el texto de sugerencia en el campo de entrada
    Placeholder : {
        type: [String, Number],
        default: 'Datos del campo',
        description: 'Texto sugerido que aparece en el campo de entrada.'
    },
    // Propiedad para definir el título del campo de entrada
    Titulo: {
        type: String,
        default: "Titulo",
        description: 'Título o descripción del campo de entrada.'
    },
    // Propiedad para definir el tipo de entrada (por ejemplo, texto, número, etc.)
    Tipo: {
        type: String,
        default: 'text',
        description: 'Tipo de entrada (texto, número, etc.).'
    },
    // Propiedad para habilitar o deshabilitar el campo de entrada
    Deshabilitar: {
        type: Boolean,
        default: false,
        description: 'Indica si el campo de entrada está habilitado o deshabilitado.'
    },
    // Propiedad para definir el número mínimo de caracteres requeridos
    minimoCaracteres: {
        type: [Number, String],
        default: 2,
        description: 'Número mínimo de caracteres requeridos en el campo de entrada.'
    },
    // Propiedad para definir el número máximo de caracteres permitidos
    maximoCaracteres: {
        type:[Number, String],
        default: 100,
        description: 'Número máximo de caracteres permitidos en el campo de entrada.'
    },
    // Propiedad para definir el número de decimales permitidos en entradas numéricas
    NumeroDecimales: {
        type: [Number, String],
        default: 2,
        description: 'Número de decimales permitidos en entradas numéricas.'
    },
    // Propiedad para indicar si el campo de entrada es obligatorio
    requerido: {
        type: Boolean,
        default: false,
        description: 'Indica si el campo de entrada es obligatorio.'
    },
    // Propiedad para definir opciones de autocompletado para el campo de entrada
    opciones: {
        type: Object,
        default: [],
        description: 'Lista de opciones para autocompletar el campo de entrada.'
    },
    // Propiedad para definir el parámetro de filtro utilizado para extraer valores de las opciones
    ParametroFiltro: {
        type: String,
        default: "nombre",
        description: 'Parámetro utilizado para extraer valores de las opciones de autocompletado.'
    },
    // Propiedad para definir el ID del elemento datalist asociado al campo de entrada
    id_list: {
        type: String,
        default: "example",
        description: 'ID del elemento datalist asociado al campo de entrada.'
    },
    withNombre: {
        type: Boolean,
        default: false
    }
});

</script>

<style scoped>
/* Establece el estilo para un contenedor de entrada de línea, utilizando flexbox para organizar sus elementos hijos en una columna. */
div.input-line-contend {
    display: flex; /* Utiliza flexbox para el diseño. */
    flex-direction: column; /* Organiza los elementos hijos en una columna vertical. */
    box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho y la altura del elemento. */
    width: 100%; /* Ocupa el ancho completo del contenedor padre. */
    max-height: 66px; /* Establece una altura máxima de 66px para el contenedor. */
    align-self: center; /* Centra el contenedor dentro de su contenedor padre. */
    justify-content: space-around;
}

/* Establece el estilo para las etiquetas de entrada dentro del contenedor de entrada de línea. */
label.input-label {
    font-weight: 500; /* Establece el peso de la fuente a 500 (medio). */
    word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea. */
    color: black; /* Establece el color del texto a un gris claro. */
    font-size: 16px;
    line-height: 20px;
    text-align: left;
}

/* Establece el estilo para los spans dentro de las etiquetas de entrada. */
label.input-label span{
    color: #E32A40; /* Establece el color del texto a un rojo vibrante. */
    font-size: 13px; /* Establece el tamaño de fuente a 13px. */
    font-family: Poppins; /* Utiliza la fuente Poppins. */
    font-weight: 500; /* Establece el peso de la fuente a 500 (medio). */
    word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea. */
}

/* Establece el estilo para los campos de entrada dentro del contenedor de entrada de línea. */
input.input-template {
    margin-top: 8px; /* Establece un margen superior de 8px. */
    color: #1A245B; /* Establece el color del texto a un azul oscuro. */
    font-size: 18px; /* Establece el tamaño de fuente a 18px. */
    height: 46px; /* Establece una altura de 46px para el campo de entrada. */
    border: 2px solid #1A245B;
    border-radius: 7.8px;
    padding: 0 12px;
    box-sizing: border-box;
}

/* Establece el estilo para el estado de foco del campo de entrada. */
input.input-template:focus {
    outline: none; /* Elimina el contorno que aparece cuando el campo de entrada está enfocado. */
}

datalist {
    height: 100px;
}

/* Media query para pantallas pequeñas */
@media (max-width: 1400px) {
    label.input-label {
        font-size: 14px; /* Reduce el tamaño de la fuente para pantallas pequeñas. */
    }

    input.input-template {
        font-size: 16px; /* Reduce el tamaño de la fuente para pantallas pequeñas. */
        height: 38px; /* Reduce la altura del campo de entrada para pantallas pequeñas. */
    }
}
</style>
