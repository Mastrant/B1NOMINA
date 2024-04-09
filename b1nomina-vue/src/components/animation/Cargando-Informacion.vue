<template>
    <div class="contend">
        <div class="card">
            <div class="loader">
            </div>
            <span>Cargando Información...</span>
        </div>
    </div>
</template>


<style scoped>
.contend {
    background: #00000060;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-self: center;
    align-items: center;
    transition: all 1.5s;
    display: flex;
    z-index: 999;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px 0px #00000040;
}

.card {
    display: flex;
    gap:16px;
    flex-direction: column;
    width: fit-content;
    height: 130px;
    background: white;
    border:#1A2771 2px solid;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 6px;
    padding: 24px;
    
}

span {
color:#1A2771;
font-size: 18px;
font-weight: 500;
line-height: 40px;
text-align: left;

}

div.loader,
div.loader::before,
div.loader::after {
color:  #bec3e1;
border-radius: 50%;
width: 2.5em;
height: 2.5em;
animation: animacion 1.5s infinite ease-in-out;
position: absolute;


}

div.loader {    
font-size: 6px;
position: relative;
animation-delay: -0.16s;
bottom: 2em;
}

div.loader::before,
div.loader::after {
  content: '';
  position:absolute;
}

div.loader::before {
   left: -5em;
   animation-delay: -0.32s;
}
div.loader::after {
   left: 5em;
}

@keyframes animacion {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }

    35% {
        box-shadow: 0 2.5em 0 0;
        color: #1A2771;
    }
}
</style>
