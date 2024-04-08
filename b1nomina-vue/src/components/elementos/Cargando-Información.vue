<template>
    <div class="contend">
        <div class="card">
            <Cargando />
        </div>        
    </div>
</template>

<script setup>
import Cargando from '../Animation/Cargando.vue';
</script>

<style scoped>
.contend {
    background-color: #cccccc ;
    width: 100vw;
    height: 100vh;
    transition: all 1.5s;
}

.card {
    display: flex;
    justify-content: center;
    align-self: center;

}
</style>
