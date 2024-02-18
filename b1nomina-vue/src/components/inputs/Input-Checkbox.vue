<template>
  <div class="conted-Input">
    <input type="checkbox" :id="'checkbox'+Objid">    
    <label :for="'checkbox'+Objid">{{valor}}</label>
  </div>
  
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';

const props = defineProps({
    texto: {
        String,
        default: '',
    },
    Objid: {
        type: [String, Number],
        default: ''
    }
});

const valor = ref()
</script>

<style scoped> 


/* Oculta el estilo por default*/
[type="checkbox"] {
  opacity: 0;
}
/*Estilo del texto*/
[type="checkbox"] + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  display: inline-block;
  color:#12013D;
  line-height: 25px;
}
 /* Estilo del fondo por defecto*/
[type="checkbox"] + label::before {
  content: "";
  position: absolute;
  left: 0;
  top: -14px;
  width: 20px;
  height: 20px;
  outline: 1px solid #CDE0f1;

  background: #F8F8F8; 
  border-radius: 5px; 
}

[type="checkbox"]:checked + label::after {
  content: "";
  position: absolute;
  left: 3px;
  top: -10px;
  width: 14px;
  height: 12px;

  background-image:url(../icons/svg/check.svg); 
  background-size: contain;
}
</style>