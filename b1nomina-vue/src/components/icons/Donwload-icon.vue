<template>
    <div>
        <!--SVG-->
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconos">
                <path id="Vector" d="M18 12.7545V16.0878C18 16.5299 17.8244 16.9538 17.5118 17.2664C17.1993 17.5789 16.7754 17.7545 16.3333 17.7545H4.66667C4.22464 17.7545 3.80072 17.5789 3.48816 17.2664C3.17559 16.9538 3 16.5299 3 16.0878V12.7545" stroke="#002E99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_2" d="M6.33325 8.58789L10.4999 12.7546L14.6666 8.58789" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_3" d="M10.5 12.7545V2.75452" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
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