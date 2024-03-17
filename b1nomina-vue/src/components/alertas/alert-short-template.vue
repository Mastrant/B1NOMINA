<template>
        <transition name="fade">
           <div class="card-contend" v-if="mostrarComponente">
             <h3 class="titulo">{{Titulo}}</h3>
             <p class="descripcion">{{Descripcion}}</p>
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
/**
 * Uso del componete:
 * 
 * <AlertShort ref="nombre de la referencia" />
 * const nombre de la referencia = ref(null)
   const showN = () => {
    nombre de la referencia.value.ActivarNotificacion(
        {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"}
    );
   }
 */

import ExitColorIcon from '@/components/icons/Exit-color-icon.vue';
import { ref, defineExpose } from 'vue';

const mostrarComponente = ref(false);
const Titulo = ref('');
const Descripcion = ref('')

const ActivarNotificacion = (DataRecivida) => {
 Titulo.value = DataRecivida?.Titulo;
 Descripcion.value = DataRecivida?.Descripcion;
 mostrarComponente.value= true;
 setTimeout(() => {
    mostrarComponente.value = false;
 }, 4000);
};

const cerrarNotificacion = () => {
 mostrarComponente.value = false;
};


defineExpose({
    ActivarNotificacion,
    cerrarNotificacion,
});
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
    gap: 12px;
    display:flex;
    flex-direction: column;
    z-index: 5;
    box-sizing: border-box;
    position: absolute;
    align-self: baseline;
    align-items: flex-end;
    justify-content: space-between;

    bottom: 0; /* Ajusta la posición en el eje Y */
    right: 0; /* Ajusta la posición en el eje X */
    margin: 48px 24px;
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

div.card-contend > p.descripcion {
    margin: 0;
    color: black;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    text-align: start;
    width: 100%;
    height: 100%;

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