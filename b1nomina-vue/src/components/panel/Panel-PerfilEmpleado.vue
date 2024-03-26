<template>
    <div class="panel-PerfilEmpleado">
        <LayoutCabeceraEmpleado @clickEvent="() => console.log('editarfoto')">
            <template #Imagen>
                Foto                
            </template>
            <template #Rol>
                Rol                
            </template>
            <template #Nombre>
                Nombre del empleado
            </template>
            <template #Cargo>
                Cargo del empleado                
            </template>
            <template #Botones>
                <TemplateButton2 text="Ver último combrobante de pago">
                    <template #post>                                        
                        <OjitoIcon Stroke="#002E99"/>
                    </template>
                </TemplateButton2>
                <TemplateButton2 text="Liquidar">
                    <template #post>                                        
                        <DolarIcon color="#002E99" />
                    </template>
                </TemplateButton2>
                <TemplateButton2 text="Desactivar">
                    <template #post>                                        
                        <ExitColorIcon Stroke="#002E99" />
                    </template>
                </TemplateButton2>
            </template>
        </LayoutCabeceraEmpleado>

        <div class="cards">
            <boxInfo color="rgba(0, 112, 255, 0.20)">
                <template #Titulo>
                    <DolarIcon color="black" />
                    Salario mensual
                </template>
                <template #Texto>
                    $0.00
                </template>
            </boxInfo>

            <boxInfo color=" rgba(96.90, 255, 0, 0.20)">
                <template #Titulo>
                    <InfoIcon />
                    Conceptos recurrentes
                </template>
                <template #General>
                    descripcion
                </template>
            </boxInfo>

            <boxInfo color="rgba(255, 137.70, 0, 0.20)">
                <template #Titulo>
                    <SolIcon color="black" />Vacaciones acumuladas
                </template>
                <template #Texto>
                    0 días
                </template>
            </boxInfo>
        </div>
        <LayoutForm>
                <template v-slot:cabecera>
                    <NavButtonTemplate text="Datos Laborales" :seleccionado="panelShow== 1" @click="showInfo(1)" />
                    <NavButtonTemplate text="Datos Personales" :seleccionado="panelShow== 2" @click="showInfo(2)" />
                    <NavButtonTemplate text="Eventos Recurrentes" :seleccionado="panelShow== 3" @click="showInfo(3)" />
                    <NavButtonTemplate text="Solicitudes" :seleccionado="panelShow== 4" @click="showInfo(4)" />
                    
                </template>
                <template v-slot:formulario>
                    <div class="contenedorInfo" v-if="panelShow ==1">panel 1</div>
                    <div class="contenedorInfo" v-if="panelShow ==2">panel 2</div>
                    <div class="contenedorInfo" v-if="panelShow ==3">panel 3</div>
                    <div class="contenedorInfo" v-if="panelShow ==4">panel 4</div>
                </template>
            </LayoutForm>
    </div>
</template>

<script setup>
//componentes
import LayoutCabeceraEmpleado from '@/components/Layouts/LayoutCabeceraEmpleado.vue';
import LayoutForm from '@/components/Layouts/LayoutForm.vue';
import boxInfo from '@/components/elementos/Box-info.vue';
import NavButtonTemplate from '@/components/botones/Nav-button-templateForm.vue';
import TemplateButton2 from '../botones/Template-button2.vue';
//iconos
import DolarIcon from '@/components/icons/Dolar-icon-blanco.vue';
import InfoIcon from '@/components/icons/Info-icon.vue';
import SolIcon from '@/components/icons/Sol-icon.vue';
import OjitoIcon from '@/components/icons/Ojito-icon.vue';
import ExitColorIcon from '@/components/icons/Exit-color-icon.vue'

import {ref} from 'vue';

const panelShow = ref(1)
const showInfo = (id) => {
    panelShow.value = id
}
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-PerfilEmpleado {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}

div.cards {
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: space-around;
    
}
</style>