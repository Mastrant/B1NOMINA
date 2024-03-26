<template>
    <!--Contenedor General-->
    <div class="switch">
        <input 
            type="checkbox" 
            :id="Objid" 
            :checked="Estado"
            :value="Estado"
            @change="modificarUsuario"
        >
        <label :for="Objid"></label>
        <span>{{ Texto }}</span>

        <div>
            <TemplateModal 
                @closeModal="showModal" 
                :FormId="FormId"
                :NombreAccion="TituloModal" 
                :textSubmit="TextoButton"
                :activarModal="activarModal"
                :ModalActivo="1"
                :DataNotification="dataNotificacion"
            >
                <template #default>
                    <div v-show="formActivo==1">
                        <FormEmpleadoActivar
                            :EmpleadoIDSelecionado="EmpleadoID_Selecionado"
                            @notificacion="sendData"
                            @activarUsuario="accionCorrecta(1)"
                        />
                    </div>
                    <div v-show="formActivo==2">
                        <FormEmpleadoDesactivar 
                            :EmpleadoIDSelecionado="EmpleadoID_Selecionado"
                            @notificacion="sendData"
                            @desactivarUsuario="accionCorrecta(2)"
                        />
                    </div>
                </template>
            </TemplateModal>
        </div>        
    </div>       
    
</template>

<script setup>
import TemplateModal from '@/components/modal/TemplateModal.vue';
import FormEmpleadoDesactivar from '@/components/formularios/Form-Empleado-Desactivar.vue';
import FormEmpleadoActivar from '@/components/formularios/Form-Empleado-Activar.vue';
import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

const props = defineProps({
    Estado: {
        type: Boolean,
        default: false,
    },
    Objid: {
        type: [String, Number] 
    },
    Texto: {
        type: String,
        default: ""
    },
});

const emit = defineEmits(
    [
        "ValorEstado",
        'actualizarListado',
    ]
);

const modificarUsuario = (evento) => {
    if (props.Estado == true) {
        showModal(1, props.Objid)
    } else {
        console.log("Activar")
        showModal(2, props.Objid)
    }
}

const accionCorrecta = (tipo) => {
    if(tipo == 1){
        showModal()
        emit('actualizarListado')
    } else if(tipo == 2){
        showModal()
        emit('actualizarListado')
    } else {
        console.log("error al activar");
    }
}

 //arreglo con la data
 const dataNotificacion = ref({})
const sendData = (DATA) => {
        dataNotificacion.value = DATA //asigna el valor
    }

const DataNotificacion = ref('')
/////////// programacion de los modales de activacion ///////////////
const activarModal = ref(false)
const formActivo = ref(null)
const TextoButton = ref('')
const TituloModal = ref('')
const EmpleadoID_Selecionado = ref(null)
const FormId = ref('')
/**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
    const showModal = (Id_modal=null, idEmpleado=null) => {
    
    if(Id_modal == null && idEmpleado == null) {
        activarModal.value = !activarModal.value;
    } else {
        EmpleadoID_Selecionado.value = idEmpleado
        if(Id_modal == 2){
            activarModal.value = !activarModal.value;
            formActivo.value = 1;
            TextoButton.value = 'Si, activar';
            TituloModal.value = '¿Estás seguro que deseas activar a este empleado?';
            FormId.value = "FormSend-A";
            
        } else if(Id_modal == 1){
            activarModal.value = !activarModal.value;
            formActivo.value = 2;
            TextoButton.value = 'Si, desactivar';
            TituloModal.value = '¿Estás seguro que deseas desactivar a este empleado?';
            FormId.value = "FormSend-D";

        } 
    }

    
};
</script>


<style scoped>
/*elimina la apariencia regular 
*/
.switch {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 12px;
}

.switch > span {
    color: #000842;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 400;
    word-wrap: break-word;
}
.switch > input {
    display: none;
}

/**Estilo fondo default */
.switch > label {
    display: block;
    position: relative;
    background: #F8F8F8;
    width: 44px;
    height: 25px;
    border-radius: 35px;
    border: 1px solid #D7CDF1;
    cursor: pointer;
}

/**Estilo interno default */
.switch > label::before{
    content: "";
    position: absolute;
    width: 23px;
    height: 22px;
    background: #D7CDF1;
    border-radius: 9999px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    top: 1px;
    left: 1px;
    transition: all 0.3s;
}

/**Estilo fondo al ser selecionado */
.switch > input:checked + label {
    background: #2F1570;
}

/**Estilo interno al ser selecionado */
.switch > input:checked + label::before {
    left: 20px;
    top: 1px;
    background: #F8F8F8;
}

</style>