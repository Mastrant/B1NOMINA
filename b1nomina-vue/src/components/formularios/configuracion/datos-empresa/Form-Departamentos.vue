<template>
    <form class="formulario">
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ejemplo Mercadeo, Operaciones, Comercial, Administrativa, Gerencia, etc."
                Titulo="Departamento"
                name="Departamento"
                v-model="NombreDepartamento"
                @update:modelValue="NombreDepartamento = $event"
                :requerido="RequiereActualizar"
            />
            <trashIcon Stroke="#1A245B"/>
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';

import { defineProps, ref } from 'vue';

const props = defineProps({
    Datos: {
        Object,
        default: {}
    }
})

const RequiereActualizar = ref(false)
</script>


<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

div.row {
    display: flex;
    justify-content: space-between;
    gap:12px;
}

div.espacioBoto {
    width: 100%;
}

div.espacioTrash {
    width: 100%;
    display:flex;
    justify-content: end;
}

</style>