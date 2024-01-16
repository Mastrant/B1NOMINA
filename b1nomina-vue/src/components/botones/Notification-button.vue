<template>
    <div class="notificatioButton-contend">
        <slot name="direccion">

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

.notificatioButton-contend > a {
    width: 100%;
    display: flex;
    gap: 8px;

    display: flex;
    align-items: center;
    height: 100%;
}

.notificatioButton-contend > a > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

</style>