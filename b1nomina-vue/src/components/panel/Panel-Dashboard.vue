<template>
    <div class="conted">
        <span>En Desarrollo, gracias por su paciencia.</span>
        <button @click="notificacionStatus.activarNotificacion">click</button>
        <AlertShort
            ref="notificacionStatus"
            Titulo="Empleado Activado"
            Descripcion="La activación del empleado fue realizada con éxito, ahora es posible acceder a sus datos, revisar su perfil y gestionar su liquidaciones"
            :visible="activar"
        />
    </div>
</template>

<script setup>
import AlertShort from '@/components/alertas/alert-short-template.vue'
import {ref} from 'vue'

const notificacionStatus = ref(null)

</script>

<style scoped>
div.conted {
    width: 100%;
    height: 100%;
}
</style>