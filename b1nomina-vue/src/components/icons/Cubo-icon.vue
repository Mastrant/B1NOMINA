
<template>
    <div>
        <!--SVG-->
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.54312 5.945L11 10.2585L18.4569 5.945M11 18.86V10.25M18.6875 13.6667V6.83333C18.6872 6.53375 18.6081 6.23952 18.4582 5.98016C18.3083 5.72079 18.0928 5.50541 17.8333 5.35562L11.8542 1.93896C11.5945 1.78902 11.2999 1.71008 11 1.71008C10.7001 1.71008 10.4055 1.78902 10.1458 1.93896L4.16667 5.35562C3.90722 5.50541 3.69173 5.72079 3.54181 5.98016C3.39189 6.23952 3.31281 6.53375 3.3125 6.83333V13.6667C3.31281 13.9662 3.39189 14.2605 3.54181 14.5198C3.69173 14.7792 3.90722 14.9946 4.16667 15.1444L10.1458 18.561C10.4055 18.711 10.7001 18.7899 11 18.7899C11.2999 18.7899 11.5945 18.711 11.8542 18.561L17.8333 15.1444C18.0928 14.9946 18.3083 14.7792 18.4582 14.5198C18.6081 14.2605 18.6872 13.9662 18.6875 13.6667Z" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-if="text" class="tooltiptext">{{text}}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "white",
    },
    text: {
        String
    }
});
</script>

<style scoped>
div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
}
svg {
    cursor:pointer;
}

div > span {
  visibility: hidden;
  width: fit-content;
  height: 20px;
  background-color: #fffFFF;
  color: #1A245B;
  text-align: center;
  padding: 10px 12px;
  margin-top: 24px;
  border-radius: 6px;
  border: solid 2px #1A245B;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
div:hover > span {
    visibility: visible;
}
</style>