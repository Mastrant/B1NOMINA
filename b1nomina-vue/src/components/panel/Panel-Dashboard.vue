<template>
    <div class="conted">
        <span>En Desarrollo, gracias por su paciencia.</span>
        <InputBorderList
                Placeholder="Ingresar número de cuenta"
                Titulo="Cuenta bonos feriado"
                name="CuentaBonosFeriados"
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="false"
                :opciones="[{id:1, nombre:'predro'}]"
            />
    </div>
</template>

<script setup>
import InputBorderList from '@/components/inputs/Input-Border-List.vue';
import { ref, watch } from 'vue';
const variable = ref('')

watch(variable, (newv) => {
    console.log(newv)
})
</script>

<style scoped>
div.conted {
    width: 100%;
    height: 100%;
}
</style>