<template>
    <div class="nav-form">
        <PositionText />
        <img src="../icons/svg/Line-icon.svg">
        <PositionText />
        <img src="../icons/svg/Line-icon.svg">
        <PositionText />
        <img src="../icons/svg/Line-icon.svg">
        <PositionText />
    </div>
</template>

<script setup>
import PositionText from '../Position-text.vue';
</script>

<style scoped>
div.nav-form {
    width: 100%;
    box-sizing: border-box;
    padding: 24px;
    gap: 12px;
}
</style>