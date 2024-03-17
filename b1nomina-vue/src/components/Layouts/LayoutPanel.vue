<template>
    <section class="layoutpanel">
        <slot name="cabecera">

        </slot>

        <div class="body-panel">
            <slot name="panel">
            
            </slot>
        </div>
    </section>
</template>

<style scoped>
section.layoutpanel {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
}

div.body-panel {
    padding: 24px;
}

</style>