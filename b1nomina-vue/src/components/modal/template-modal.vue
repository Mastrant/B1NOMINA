<template>
    <Teleport :disabled="activarModal" to="#modal-container">
        <transition name="Animacion-Modal">
            <div v-show="activarModal" class="modal">
                <transition name="Animacion-Modal-inner">
                    <div v-show="activarModal" class="modal-inner">
                        <div class="header-modal">
                            <span>{{NombreAccion}}</span>
                            <CloseIconVue @click="close" />
                        </div>
                        
                        <slot />
                        <div class="contend-button-modal">
                            <button type="button" @click="Siguiente">
                                Siguiente
                            </button>
                            <button type="button" @click="close">
                                close
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>-

<script setup>
import {defineProps, ref, defineEmits} from 'vue'
import CloseIconVue from '../icons/Close-icon.vue';


// Define las props correctamente
const props = defineProps({
    activarModal: {
        type: Boolean,
    },
    NombreAccion: {
        type: String,
    }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'closeModal'
]);

const close = () => {
    emit('closeModal');
}

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
    position: relative;
    max-width: 810px;
    width: 80%;

    box-sizing: border-box;
    padding: 38px;
    background: #FFFFFF;

}
</style>