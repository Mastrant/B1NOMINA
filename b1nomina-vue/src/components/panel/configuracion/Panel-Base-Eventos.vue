<template>
    <div class="contend">
        <LayoutNavConfig>
            <template #default>
                <NavConfigButton :activar=false texto="AFP" />
                <NavConfigButton :activar=false texto="Previsión Salud" />
                <NavConfigButton :activar=false texto="Caja Compensación" />
                <NavConfigButton :activar=false texto="Asignación Familiar" />
                <NavConfigButton :activar=false texto="Mutual" />
                <NavConfigButton :activar=false texto="APV" />
            </template>            
        </LayoutNavConfig>
        <div class="vista-panel">
            <router-view>
                Ruta a Navegar
            </router-view>
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';
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