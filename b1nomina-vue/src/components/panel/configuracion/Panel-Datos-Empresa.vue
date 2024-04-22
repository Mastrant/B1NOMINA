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
            <ListaFormDatosbasicosEmpresa v-if="panelSelecionado == 1" />
            
            <ListaFormSedes v-if="panelSelecionado == 2" />
            <ListaDepartamentosConfiguracions v-if="panelSelecionado == 3" />
            <ListaGruposConfiguracion v-if="panelSelecionado == 4" />
            <ListaCargosConfiguracion v-if="panelSelecionado == 5" />
            <ListaCamposAdicionalesConfiguracion v-if="panelSelecionado == 6" />
        </div>
    </div>
</template>

<script setup>
import NavConfigButton from '@/components/botones/Nav-config-button.vue';
import LayoutNavConfig from '@/components/Layouts/LayoutNavConfig.vue';

import ListaFormDatosbasicosEmpresa from '@/components/listas/configuracion/datos-empresa/Lista-Form-DatosBasicos-Empresa.vue';
import ListaFormSedes from '@/components/listas/configuracion/datos-empresa/Lista-Form-Sedes.vue';
import ListaDepartamentosConfiguracions from '@/components/listas/configuracion/datos-empresa/Lista-Departamentos-Configuracion.vue';
import ListaCargosConfiguracion from '@/components/listas/configuracion/datos-empresa/Lista-Cargos-Configuracion.vue';
import ListaGruposConfiguracion from '@/components/listas/configuracion/datos-empresa/Lista-Grupos-Configuracion.vue';
import ListaCamposAdicionalesConfiguracion from '@/components/listas/configuracion/datos-empresa/Lista-CamposAdicionales-Configuracion.vue';

import { ref, inject } from 'vue';

const panelSelecionado = ref(1);

const SelecionarPanel = (num) => {
    panelSelecionado.value = num;
}

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Datos de la Empresa');

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