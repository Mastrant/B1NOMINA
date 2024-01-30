<template>
    
    <a :href="{URL}"  class="button" type="button">
       {{text}}
    </a>
    
</template>

<script setup>
import { defineProps, toRefs,} from "vue";

const props = defineProps({
    text: String,
    URL: String
});

const {text, URL} = toRefs(props);

</script>

<style scoped>
.button {
    padding: 5px 15px;
    height: 35px;
    width: 125px;
    border-radius: 6px;
    background-color: #0d6efd;
    padding: 8px 16px;

    text-align: center;
    align-items: center;
    align-self: center;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),  0 1px 1px rgba(0,0,0, 0.075);

    color: white;

}
.button:hover {
    background-color: #0d5bd1;
}

</style>