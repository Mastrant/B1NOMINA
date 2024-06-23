<template>
    <!--Modales-->
    <TemplateModal 
        @closeModal="showModal" 
        :FormId="IDFormModal"
        :NombreAccion="TituloModal" 
        :textSubmit="TextoButton"
        :activarModal="activarModal"
        :ModalActivo="1"        
    >
        <template #default><!--Espacio para los formularios -->
            <div v-if=" formActivo == 1"> <!--Añadir Periodo-->       
                <FormCreatePeriodo 
                    :Data="Informacion"
                    @DataNotificacion="procesarRespuesta"
                />
            </div>

            <div v-if=" formActivo == 2"> <!--Editar Periodo-->  
                {{ Informacion }}                  
                <FormEditPeriodo 
                    :Informacion="Informacion"
                    @DataNotificacion="procesarRespuesta"
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
    import { ref, onMounted, defineExpose, inject, defineEmits} from 'vue';
    import { useRoute } from 'vue-router';

    const actualizar = inject('actualizarData')
    const showNotificacion = inject('mostrarNotificacion')

    const route = useRoute();

     /////////// programacion de los modales de activacion ///////////////
    const activarModal = ref(false)
    const formActivo = ref(1)
    const TextoButton = ref('')
    const TituloModal = ref('')
    const Informacion = ref([])
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
        console.log(Solicitud)
        if (Solicitud?.valor == true){
            actualizar()
            showModal()
            showNotificacion({'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"})
        } else {
            showModal()
            showNotificacion({'Titulo': "No se puede añadir el periodo", 'Descripcion': Solicitud?.texto})
        }
    }

    //Expoe la funcion para activar el modal
    defineExpose({
        ActionButton
    })

</script>