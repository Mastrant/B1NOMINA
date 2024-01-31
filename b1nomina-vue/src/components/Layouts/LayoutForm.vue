<template>
    <div class="contenedor">
        
        <div class="cabecera">
            <slot name="cabecera">

            </slot>
        </div>
        <div class="formulario">
            <slot name="formulario">
       
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

div.cabecera {
    display: flex;
    flex-direction: row;
    gap: 12px;
}
</style>