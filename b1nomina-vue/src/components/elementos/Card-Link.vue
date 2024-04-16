<template>
   <div class="card">
        <h3>Titulo de la Carta</h3>
        <span>Descripcion de la Carta</span>

        <router-link class="card-button" :to="`/sociedad/${id}/`">
            <EditIcon/>
            Editar
        </router-link>
 
 
   </div>
</template>

<script setup>
import { defineProps } from 'vue';
import EditIcon from '@/components/icons/Edit-icon.vue';

const props = defineProps({

});


</script>

<style scoped>
.card {
    width:416px;
height: 158px;
padding: 24px;
gap: 12px;
border-radius: 6px 0px 0px 0px;
opacity: 0px;
box-shadow: 0px 0px 10px 0px #00000040;


}
</style>