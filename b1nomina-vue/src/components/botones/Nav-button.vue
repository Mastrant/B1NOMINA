<template>
    <div class="nav-contend">
        <slot name="direccion">

        </slot>
    </div>
</template>

<script>
export default {
    name: 'nav-button'
}
</script>

<style>
div.nav-contend {
    display: flex;    
    align-items: center;
    padding: 14px;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 1.1rem;
    font-size: 16px;
    gap: 6px;
    align-items: center;
}

div.nav-contend:hover {
    background-color: #1A2771;
    transition: all 0.3s ease-in-out;
}

/* Estilos internos del boton aplicados a lo que recibe */
div.nav-contend > a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 8px;
    margin: auto;
}

</style>