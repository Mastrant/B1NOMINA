<template>
    <div>
        <Teleport to="#modal-target" disabled>
            <TemplateModal 
                @closeModal="showModal(false)" 
                :FormId="formID"
                :NombreAccion="TituloModal" 
                :textSubmit="TextoButton"
                :activarModal="activarModal"
                :ModalActivo="1"
                :DataNotification="InformacionNotificacionModal"
            >
                <!-- Espacio para los formularios -->
                <FormConfigGrupoCentralizacion 
                    :FormID="formID"
                    :Informacion="Informacion"
                    @DataNotificacion="ActualizarDataNotificacionModal"                
                />
            </TemplateModal>
        </Teleport>
    </div>
</template>

<script setup>
import TemplateModal from '@/components/modal/TemplateModal.vue'
import FormConfigGrupoCentralizacion from '@/components/formularios/configuracion/centralizacion/Form-Configuracion-GrupoCentralizacion.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject} from 'vue';

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
    formID: {
        type: String,
    }
});

const activarModal = ref(false)
const TextoButton = ref('');
const TituloModal = ref('');

const InformacionNotificacionModal = ref({})


/**
 * Cambia el valor de lanotificacion del modal
 * @param {Objeto} respuesta Recive el diccionario necesario para mostrar la notificacion del modal
*/
const ActualizarDataNotificacionModal = (Informacion) => {
    InformacionNotificacionModal.value = Informacion;
};

const showModal = (valor) => {
    activarModal.value = valor
};


const ActionButton = () => {
    TextoButton.value = 'Guardar Configuración';
    TituloModal.value = 'Configuracion Avanzada';    
    showModal(true)
}

defineExpose({
    ActionButton,
})

</script>