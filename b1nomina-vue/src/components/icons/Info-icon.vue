<template>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconos" clip-path="url(#clip0_1192_10203)">
            <path id="Vector" d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_2" d="M10 13.3333V10" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_3" d="M10 6.66675H10.0083" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_1192_10203">
                <rect width="20" height="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>       
</template>


<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    color: {
        String,
        default: "black"
    }
})
</script>