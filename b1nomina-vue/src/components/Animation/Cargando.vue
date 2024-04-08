<template>
    <div class="contend">
        <div class="loader">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.contend {
    display: flex;
    width: 100px;
    height: 50px;
    position: fixed;
    z-index: 999;
    box-sizing: border-box;
}

div.loader,
div.loader::before,
div.loader::after {
    background: #1A2771;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation: animacion 1.5 infinite ease-in-out;

}

div.loader {    
    font-size: 12px;
    position: relative;
}

div.loader::before,
div.loader::after {
    content: ' ';
    position:absolute;
    top: 0;
}

div.loader::before {
    left: -3.5em;

}

div.loader::after {
    left: 3.5em;
}

@keyframes animacion{
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }

    40% {
        box-shadow: 0 2.5em 0 0;
    }

}
</style>