<template>
    <section class="layout-section">
        <slot name="nav">
        
        </slot>
        <div class="Contenedor-body">
            <slot name="body">

            </slot>

        </div>   
    </section>
</template>

<style scope>
section.layout-section {
    height: 100%;
    display: flex;
    flex-direction: row;
}

div.Contenedor-body {
    margin-left: 95px;
    background: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>