<template>
    <Teleport :disabled="activarNotifiacion" to="#modal-container">
        <transition name="Notificacion">
            <div v-if="activarNotifiacion" class="Notificacion-fondo">
                <transition name="Animacion-Modal-inner">
                    <div v-if="activarNotifiacion" class="Notificacion-inner" :class=" Status ? 'correct' : 'error '">
                        <span 
                            class="NombreAccion"
                            :class=" Status ? 'correct' : 'error '"
                        >
                            {{Mensaje}}
                        </span>

                        <ExitColorIcon 
                            class="icon" 
                            @click="close" 
                            :class=" Status ? 'correct' : 'error '"
                        />
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
/* uso del componente: 
    <TemplateAlertModal 
        @closeNotificacion="funcion()" 
        :activarNotifiacion="variable" 
        Mensaje="Texto a mostrar" 
        :Status="true||false"
    />

    const variable = ref(false)
     const funcion = () => {
        variable.value = !variable.value;
    };

*/

import {defineProps, defineEmits} from 'vue';
import ExitColorIcon from '../icons/Exit-color-icon.vue';

// Define las props correctamente
const props = defineProps({
    activarNotifiacion: {
        type: Boolean,
    },
    Mensaje: {
        type: String,
    },
    Status: {
        Boolean,
    }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'closeNotificacion'
]);

const close = () => {
    emit('closeNotificacion');
};

</script>

<style scoped>

/* Estilos para el contenedor del modal, se centra en el viewport y cubre toda la pantalla con un fondo semi-transparente */
div.Notificacion-fondo {
    display: flex; /* Utiliza Flexbox para centrar el contenido */
    justify-content: end; /* Centra horizontalmente el contenido */
    align-items: start; /* Centra verticalmente el contenido */
    height:  100vh; /* Ajusta la altura al  100% de la altura de la ventana del navegador */
    width:  100vw; /* Ajusta la anchura al  100% del ancho de la ventana del navegador */
    position:absolute; /* Posiciona el modal absolutamente en relación al primer ancestro posicionado (o el viewport si no hay ninguno) */
    top:0; /* Alinea el modal con el borde superior de la ventana del navegador */
    left:  0; /* Alinea el modal con el borde izquierdo de la ventana del navegador */
    background-color:  none; /* Fondo negro con  50% de transparencia */
    z-index:  0; /* Asegura que el modal se muestre por encima de otros elementos */
    box-sizing: border-box;
}

/* Estilos para el contenido interno del modal, con un diseño flexible y limitaciones de tamaño */
div.Notificacion-inner {
    margin-top: 30px;
    margin-right: 30px;
    padding: 24px; 
    background: #ffffff; 
    border: 1px black solid; 
    justify-content: center; 
    align-items: flex-start; 
    gap: 24px; 
    display: inline-flex;
}

div.correct {
    background: #BFF7D5; 
    border: 1px #18B055 solid; 
}

div.error {
    background: #F2C0BE;
    border: 1px #D42E27 solid;
}

span.correct {
    color: #18B055;
}

span.error {
    color: #D42E27;
}

svg.correct {
    stroke: #18B055;
}

div > svg.error {
    stroke: #D42E27;
}

span {
    font-size: 13.46px;
    font-family: Inter;
    font-weight: 500;
    line-height: 19.23px;
    word-wrap: break-word;
}

.icon {
    cursor: pointer;
}

/* Animación de entrada (fade-in) */
.Notificacion-enter-active, .Notificacion-leave-active {
 transition: opacity 0.5s;
}

/* Estado inicial de la animación de entrada */
.Notificacion-enter-from, .Notificacion-leave-to {
 opacity: 0;
}

/* Estado final de la animación de entrada */
.Notificacion-enter-to, .Notificacion-leave-from {
 opacity: 1;
}


</style>
