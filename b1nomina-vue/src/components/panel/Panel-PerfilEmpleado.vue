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
                    <div class="contenedorInfo" v-if="panelShow ==1">
                        <LayoutTablaEMpleados>
                            <template #boton>                                                                    
                                <TemplateBlanckButton text="Editar">
                                    <template #default>
                                        <EdiIcon color="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>

                            <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Salario
                            </template>                            
                            <template #st-1> <!--Cantidad-->                                                                    
                                Cantidad
                            </template>
                            <template #text-1>                                                                    
                                $450.00
                            </template>
                            <template #st-2>  <!--Salario base-->                                                                 
                                Salario base
                            </template>
                            <template #text-2>                                                                    
                                Mensual                            
                            </template>
                            
                            <!--segundo apartado-->

                            <template #titulo3>                                                                    
                                Datos de contrato
                            </template>                            
                            <template #st-9> <!--Tipo de contrato-->                                                         
                                Tipo de contrato
                            </template>
                            <template #text-9>                                                                    
                                Empleado
                            </template>
                            <template #st-10> <!--Término de contrato-->                                                                 
                                Término de contrato
                            </template>
                            <template #text-10>                                                                    
                                Indefinido
                            </template>
                            <template #st-11>  <!--Fecha de contratación-->                                                                            
                                Fecha de contratación
                            </template>
                            <template #text-11>                                                                    
                                08/11/2023
                            </template>
                            <template #st-12> <!--Fecha terminación del contrato-->                                                                     
                                Fecha terminación del contrato
                            </template>
                            <template #text-12>                                                                    
                                08/05/2024
                            </template>
                            <template #st-13> <!--Nivel de estudio-->                                                                      
                                Nivel de estudio
                            </template>
                            <template #text-13>                                                                    
                                Universitario
                            </template>
                            <template #st-14> <!--Días de descanso-->    
                                Días de descanso
                            </template>
                            <template #text-14>                                                                    
                                Sábado, Domingo
                            </template>

                             <!--segundo apartado-->

                            <template #titulo5>                                                                    
                                Datos puesto de trabajo
                            </template>                                                        
                            <template #st-17>  <!--Sede de Trabajo-->                                                                            
                                Sede de Trabajo
                            </template>
                            <template #text-17>                                                                    
                                Oficina Principal
                            </template>
                            <template #st-18> <!--Departamento-->                                                                     
                                Departamento
                            </template>
                            <template #text-18>                                                                    
                                Ventas
                            </template>
                            <template #st-19> <!--Cargo-->                                                                      
                                Cargo
                            </template>
                            <template #text-19>                                                                    
                                Supervisor (a)     
                            </template>
                            <template #st-20> <!--Modalidad-->    
                                Modalidad
                            </template>
                            <template #text-20>                                                                    
                                <InterruptorButton />
                            </template>

                            

                        </LayoutTablaEMpleados>
                    </div>
                    <div class="contenedorInfo" v-if="panelShow ==2">
                        <LayoutTablaEMpleados>
                            <template #boton>                                                                    
                                <TemplateBlanckButton text="Editar">
                                    <template #default>
                                        <EdiIcon color="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>

                        <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Datos principales
                            </template>                            
                            <template #st-1>                                                                    
                                Nombres
                            </template>
                            <template #text-1>                                                                    
                                Nombre del Empleado
                            </template>
                            <template #st-2>                                                                    
                                Apellidos
                            </template>
                            <template #text-2>                                                                    
                                Apellidos del Empleado
                            </template>
                            <template #st-3>                                                                    
                                Fecha de Nacimiento
                            </template>
                            <template #text-3>                                                                    
                                15/11/1990
                            </template>
                            <template #st-4>                                                                    
                                N° de Rut
                            </template>
                            <template #text-4>                                                                    
                                26985625-4
                            </template>
                            <template #st-5>                                                                    
                                Sexo
                            </template>
                            <template #text-5>                                                                    
                               Femenino
                            </template>
                            <template #st-6>                                                                    
                               Estado Civil
                            </template>
                            <template #text-6>                                                                    
                                Soltero
                            </template>
                            
                        <!--segundo apartado-->

                            <template #titulo3>                                                                    
                                Datos de contacto
                            </template>                            
                            <template #st-9> <!--Correo Electrónico-->                                                         
                                Correo Electrónico
                            </template>
                            <template #text-9>                                                                    
                                empleado@email.com
                            </template>
                            <template #st-10> <!--Telefono Celular-->                                                                 
                                Telefono Celular
                            </template>
                            <template #text-10>                                                                    
                                0000-000.00.00
                            </template>
                            <template #st-11>  <!--Telefono Local-->                                                                            
                                Telefono Local
                            </template>
                            <template #text-11>                                                                    
                                0000-000.00.00
                            </template>
                            <template #st-12> <!--Región-->                                                                     
                                Región
                            </template>
                            <template #text-12>                                                                    
                                Metropolitana
                            </template>
                            <template #st-13> <!--Localidad-->                                                                      
                                Localidad
                            </template>
                            <template #text-13>                                                                    
                                Santiago
                            </template>
                            <template #st-14> <!--Dirección-->    
                               Dirección
                            </template>
                            <template #text-14>                                                                    
                                Pocuro 2255
                            </template>

                        <!--segundo apartado-->

                            <template #titulo5>                                                                    
                                Datos de pago
                            </template>                                                        
                            <template #st-17>  <!--Medio de pago-->                                                                            
                                Medio de pago
                            </template>
                            <template #text-17>                                                                    
                                Transferencia Bancaria
                            </template>
                            <template #st-18> <!--Banco-->                                                                     
                                Banco
                            </template>
                            <template #text-18>                                                                    
                                Banco de Chile
                            </template>
                            <template #st-19> <!--Tipo de cuenta-->                                                                      
                                Tipo de cuenta
                            </template>
                            <template #text-19>                                                                    
                                Corriente       
                            </template>
                            <template #st-20> <!--Número de cuenta-->    
                                Número de cuenta
                            </template>
                            <template #text-20>                                                                    
                                000 000 000
                            </template>
                        </LayoutTablaEMpleados>
                    </div>
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
import LayoutTablaEMpleados from '@/components/Layouts/LayoutTabla-datosEmpleado.vue'
import boxInfo from '@/components/elementos/Box-info.vue';
import NavButtonTemplate from '@/components/botones/Nav-button-templateForm.vue';
import TemplateButton2 from '../botones/Template-button2.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
import TemplateBlanckButton from '@/components/botones/Template-blank-button.vue';
//iconos
import DolarIcon from '@/components/icons/Dolar-icon-blanco.vue';
import InfoIcon from '@/components/icons/Info-icon.vue';
import SolIcon from '@/components/icons/Sol-icon.vue';
import OjitoIcon from '@/components/icons/Ojito-icon.vue';
import ExitColorIcon from '@/components/icons/Exit-color-icon.vue'
import EdiIcon from '@/components/icons/Edit-icon.vue'

import {ref} from 'vue';

const panelShow = ref(1)
const showInfo = (id) => {
    panelShow.value = id
};
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

div.contenedorInfo {
    background: #fcfcfc;
}
</style>