<template>
    
    <form class="formulario" id="" @submit.prevent="">
        <h2 class="titulo-form">Datos de Pago</h2> 
        <div class="row-form">
            <LayoutInputLineal textLabel="Medio de pago">
                <template v-slot>
                    <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Transferencia" 
                        :valor="0"
                        id-radius="Transferencia"
                    />
                   <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Cheque" 
                        :valor="1"
                        id-radius="Cheque"
                    />
                    <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Al contado" 
                        :valor="2"
                        id-radius="Alcontado"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form" v-show="MedioPago == 0">
            <LayoutInputLineal textLabel="Banco" :requerido="MedioPago == 0">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Banco" 
                        :options="parametros.bancos" 
                        optionsSelected="Seleccionar"
                        :requerido="MedioPago == 0"
                    />
                </template>
            </LayoutInputLineal>

             <!---->
            <LayoutInputLineal textLabel="Tipo de cuenta" :requerido="MedioPago == 0">
                <template v-slot>
                   <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta" 
                        texto="Corriente" 
                        :valor="0"
                        id-radius="CCorriente"  
                        :requerido="MedioPago == 0"                      
                    />
                   <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta"
                        texto="Ahorro"
                        :valor="1"
                        id-radius="CAhorro"  
                    />
                </template>
            </LayoutInputLineal>            
        </div>

        <div class="row-form cut" v-show="MedioPago == 0" :requerido="MedioPago == 0">
            <InputLinealDescripcion 
                Titulo="N° Cuenta"
                v-model="NCuenta"
                @update:modelValue="NCuenta = $event"
                :minimo-caracteres="16"
                :requerido="MedioPago == 0"
            />
        </div>  

    </form>
    
</template>

<script setup>

import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InputRadioButton from '@/components/botones/Input-Radio-button.vue';

import axios from "axios";

import { ref, watch, reactive, defineProps, defineEmits, onMounted} from 'vue';

const props = defineProps({
    EmpleadoID:{
        type: [Number, String],
        default: -1
    },
    parametros: {
        type: Object,
        default: {}
    },
});

// inicializacion de variables reactivas
const MedioPago = ref(0);
const Banco = ref('');
const TCuenta = ref('');
const NCuenta = ref('');


const payload = reactive({
    "banco_id": '',
    "medio": '0',
    "tipo_cuenta": '',
    "numero_cuenta": '',
    "user_id": '',
});


//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
};

watch(Banco, (nuevoValor) => ActualizarPayload('banco_id', nuevoValor));
watch(MedioPago, (nuevoValor) => ActualizarPayload('medio', String(nuevoValor)));
watch(TCuenta, (nuevoValor) => ActualizarPayload('tipo_cuenta', Number( nuevoValor)));
watch(NCuenta, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));

const verificarMediodePago = (medio) => {
    if(medio != 0){
        payload.NumeroCuenta = '';
        payload.banco_id = 0;
        payload.tipo_cuenta = 0; 
    }
}
</script>


<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap:  16px
}

/* Contenedor para elementos multimedia, organizados 
en columnas con un espacio de  12px entre ellos */
div.multimedia {
    display: flex;
    flex-direction: column;
    gap:  12px;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo{
    border-radius:  6px;
    border:  0.5px #363855 dashed;
    border-width:  5px;
    box-sizing: border-box;
    padding:  12px  48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:  100%;
    height: fit-content;
}

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin:  0px;
    color: #1A2771;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>
