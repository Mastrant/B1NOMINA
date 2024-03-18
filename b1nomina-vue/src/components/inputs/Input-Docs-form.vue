<template>
    <!-- Contenedor principal para la sección de multimedia -->
    <div class="multimedia">
      <!-- Contenedor para la funcionalidad de añadir una foto -->
      <div class="add-docs">
        <!-- Muestra el texto "Arrastrar imagen aquí" si no hay una imagen cargada -->
        <span v-if="Documento.length <= 0">Arrastrar Archivo Aquí</span>
        <!-- Muestra la imagen cargada si la variable 'ubicacion' tiene una URL de imagen -->
        <span v-else class="archivo">{{DocumentoEnviado}}</span>
        <!-- Input oculto para seleccionar un archivo de imagen -->
        <input 
            name="input-docs"
            id="input-docs"
            type="file"
            @change="ingresarDocs"
        >
        <!-- Etiqueta para el input de archivo, permite seleccionar un archivo de imagen -->
        <label for="input-docs">Selecionar Archivo</label>
      </div>
    </div>
</template>

<script setup>
// Importa las funciones ref y defineEmits de Vue
import { ref, defineEmits, defineExpose } from 'vue';

// Crea una referencia reactiva para almacenar el documento
const Documento = ref('')

// Declara el evento que el componente puede emitir, en este caso, 'actualizarDocumento'
const emit = defineEmits(['actualizarDocumento']);

const reset = () => {
    Documento.value = '';
}

defineExpose({
    reset,
})

/**
 * Función para manejar la imagen seleccionada por el usuario.
 * 
 * @param {Event} evento - El evento generado por el input de tipo file.
 * @returns {void} emite un evento 'actualizarDocumento' con la cadena en base 64 de la imagen o una cadena vacía si la imagen no es válida.
 */
const ingresarDocs = (evento) => {
    // Define las extensiones de archivo válidas para la imagen
    const ExtencionesValidas = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    // Obtiene la imagen seleccionada por el usuario
    const DocumentoEnviado = evento.target.files[0]
    console.log(DocumentoEnviado)
    // Verifica si la imagen tiene una extensión válida
    if (ExtencionesValidas.includes(DocumentoEnviado?.type)){
        
        // Emite el evento 'actualizarDocumento' con el valor actual de 'Documento'
        emit('actualizarDocumento', Documento.value)

    } else {
        // Si la imagen no es válida, limpia la referencia reactiva 'Documento'
        Documento.value = ''
        
        // Emite el evento 'actualizarDocumento' con el valor actual de 'Documento'
        emit('actualizarDocumento', Documento.value)
    }
};
</script>

<style scoped>
/* Estilo para el contenedor de elementos multimedia */
div.multimedia {
 display: flex; /* Utiliza Flexbox para organizar los elementos */
 flex-direction: column; /* Organiza los elementos en una columna */
 gap: 12px; /* Define un espacio de 12px entre los elementos */
 box-sizing: content-box; /* Define cómo se calculan las dimensiones del elemento */
 width: 100%; /* Ocupa el ancho completo del contenedor padre */
}

/* Estilo para los elementos de texto dentro del contenedor multimedia */
div.multimedia div.add-docs > span {
    font-family: Poppins;
    color: #1A245B;
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
}

/* Estilo para el botón de añadir una foto */
div.multimedia div.add-docs {
 border-radius: 6px; /* Bordes redondeados */
 border: 0.5px #363855 dashed; /* Borde discontinuo de 0.5px de ancho y color #363855 */
 border-width: 2px; /* Ancho del borde */
 box-sizing: border-box; /* Define cómo se calculan las dimensiones del elemento */
 padding: 12px 48px; /* Espaciado interno */
 display: flex; /* Utiliza Flexbox para organizar los elementos */
 flex-direction: column; /* Organiza los elementos en una fila */
 justify-content: space-between; /* Distribuye el espacio entre los elementos */
 align-items: center; /* Alinea los elementos verticalmente al centro */
 width: 100%; /* Ocupa el ancho completo del contenedor padre */
 height: fit-content; /* Ajusta la altura al contenido */
}

/* Estilo para el botón de añadir una foto cuando está activo */
div.add-docs.active {
    background: #d3dff7; /* Color de fondo */
}

/* Estilo para el input de tipo file, oculto */
input {
    display: none; /* Oculta el input */
}

/* Estilo para la etiqueta del botón de añadir una foto */
label {
    box-sizing: border-box; /* Define cómo se calculan las dimensiones del elemento */
    padding-left: 15.39px; /* Espaciado interno a la izquierda */
    padding-right: 15.39px; /* Espaciado interno a la derecha */
    padding-top: 9.62px; /* Espaciado interno arriba */
    padding-bottom: 9.62px; /* Espaciado interno abajo */
    background: none; /* Sin fondo */
    box-shadow: 0px 0.9615941643714905px 1.923188328742981px rgba(16, 24, 40, 0.05); /* Sombra alrededor del elemento */
    border-radius: 6px; /* Bordes redondeados */
    overflow: hidden; /* Oculta el contenido que excede el tamaño del elemento */
    border: 0.96px #1A2771 solid; /* Borde sólido de 0.96px de ancho y color #1A2771 */
    justify-content: center; /* Alinea los elementos horizontalmente al centro */
    align-items: center; /* Alinea los elementos verticalmente al centro */
    gap: 7.69px; /* Espaciado entre los elementos */
    display: flex; /* Utiliza Flexbox para organizar los elementos */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
    cursor: pointer; /* Cambia el cursor a un puntero al pasar el mouse */
    width: fit-content; /* Ajusta el ancho al contenido */

    /* Estilos de fuente */
    color: #002E99; /* Color del texto */
    font-size: 16px; /* Tamaño de la fuente */
    font-family: Poppins; /* Fuente utilizada */
    font-weight: 400; /* Peso de la fuente */
    line-height: 26px; /* Altura de línea */
    word-wrap: break-word; /* Permite que las palabras largas se rompan y pasen a la siguiente línea */
}

/* Estilo para la etiqueta del botón de añadir una foto al pasar el mouse */
label:hover {
    background: #ebedf1; /* Color de fondo al pasar el mouse */
}
</style>