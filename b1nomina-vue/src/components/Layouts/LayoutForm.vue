<template>
    <div class="contenedor">
        
        <div>
            <slot name="cabecera">
                cabecera
            </slot>
        </div>
        <div>
            <slot name="formulario">
                tabla con empleados
       
            </slot>
        </div>
    </div>
</template>

<style scoped>
div.contenedor{
    gap: 8px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    width: 100%;

}
</style>