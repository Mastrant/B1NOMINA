<template>
    <section class="layout-section">
        <slot name="nav">
        
        </slot>
        <div>
            <slot name="body">

            </slot>
        </div>   
    </section>
</template>

<style scope>
section.layout-section {
    height: 100%;
}
</style>