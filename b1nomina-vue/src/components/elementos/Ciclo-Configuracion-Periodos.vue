<template>
    <!--Modales-->
    <TemplateModal 
        @closeModal="showModal" 
        :FormId="IDFormModal"
        :NombreAccion="TituloModal" 
        :textSubmit="TextoButton"
        :activarModal="activarModal"
        :ModalActivo="1"
        :DataNotification="alertaFormulario"
    >
        <template #default><!--Espacio para los formularios -->
            <div v-if=" formActivo == 1"> <!--Añadir Periodo-->       
                <FormCreatePeriodo 
                    :Data="Informacion"
                    @DataNotificacion="procesarRespuesta"
                />
            </div>

            <div v-if=" formActivo == 2"> <!--Editar Periodo-->                  
                <FormEditPeriodo 
                    :Informacion="Informacion"
                    @DataNotificacion="procesarRespuesta"
                    @DataNotificacionModal="procesarAlerta"
                />
            </div>

        </template>
    </TemplateModal>
</template>|

<script setup>
    //componentes
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    //formularios
    import FormCreatePeriodo from '@/components/formularios/configuracion/periodos/Form-Create-Periodo.vue'
    import FormEditPeriodo from '@/components/formularios/configuracion/periodos/Form-Edit-Periodo.vue';

    //librerias
    import { ref, defineExpose, inject, defineEmits} from 'vue';

    const actualizarData = inject('actualizarData')
    const showNotificacion = inject('mostrarNotificacion')

     /////////// programacion de los modales de activacion ///////////////
    const activarModal = ref(false)
    const formActivo = ref(1)
    const TextoButton = ref('')
    const TituloModal = ref('')
    const Informacion = ref([])
    const modalActivo = ref(0)
    const IDFormModal = ref('')
    const alertaFormulario = ref({})

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
     *                             1: Crear periodo,
     *                             2: Editar periodo selecionado,
     * @param {number} item_ID - ID del elemento seleccionado.
     * 
     * @example
     * ActionButton(1, 1, 123); // Muestra el modal para cargar CV con el ID 123.
     */
    const ActionButton = (TipoAccion, Datos) => {
        switch (TipoAccion) {
            case 1:                
                formActivo.value = TipoAccion;
                Informacion.value = Datos
                TextoButton.value = 'Añadir siguiente periodo';
                TituloModal.value = 'Añadir siguiente periodo';
                IDFormModal.value = 'AddPeriodo';               
                break;
            case 2:
                formActivo.value = TipoAccion;
                Informacion.value = Datos
                TextoButton.value = 'Guardar';
                TituloModal.value = `Datos del periodo`;
                IDFormModal.value = 'EditPeriodo';
            
                break;
            /* 
            por si es necesario añadir otro tipo de accion
                     case 3:
                formActivo.value = TipoAccion;
                EmpleadoID_Selecionado.value = item_ID;
                TextoButton.value = 'Actualizar';
                TituloModal.value = 'Datos Laborales';
                IDFormModal.value = 'ActualizarPuesto';

                break;
            */
        }
        showModal(1)
    }

    const procesarRespuesta = (Solicitud) => {
        if (Solicitud?.valor == true){
            actualizarData()
            showModal()
            showNotificacion({'Titulo': Solicitud?.titulo, 'Descripcion': Solicitud?.texto})
        } else {
            showModal()
            showNotificacion({'Titulo': Solicitud?.titulo, 'Descripcion': Solicitud?.texto})
        }
    }

    const procesarAlerta = (Data) => {
        alertaFormulario.value = Data
    }

    //Expoe la funcion para activar el modal
    defineExpose({
        ActionButton
    })

</script>