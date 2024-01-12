<template>
    <div class="notificatioButton-contend">
        <slot name="direccion">

        </slot>
        <slot name="notification">

        </slot>
    </div>
</template>

<script>
export default {
    name: 'Notification-button'
}
</script>

<style scope>

div.notificatioButton-contend {
    display: flex;    
    align-items: center;
    padding: 14px;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 1.1rem;
    font-size: 16px;
    gap: 6px;
    justify-content: space-between;
}

.options div:hover {
    background-color: #1A2771;
    transition: all 0.3s ease-in-out;
}

</style>