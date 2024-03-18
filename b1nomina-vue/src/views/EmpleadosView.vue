<template>
    <LayoutPanel>

        <template #cabecera>
            <Headervue nombrePagina="Empleados" />
        </template>
        
        <template v-slot:panel>
            <LayoutForm>
                <template v-slot:cabecera>
                    <NavButtonPanel text="Empleados" direccion="listar" :cantidad="datos.empleados" :seleccionado=" $route.name === 'listar'" />
                    <NavButtonPanel text="En Contratacion" direccion="enContratacion" :cantidad="datos.contratacion" :seleccionado="$route.name == 'enContratacion'" />
                    <NavButtonPanel text="Inactivos" direccion="inactivos" :cantidad="datos.inactivos" :seleccionado="$route.name == 'inactivos'" />
                </template>
                <template v-slot:formulario>
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
            datos: {
               

            },
            selectedButton: null,
        }
    },
    props: {
        sociedadId: {
            type: String,
            default: ''
        }
    },
    provide() {
        return {
            IDsociedad: this.sociedadId
        };
    },
    components: {
        Headervue,
        LayoutPanel,
        LayoutForm,
        NavButtonPanel,
    },
    methods: {
        async pedirDatos() {

        await axios.get(`/sociedad/${this.sociedadId}/resumen_empleados`, {"id": this.sociedadId})
        .then(
            (respuesta) => {
                //asigna los valores entregados a las variables
                this.datos = respuesta.data.data            
            }
        )
        .catch(
            error => {
               // console.log(error)
            }
        )
        }
    },
    //solicita la cantidad total de elementos para el panel
    async mounted(){
      await this.pedirDatos()
     // console.log("empleadosView " + this.sociedadId)
    }
}
</script>
