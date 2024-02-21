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

<style>
div.box-conted {
    top: 20px;
    right: auto;
    position: relative;
    height: fit-content;
    max-height: 700px;
    max-width: 535px;
    min-width: 535px;
    box-sizing: border-box;
    background: #ffffff;

    padding: 24px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 50;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    gap: 12px;
}
</style>