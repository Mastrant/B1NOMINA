<template>
    <form class="formulario">
        <div class="row">
            
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del campo"
                Titulo="Campo #1"
                name="CampoAdicional"
                v-model="NombreCampo"
                @update:modelValue="NombreCampo = $event"
                :requerido="RequiereActualizar"
            />
            <div class="espacioTrash">
                
                <InterruptorButton Texto="Activo"/>
                <trashIcon Stroke="#1A245B" text="Eliminar"/>
            </div>
            
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
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
    position:relative;
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
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: start;
    align-self: flex-start;
    position: absolute;
    gap:12px;
    top: -0.6rem; 
    right: 0;
}

</style>