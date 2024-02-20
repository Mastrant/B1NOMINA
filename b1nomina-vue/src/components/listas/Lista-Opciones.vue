<template>
    <div class="box-conted">
        <slot name="opcion1">

        </slot>
        <slot name="opcion2">

        </slot>
        <slot name="opcion3">

        </slot>
        <slot name="opcion4">

        </slot>
        <slot name="opcion5">

        </slot>
    </div>
</template>

<style scoped>
div.box-conted {
    width: 535px;
    width: 535px;
    box-sizing: content-box;
    background: #ffffff;
    padding: 24px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 0;
}
</style>