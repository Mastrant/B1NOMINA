<template>
    <form class="formulario">
        <div class="espacioTrash">
            <trashIcon Stroke="#1A245B"/>
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre"
                Titulo="Nombre"
                name="Nombre"
                v-model="NombreSede"
                @update:modelValue="NombreSede = $event"
                :requerido="RequiereActualizar"
            />
        
            <InputBorderDescripcion
                Placeholder="Ciudad"
                Titulo="Ciudad"
                name="Ciudad"
                v-model="CiudadSede"
                @update:modelValue="CiudadSede = $event"
                :requerido="RequiereActualizar"
            />
            
            <LayoutInputBorder textLabel="Región" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Region"
                    :options="ListaRegiones"
                    :requerido="RequiereActualizar"            
                    :preseleccion="tipoDocumentoSelect"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>

              <LayoutInputBorder textLabel="Comuna" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Comuna"
                    :options="ListaComunas"
                    :requerido="RequiereActualizar"            
                    :preseleccion="tipoDocumentoSelect"  
                    optionsSelected="Seleccionar"
                  />
                </template>
              </LayoutInputBorder>
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar la dirección"
                Titulo="Dirección de la Sede"
                name="Dirección"
                v-model="DireccionSede"
                @update:modelValue="DireccionSede = $event"
                :requerido="RequiereActualizar"
            />
        </div>

        
        <div class="espacioBoto">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';

import { defineProps } from 'vue';

const props = defineProps({
    Datos: {
        Object,
        default: {}
    }
})
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

div.espacioBoto, div.espacioTrash{
    width: 100%;
    display: flex;
}

div.espacioTrash {
    justify-content: end;
}



</style>