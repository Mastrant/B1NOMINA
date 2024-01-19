<template>
  <input type="checkbox" v-model="value">    
</template>

<script>
export default {
    name: 'Input-checkBox',
    props: {
        userId: String,
    },
    data() {
        return {
            value: false,
        }
    },
}
</script>

<style scoped>
  
  /* Esconder configuracion por default*/
 input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Configuracion general del input*/
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #eee;
    border-radius: 4px;
    border: 1px solid #0D6EFD;;
  }
  
  /* Estilo al posicionar el boton encima */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  /* Estilo al marcar el input */
  .container input:checked ~ .checkmark {
    background-color:#0D6EFD;
    transition: background-color 0.2s ease-in-out;
  }
  
  /* Crea el indicador (Oculto cuando no está marcado) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Muestra la figura de marcado cuando esta checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Estilo de la marca*/
  .container .checkmark:after {
    left: 5px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid white;
    border-width: 0 2px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

</style>