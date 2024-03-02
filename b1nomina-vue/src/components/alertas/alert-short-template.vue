<template>
    <Teleport :disabled="activarModal" to="#modal-container">
        <transition name="Animacion-Modal">
            <div v-show="activarModal" class="modal">
                <transition name="Animacion-Modal-inner">
                    <div v-show="activarModal" class="modal-inner">
                        <!--contenedor cabecera-->
                        <div class="header-modal">
                            <span class="NombreAccion">{{NombreAccion}}</span>
                            <CloseIconVue class="icon" @click="close" />
                        </div>

                        <!--contenedor  data principal-->
                        <slot>

                        </slot>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script setup>

import {defineProps, defineEmits} from 'vue';
import CloseIconVue from '../icons/Close-icon.vue';

// Define las props correctamente
const props = defineProps({
    activarModal: {
        type: Boolean,
    },
    NombreAccion: {
        type: String,
    },
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'closeModal'
]);

const close = () => {
    emit('closeModal');
};

</script>

<style scoped>
div.modal {
    display: flex; /* Utiliza Flexbox para centrar el contenido */
    justify-content:center; /* Centra horizontalmente el contenido */
    align-items: center; /* Centra verticalmente el contenido */
    height:  100%; /* Ajusta la altura al  100% de la altura de la ventana del navegador */
    width:  100%; /* Ajusta la anchura al  100% del ancho de la ventana del navegador */
    position:absolute; /* Posiciona el modal absolutamente en relación al primer ancestro posicionado (o el viewport si no hay ninguno) */
    top:0; /* Alinea el modal con el borde superior de la ventana del navegador */
    left:  0; /* Alinea el modal con el borde izquierdo de la ventana del navegador */
    background-color:  #00000080; /* Fondo negro con  50% de transparencia */
    z-index:  500; /* Asegura que el modal se muestre por encima de otros elementos */
    box-sizing: border-box;
}

/* Estilos para el contenido interno del modal, con un diseño flexible y limitaciones de tamaño */
div.modal-inner {
    display:flex; /* Utiliza Flexbox para organizar el contenido */
    flex-direction: column; /* Organiza los elementos hijos en columna */
    position: relative; /* Posiciona el contenido interno del modal en relación al modal */
    max-width:  810px; /* Establece un ancho máximo para el modal */
    width:  80%; /* Ajusta el ancho al  80% del ancho del contenedor modal */

    box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el tamaño total del elemento */
    padding:  38px; /* Espacio interior alrededor del contenido */
    background: #FFFFFF; /* Fondo blanco */
    gap:  24px; /* Espacio entre los elementos hijos de Flexbox */

    border-radius:  8px; /* Bordes redondeados */
}

/* Estilos para los elementos div dentro del modal-inner, utilizando Flexbox para organizarlos */
div.modal-inner > div {
    display: flex; /* Utiliza Flexbox para organizar los elementos */
    gap:24px; /* Espacio entre los elementos hijos de Flexbox */
}

/* Estilos para el encabezado del modal, con un diseño flexible y alineación de elementos */
div.header-modal {
    background-color: rgb(255,  255,  255); /* Fondo blanco */
    display:flex; /* Utiliza Flexbox para organizar el encabezado */
    justify-content: space-between; /* Alinea los elementos hijos horizontalmente con espacio entre ellos */
    align-items:center; /* Alinea los elementos hijos verticalmente en el centro */
}

/* Estilos específicos para el texto del encabezado del modal, ajustando el tipo de fuente y estilos de texto */
div.header-modal > span.NombreAccion {
  font-family: "Poppins-Medium", Helvetica; /* Tipo de fuente */
  font-weight:  500; /* Estilo de fuente */
  color: rgba(26,  36,  91,  1); /* Color del texto */
  font-size:  24px; /* Tamaño de la fuente */
  letter-spacing:  0; /* Espacio entre letras */
  line-height:  34px; /* Altura de línea */
  white-space: nowrap; /* Evita que el texto se ajuste a una nueva línea */
}

/* Estilos para el icono dentro del modal, permitiendo interacciones del cursor */
.icon {
    cursor: pointer; /* Cambia el cursor a un puntero cuando se pasa sobre el icono */
}

</style>