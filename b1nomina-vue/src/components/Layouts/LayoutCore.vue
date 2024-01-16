<template>
    <section class="layout-section">
        <slot name="nav">
        
        </slot>
        <div class="barraLateral">
            <slot name="body">

            </slot>

        </div>   
    </section>
</template>

<style scope>
section.layout-section {
    height: 100%;
    z-index: 3;
}

div.barraLateral {
    margin-left: 95px;
    background: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 5;
}
</style>