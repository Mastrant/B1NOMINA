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
                <div v-if=" formActivo == 1"> <!--retomar contrato-->                    
                   formulario 1
                </div>
                <div v-if=" formActivo == 2"> <!--retomar contrato-->                    
                   formulario 2
                </div>
                <div v-if=" formActivo == 3"> <!--retomar contrato-->                    
                   formulario 3
                </div>
                <div v-if=" formActivo == 4"> <!--retomar contrato-->                    
                   formulario 4
                </div>
            </template>
        </TemplateModal>
</template>

<script setup>
    //componentes
    import TemplateButton from '@/components/botones/Template-button.vue';
    import TemplateButton2 from '@/components/botones/Template-button2.vue'
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    //formularios
    import FormDatosBasicos from '@/components/formularios/Form-datosBasicos.vue';
    import FormDatosPersonalesVue from '@/components/formularios/Form-datosPersonales.vue';
    import FormDatosLaborales from '@/components/formularios/Form-datosLaborales.vue';
    import FormDatosPago from '@/components/formularios/Form-datosPago.vue';
    import FormImportacionMasiva from '@/components/formularios/Form-ImportacionMasiva.vue'

    //librerias
    import { ref, onMounted, reactive, toRefs, watch, inject, defineExpose } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

   
    const DatosUsuario = reactive(inject('dataEmpleado'))

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

     /////////// programacion de los modales de activacion ///////////////
    const activarModal = ref(false)
    const formActivo = ref(1)
    const TextoButton = ref('')
    const TituloModal = ref('')
    const EmpleadoID_Selecionado = ref(null)
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
     * @param {number} IdModal - Identificador del modal a mostrar.
     * @param {number} TipoAccion - Tipo de acción a realizar:
     *                             1: Cargar CV,
     *                             2: Retomar CV,
     *                             3: Cargar Contrato,
     *                             4: Retomar Contrato.
     * @param {number} item_ID - ID del elemento seleccionado.
     * 
     * @example
     * ActionButton(1, 1, 123); // Muestra el modal para cargar CV con el ID 123.
     */
    const ActionButton = (TipoAccion = 0, item_ID = 0, IdModal = 1, ) => {
           
        switch (TipoAccion) {
            case 1:                
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarSalario';

                showModal(IdModal)
                break;
            case 2:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarContrato';

                showModal(IdModal)
            
                break;
            case 3:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarPuesto';

                showModal(IdModal)
                
                break;
            case 4:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarCentralizacion';

                showModal(IdModal)
                
                break; 
            case 5:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Personales';
                IDFormModal.value = 'ActualizarDatosPrincipales';

                showModal(IdModal)
                break;
            case 6:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Personales';
                IDFormModal.value = 'ActualizarContacto';

                showModal(IdModal)
                break;
            case 7:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Personales';
                IDFormModal.value = 'ActualizarDatosPago';

                showModal(IdModal)
                break; 
        
            default:            
        }
            
    }

    const NotificacionModal = ref({})
    /**
     * Cambia el valor de lanotificacion del modal
     * @param {Objeto} respuesta Recive el diccionario necesario para mostrar la notificacion del modal
    */
    const notificacionModal = (respuesta) => {
        NotificacionModal.value = respuesta
    };

    //Expoe la funcion para activar el modal
    defineExpose({
        ActionButton,
    })


    























    // Realiza una solicitud GET a la API para obtener parámetros
    const pedirParametros = async () => {
        axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`)
        .then(
            (respuesta) => {              
                // Verifica y procesa los parámetros recibidos para cada categoría
                // Asegúrate de que las propiedades existan dentro de 'respuesta.data.parametros'

                console.log(respuesta)
            }
        )
        .catch(
            err => {
                // Maneja errores de la solicitud
                console.log(err)
            }
        )
    }

// al montar el componente ejecuta las funciones
onMounted(async () => {
    await pedirParametros(); //solicita los parametros para crear usuarios
});
</script>

