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
                        <slot></slot>

                        <!--contenedor botones-->
                        <div class="contend-button-modal">
                            <TemplateButton Tipo="submit" :text="textSubmit"/>
                            <TemplateButton2 text="Cancelar" @click="close" />
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>-

<script setup>
import {defineProps, ref, defineEmits} from 'vue';
import CloseIconVue from '../icons/Close-icon.vue';
import TemplateButton2 from '../botones/Template-button2.vue'
import TemplateButton from '../botones/Template-button.vue'


// Define las props correctamente
const props = defineProps({
    activarModal: {
        type: Boolean,
    },
    NombreAccion: {
        type: String,
    },
    textSubmit: {
        type: String,
        default: 'Siguiente'
    }
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
    display: flex;
    justify-content:center;
    align-items: center;
    height: 100vh;
    width: 100%;
    position:absolute;
    top:0;
    left: 0;
    background-color:  #00000080;
    z-index: 500;
}

div.modal-inner {
    display:flex;
    flex-direction: column;
    position: relative;
    max-width: 810px;
    width: 80%;

    box-sizing: border-box;
    padding: 38px;
    background: #FFFFFF;
    gap: 24px;

    border-radius: 8px;
}

div.modal-inner > div {
    display: flex;
    gap:24px;
}

div.header-modal {
    background-color: rgb(255, 255, 255);
    display:flex;
    justify-content: space-between;
    align-items:center
}

div.header-modal > span.NombreAccion {
  font-family: "Poppins-Medium", Helvetica;
  font-weight: 500;
  color: rgba(26, 36, 91, 1);
  font-size: 24px;
  letter-spacing: 0;
  line-height: 34px;
  white-space: nowrap;
}

.icon {
    cursor: pointer;
}
div.contend-button-modal {
    display: flex;
    justify-content: start;
}
</style>