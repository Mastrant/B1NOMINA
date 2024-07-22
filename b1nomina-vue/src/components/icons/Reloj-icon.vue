<template>
    <div>
        <!--SVG-->
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconos" clip-path="url(#clip0_1779_7201)">
            <path id="Vector" d="M8.50016 14.6666C12.1821 14.6666 15.1668 11.6818 15.1668 7.99992C15.1668 4.31802 12.1821 1.33325 8.50016 1.33325C4.81826 1.33325 1.8335 4.31802 1.8335 7.99992C1.8335 11.6818 4.81826 14.6666 8.50016 14.6666Z" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_2" d="M8.5 4V8L11.1667 9.33333" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_1779_7201">
               <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
            </clipPath>
        </defs>
    </svg>  
        <span v-if="text" class="tooltiptext">{{text}}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "#FAB400",
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