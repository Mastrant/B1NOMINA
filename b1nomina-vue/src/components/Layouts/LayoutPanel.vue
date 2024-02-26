<template>
    <section class="layoutpanel">
        <slot name="cabecera">

        </slot>

        <div class="body">
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

div.body {
    padding: 24px;
}

</style>