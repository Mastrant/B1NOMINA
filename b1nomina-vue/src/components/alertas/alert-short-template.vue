<template>
        <transition name="fade">
           <div class="card-contend" v-if="mostrarComponente">
             <h3>{{Titulo}}</h3>
             <p>{{Descripcion}}</p>
             <div>
               <button type="button" class="button" @click="cerrarNotificacion">
                 <ExitColorIcon />
                 <span>Cerrar</span>
               </button>    
             </div>
           </div>
        </transition>
</template>

<script setup>
import ExitColorIcon from '@/components/icons/Exit-color-icon.vue';
import { ref, watch, defineProps, onMounted, defineExpose } from 'vue';

const props = defineProps({
 Titulo: {
    type: String,
    default: 'Titulo Cartica'
 },
 Descripcion: {
    type: String,
    default: 'Texto area cartica'
 },
 visible: {
    type: Boolean,
    default: true
 }
});

const mostrarComponente = ref(props.visible);

const ActivarNotificacion = () => {
 mostrarComponente.value= true;
 setTimeout(() => {
    mostrarComponente.value = false;
 }, 8000);
};

const cerrarNotificacion = () => {
 mostrarComponente.value = false;
};

watch(() => props.visible, (valor) => {
 mostrarComponente.value = valor;
});

defineExpose(
    ActivarNotificacion,
)
</script>

<style scoped>
div.card-contend {
    width: 416px; 
    height: 234px; 
    padding: 24px; 
    background: white; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 6px; 
    flex-direction:column;
    justify-content: center;
    align-items: flex-end;
    gap: 12px;
    display: inline-flex;
    z-index: 5;
    box-sizing: border-box;
    position: absolute;
}

div.card-contend > h3 {
    color: black;
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    word-wrap: break-word;
    margin: 0;
    text-align: start;
    width: 100%;
}

div.card-contend > p {
    margin: 0;
    color: black;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

button {
    height: 50px;
    box-sizing: border-box;
    padding: 12px 0;
    border: none;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-self: center;
    align-items: center;
}

button > span {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    
}

/* Transiciones de difuminado */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
   }
   .fade-enter, .fade-leave-to {
    opacity: 0;
   }
</style>