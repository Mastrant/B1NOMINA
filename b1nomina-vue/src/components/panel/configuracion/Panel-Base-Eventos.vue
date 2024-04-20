<template>
    <div class="contend">
        <LayoutNavConfig>
            <template #default>
                <NavConfigButton 
                :activar="panelSelecionado == 1" 
                texto="AFP" 
                @click="SelecionarPanel(1)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 2" 
                texto="Previsión Salud" 
                @click="SelecionarPanel(2)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 3" 
                texto="Caja Compensación" 
                @click="SelecionarPanel(3)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 4" 
                texto="Asignación Familiar" 
                @click="SelecionarPanel(4)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 5" 
                texto="Mutual" 
                @click="SelecionarPanel(5)"
            />
                <NavConfigButton 
                :activar="panelSelecionado == 6" 
                texto="APV" 
                @click="SelecionarPanel(6)"
            />
            </template>            
        </LayoutNavConfig>
        <div class="vista-panel">
            <div v-if="panelSelecionado == 1">AFP</div>
            <div v-if="panelSelecionado == 2">Previsión Salud</div>
            <div v-if="panelSelecionado == 3">Caja Compensación</div>
            <div v-if="panelSelecionado == 4">Asignación Familiar</div>
            <div v-if="panelSelecionado == 5">Mutual</div>
            <div v-if="panelSelecionado == 6">APV</div>
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';

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
    justify-content: center;
}
</style>