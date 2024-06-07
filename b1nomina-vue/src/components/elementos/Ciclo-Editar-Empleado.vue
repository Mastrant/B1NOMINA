<template>
    <!--Modales-->
    <TemplateModal 
        @closeModal="showModal" 
        :FormId="IDFormModal"
        :NombreAccion="TituloModal" 
        :textSubmit="TextoButton"
        :activarModal="activarModal"
        :ModalActivo="1"
        :DataNotification="NotificacionModal"
        
    >
        <template #default><!--Espacio para los formularios -->
            <div v-if=" formActivo == 1"> <!--retomar Salario-->                    
                <FormSalario 
                   @respuestaServidor="notificacionModal"
                />
            </div>

            <div v-if=" formActivo == 2"> <!--retomar contrato-->                    
                <FormDatosContrato 
                    @respuestaServidor="notificacionModal"
                />
            </div>

            <div v-if=" formActivo == 3"> <!--retomar Puesto-->                    
                <FormPuesto 
                    @respuestaServidor="notificacionModal"
                />
            </div>
            
            <div v-if=" formActivo == 4"> <!--retomar Centralizacion y adicionales-->                    
                <FormCentralizacionDatosAdicionales 
                    @respuestaServidor="notificacionModal"
                />
            </div>

            <div v-if=" formActivo == 5"> <!--retomar Datos Principales-->     
                <FormDatosPrincipales 
                    @respuestaServidor="notificacionModal"
                />                         
            </div>

            <div v-if=" formActivo == 6"> <!--retomar contacto-->                    
                <FormDatosContacto 
                    @respuestaServidor="notificacionModal"
                />
            </div>

            <div v-if=" formActivo == 7"> <!--retomar Pago-->                    
                <FormDatosPago 
                    @respuestaServidor="notificacionModal"
                />
            </div>

            <div v-if=" formActivo == 8"> <!--retomar contrato-->                    
                
            </div>
            <div v-if=" formActivo == 9"> <!--retomar contrato-->                    
                
            </div>

            <div v-if=" formActivo == 10"> <!--retomar contrato-->                    
                
            </div>

            <div v-if=" formActivo == 11"> <!--retomar contrato-->                    
                <FormDatospAdicionales
                    @respuestaServidor="notificacionModal"
                />
            </div>
        </template>
    </TemplateModal>
</template>|

<script setup>
    //componentes
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    //formularios
    import FormSalario from '@/components/formularios/perfilEmpleado/Form-Salario.vue';
    import FormDatosContrato from '@/components/formularios/perfilEmpleado/Form-DatosContrato.vue';
    import FormPuesto from '@/components/formularios/perfilEmpleado/Form-Puesto.vue';
    import FormDatosPrincipales from '@/components/formularios/perfilEmpleado/Form-DatosPrincipales.vue';
    import FormDatosContacto from '@/components/formularios/perfilEmpleado/Form-DatosContacto.vue';
    import FormDatosPago from '@/components/formularios/perfilEmpleado/Form-DatosPago.vue';
    import FormCentralizacionDatosAdicionales from '@/components/formularios/perfilEmpleado/Form-Centralizacion-DatosAdicionales.vue';

    import FormDatospAdicionales from '@/components/formularios/perfilEmpleado/Form-DatosP-Adicionales.vue';
    
    //librerias
    import { ref, onMounted, defineExpose, inject } from 'vue';
    import { useRoute } from 'vue-router';

    const actualizar = inject('actualizarData')

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

     /////////// programacion de los modales de activacion ///////////////
    const activarModal = ref(false)
    const formActivo = ref(1)
    const TextoButton = ref('')
    const TituloModal = ref('')
    const EmpleadoID_Selecionado = ref(0)
    const modalActivo = ref(0)
    const IDFormModal = ref('')

    //acciona la vista del modal
    const showModal = (Id_modal = 0) => {
        if(Id_modal == 1){
            activarModal.value = !activarModal.value;
            modalActivo.value = Id_modal;
        } else {
            activarModal.value = false;
        }
    };

    /**
     * Ejecuta acciones específicas basadas en los botones de la tabla de Encontratación.
     * Controla la visualización de modales y la activación de formularios.
     * 
     * @param {number} TipoAccion - Tipo de acción a realizar:
     *                             1: Salario,
     *                             2: Datos de contrato,
     *                             3: Datos puesto de trabajo,
     *                             4: Centralizacion.
     *                             4: Retomar Contrato.
     *                             4: Retomar Contrato.
     *                             4: Retomar Contrato.
     * @param {number} item_ID - ID del elemento seleccionado.
     * 
     * @example
     * ActionButton(1, 1, 123); // Muestra el modal para cargar CV con el ID 123.
     */
    const ActionButton = (TipoAccion, item_ID) => {
        switch (TipoAccion) {
            case 1:                
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarSalario';               
                break;
            case 2:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarContrato';
            
                break;
            case 3:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarPuesto';

                break;
            case 4:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'Actualizar-CentralizacionCamposAdicionales';

                break; 
            case 5:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Personales';
                IDFormModal.value = 'ActualizarDatosPrincipales';

                break;
            case 6:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Personales';
                IDFormModal.value = 'ActualizarContacto';

                break;
            case 7:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Personales';
                IDFormModal.value = 'ActualizarDatosPago';

                break; 
            case 8:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Previcionales';
                IDFormModal.value = 'ActualizarAFP';

                break; 
            case 9:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Previcionales';
                IDFormModal.value = 'ActualizarAPV';

                break; 
            case 10:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Previcionales';
                IDFormModal.value = 'ActualizarPrevisionSalud';

                break; 
            case 11:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Adicionales';
                IDFormModal.value = 'ActualizarDatosAdicionales';

                break; 
                
        }
        showModal(1)
    }

    const NotificacionModal = ref({})
    /**
     * Cambia el valor de lanotificacion del modal
     * @param {Objeto} respuesta Recive el diccionario necesario para mostrar la notificacion del modal
    */
    const notificacionModal = (respuesta) => {
        if (respuesta?.valor == true){
            actualizar();
            NotificacionModal.value = respuesta
        } else {
            NotificacionModal.value = respuesta.error
        }
        
       
    };

    //Expoe la funcion para activar el modal
    defineExpose({
        ActionButton,
    })


// al montar el componente ejecuta las funciones
onMounted(async () => {

});
</script>

