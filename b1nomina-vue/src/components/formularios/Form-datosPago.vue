<template>
    <form class="formulario" id="Form4" @submit.prevent="Enviar">
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
        <div class="row-form">
            <LayoutInputLineal textLabel="Banco">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Banco" 
                        :options="ListaBancos" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

             <!---->
            <LayoutInputLineal textLabel="Tipo de cuenta">
                <template v-slot>
                   <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta" 
                        texto="Corriente" 
                        :valor="0"
                        id-radius="CCorriente"                        
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

        <div class="row-form cut">
            <InputLinealDescripcion 
                Tipo="text"
                Titulo="N° Cuenta"
                v-model="NCuenta"
                @update:modelValue="NCuenta = $event"
                :minimo-caracteres="16"
                :maximo-caracteres="16"
            />
        </div>        
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InputRadioButton from '../botones/Input-Radio-button.vue';

import { ref, watch, reactive, defineProps, defineEmits} from 'vue';

const props = defineProps({
    EmpleadoID:{
        type: [Number, String],
    }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'closeModal'
]);


// inicializacion de variables reactivas
const ListaBancos = [
    {
        id: 1,
        nombre: "Region 1"
    },
    {
        id: 2,
        nombre: "region 2"
    }
];

const MedioPago = ref('');
const Banco = ref('');
const TCuenta = ref('');
const NCuenta = ref('');


// payload de la peticion
const payload = reactive({
    MedioPago: '',
    Banco: '',
    TipoCuenta: '',
    NumeroCuenta: '',
});

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
};

watch(Banco, (nuevoValor) => ActualizarPayload('Banco', nuevoValor));
watch(MedioPago, (nuevoValor) => ActualizarPayload('MedioPago', nuevoValor));
watch(TCuenta, (nuevoValor) => ActualizarPayload('TCuenta', nuevoValor));
watch(NCuenta, (nuevoValor) => ActualizarPayload('NCuenta', nuevoValor));

const resetForm = () => {
    const MedioPago = 0;
    const Banco = '';
    const TCuenta = null;
    const NCuenta = '';
    // Reinicia el payload
    Object.keys(payload).forEach(key => {
        payload[key] = '';
    });
};

defineExpose({
    resetForm
});

const CloseModal = () => {
    console.log("closeModal")
    emit('closeModal');
};

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {
    console.log("Datos User: " + props.EmpleadoID)
    console.log(payload)
    CloseModal()
};

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

div.row-form.cut {
    max-width: 48%;
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
    color: black;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}

/* Estilo para el texto dentro del botón de añadir una foto, 
asegurando que el texto sea legible y coherente con el diseño */
.add-photo > span {
    color: #C2C2C2;
    font-size:  18px;
    font-family: Poppins;
    font-weight:  600;
    line-height:  40px;
    word-wrap: break-word;
}
</style>
