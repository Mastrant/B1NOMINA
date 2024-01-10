<template>

    <button class="button" type="button" @onClick="showPassword">
        <div class="icon-conted">
            <HiddeIcon />
        </div>
    </button>
    
</template>

<script setup>
import HiddeIcon from '../icons/Hidde-icon.vue';




</script>

<style scoped>
.button {
    border: none;
    background: white;
    cursor: pointer;
}


</style>