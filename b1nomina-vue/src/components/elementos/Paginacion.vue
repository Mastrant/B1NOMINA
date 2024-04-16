<template>
    <div class="pagination">
        <!--Boton de Previo-->
        <PaginateButton v-if="pagina > 1">
            <template #icono>
                <img src="@/components/icons/svg/OneLeft-icon.svg" alt="Prev"> 
            </template>
        </PaginateButton>
        // https://www.youtube.com/watch?v=d2ve7xQNco8

        <PaginateButton texto="1">
        
        </PaginateButton>
        
        <PaginateButton v-for="number in totalPaginas" :key="number" texto="2" :activate="pagina == number"></PaginateButton>
        

        <PaginateButton  v-if="pagina < totalPaginas">
            <template #icono>
                <img src='@/components/icons/svg/OneRigth-icon.svg' alt="Next">  
            </template>
        </PaginateButton>
        {{ totalPaginas }}
    </div>
</template>

<script setup>
import PaginateButton from '@/components/botones/Paginate-button.vue';

import { defineProps, ref } from 'vue';

const props = defineProps({
    totalPaginas: {
        Number,
        default: 0
    }
})

const paginacion = () => {

}

const pagina = ref(2)
const paginasPrevias = pagina - 1;
const paginasPosteriores = pagina + 1;

</script>

<style scoped>
div.pagination {
    display: flex;
}

</style>