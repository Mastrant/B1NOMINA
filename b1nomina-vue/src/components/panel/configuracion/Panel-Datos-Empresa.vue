<template>
    <div class="contend">
        <LayoutNavConfig>
            <template #default>
                <NavConfigButton :activar="panelSelecionado == 1" texto="Datos Básicos" @click="SelecionarPanel(1)"/>
                <NavConfigButton :activar="panelSelecionado == 2" texto="Sedes" @click="SelecionarPanel(2)"/>
                <NavConfigButton :activar="panelSelecionado == 3" texto="Departamentos" @click="SelecionarPanel(3)"/>
                <NavConfigButton :activar="panelSelecionado == 4" texto="Grupos" @click="SelecionarPanel(4)"/>
                <NavConfigButton :activar="panelSelecionado == 5" texto="Cargos" @click="SelecionarPanel(5)"/>
                <NavConfigButton :activar="panelSelecionado == 6" texto="Campos Adicionales" @click="SelecionarPanel(6)"/>
            </template>            
        </LayoutNavConfig>
        <div class="vista-panel">
            <LayoutFondoBorder v-if="panelSelecionado == 1">
                <template #default>
                    
                    Datos Básicos
                    
                </template>
            </LayoutFondoBorder>
            <LayoutFondoBorder v-if="panelSelecionado == 1">
                <template #default>
                    
                    Datos Básicos
                    
                </template>
            </LayoutFondoBorder>
            <div v-if="panelSelecionado == 2">Sedes</div>
            <div v-if="panelSelecionado == 3">Departamentos</div>
            <div v-if="panelSelecionado == 4">Grupos</div>
            <div v-if="panelSelecionado == 5">Cargos</div>
            <div v-if="panelSelecionado == 6">Campos Adicionales</div>
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';
import {ref} from 'vue';

const panelSelecionado = ref(1);

const SelecionarPanel = (num) => {
    panelSelecionado.value = num;
}
</script>

<style scoped>
.contend {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 12px;

}
.vista-panel {
    display: flex;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    justify-content: start;
    flex-direction: column;
    gap: 48px;
    padding: 24px 0px;
    box-sizing: border-box;
}
</style>