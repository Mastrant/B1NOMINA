<template>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconos" clip-path="url(#clip0_1192_10211)">
            <path id="Vector" d="M9.99967 14.1666C12.3009 14.1666 14.1663 12.3011 14.1663 9.99992C14.1663 7.69873 12.3009 5.83325 9.99967 5.83325C7.69849 5.83325 5.83301 7.69873 5.83301 9.99992C5.83301 12.3011 7.69849 14.1666 9.99967 14.1666Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_2" d="M10 0.833252V2.49992" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_3" d="M10 17.5V19.1667" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_4" d="M3.5166 3.5166L4.69993 4.69993" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_5" d="M15.2998 15.3L16.4831 16.4834" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_6" d="M0.833008 10H2.49967" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_7" d="M17.5 10H19.1667" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_8" d="M3.5166 16.4834L4.69993 15.3" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_9" d="M15.2998 4.69993L16.4831 3.5166" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_1192_10211">
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