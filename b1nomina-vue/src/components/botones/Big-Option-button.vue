<template>
    <button class="big-Options-Contend">
        <div class="big-Optios-up">
            <h3 class="big-Options-TextAction">Accion</h3>
            <span class="icon">></span>    
        </div>
        <div class="big-Optios-down">
            <p class="big-Options-Descripcion">Texto Descriptivo</p>
        </div>
    </button>
</template>

<script setup>

</script>

<style scoped>
button.big-Options-Contend {
    background-color: #F8F8F8;
    box-sizing: content-box;
    padding: 24px;
    gap: 12px;
    border: none;
    border-radius: 6px;
    height: fit-content;
}

h3.big-Options-TextAction {
    font-size: 24px; 
    font-family: Poppins; 
    font-weight: 500; 
    line-height: 34px; 
    word-wrap: break-word;
    box-sizing: border-box;
    margin: 0;
}

div.big-Optios-up{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    box-sizing: border-box;
}

div.big-Optios-down {
    display: flex;
    justify-content: start;
    align-items: center;
    align-self: center;
    box-sizing: border-box;
}

p.big-Options-Descripcion {
  width: 439px;
  font-family: "Poppins-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 26px;
  text-align: start;
  margin: 0;
}
</style>