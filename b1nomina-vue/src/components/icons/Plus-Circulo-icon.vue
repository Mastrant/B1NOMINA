

<template>
    <div>
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconos" clip-path="url(#clip0_1253_9102)">
            <path id="Vector" d="M10.2476 18.6651C14.85 18.6651 18.581 14.9342 18.581 10.3318C18.581 5.72941 14.85 1.99845 10.2476 1.99845C5.64527 1.99845 1.91431 5.72941 1.91431 10.3318C1.91431 14.9342 5.64527 18.6651 10.2476 18.6651Z" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_2" d="M10.2476 6.99845V13.6651" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_3" d="M6.91431 10.3318H13.581" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1253_9102">
            <rect width="20" height="20" fill="white" transform="translate(0.247559 0.331787)"/>
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
        default: "#1A245B",
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