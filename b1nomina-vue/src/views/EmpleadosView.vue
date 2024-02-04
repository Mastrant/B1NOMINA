<template>
    <LayoutPanel>

        <template #cabecera>
            <Headervue nombrePagina="Empleados" />
        </template>
        
        <template #panel>
            <LayoutForm>
                <template #cabecera>
                    <NavButtonPanel text="Empleados" direccion="listar" :cantidad="nEmpleados" :seleccionado="($route.name === 'listar')?true: false" />
                    <NavButtonPanel text="En Contratacion" direccion="enContratacion" :cantidad="nContratacion" :seleccionado="($route.name == 'enContratacion')?true: false" />
                    <NavButtonPanel text="Inactivos" direccion="listar" :cantidad="nInactivos" :eleccionado="($route.name == 'inactivos')?true: false" />
                </template>
                <template #formulario>
                    <router-view />
                </template>
            </LayoutForm>
        </template>
    </LayoutPanel>
</template>

<script>
//componentes
import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
import LayoutForm from '@/components/Layouts/LayoutForm.vue'
import NavButtonPanel from '@/components/botones/Nav-button-panel.vue';
import axios from 'axios';

export default {
    name: 'empleados',
    data() {
        return {
            nEmpleados : 0,
            nContratacion: 0,
            nInactivos: 0,
            selectedButton: null,
        }
    },
    props: {
        sociedadId: {
            type: String,
            default: ''
        }
    },
    components: {
        Headervue,
        LayoutPanel,
        LayoutForm,
        NavButtonPanel,
    },
    methods: {
        async pedirDatos() {
            await axios.get(`${this.sociedadId}/datos`)
        .then(
            (respuesta)=>{
                console.log(respuesta)
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
        }
    },
    //solicita la cantidad total de elementos para el panel
    async mounted(){
      //  await pedirDatos()
    }
}
</script>
