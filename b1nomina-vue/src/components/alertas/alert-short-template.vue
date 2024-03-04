<template>
    <Teleport to="#modal-container">
        <transition name="fade">
            <div class="card-contend">
                <h3>{{Titulo}}</h3>
                <p>{{Descripcion}}</p>
                <button>Cerrar</button>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Titulo: {
        String,
        default: 'Titulo Cartica'
    },
    Descripcion: {
        String,
        default: 'Texto area cartica'
    }
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
    justify-content: center;
    align-items: flex-end;
    gap: 12px;
    display: inline-flex;
    z-index: 50;
    box-sizing: border-box;
    position: absolute;
}

div.card-contend > h3 {
    color: black;
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    word-wrap: break-word;
}

div.card-contend > p {
    margin: 0;
    color: black;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity  0.3s;
  }
.fade-enter, .fade-leave-to {
    opacity:  0;
}
</style>