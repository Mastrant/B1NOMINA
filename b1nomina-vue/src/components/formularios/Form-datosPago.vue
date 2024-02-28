<template>
    <form class="formulario" id="datosPago" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos de Pago</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad">
                <template v-slot>
                    <ListaTemplateLineal 
                        required 
                        v-model="tipoDocumentoSelect" 
                        :options="ListaTiposDocumentos" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <div>
                <InputRadioButton name="SendInvitacion" :value="0"/> <span> Si</span>
                <InputRadioButton name="SendInvitacion" :value="1"/> <span> No</span>
            </div>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de nacimiento"
                v-model="nombres"
                @update:modelValue="nombres = $event"
            />
            <LayoutInputLineal textLabel="Estado civil">
                <template v-slot>
                    <ListaTemplateLineal 
                        required 
                        v-model="tipoDocumentoSelect" 
                        :options="ListaTiposDocumentos" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        
        
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InputRadioButton from '../botones/Input-Radio-button.vue';

import { ref, watch } from 'vue';

//lista de 
const ListaTiposDocumentos = [
    {
        id: 1,
        nombre: "Pasaporte"
    },
    {
        id: 2,
        nombre: "RUT"
    },

];

// inicializacion de variables reactivas
const numeroDocumento = ref('');
const nombres = ref('');
const apellidos = ref('');
const tipoDocumentoSelect = ref(0); //Documento selecionado
const correo = ref('');
const foto = ref('');
const invitacion = ref(0);

// payload de la peticion
const payload = {
    nombres: "",
    apellidos: '',
    tipoDocumento: "",
    numeroDocumento: "",
    correo: '',
    foto: '',
    invitacion: 0
}

const addNombres = (value) => {
    payload.nombres = value;
};
const addApellidos = (value) => {
    payload.apellidos = value;
};
const addTipodocumento = (value) => {
    payload.tipoDocumento = value;
};
const addNumeroDocumento = (value) => {
    payload.numeroDocumento = value;
};
const addCorreo = (value) => {
    payload.correo = value;
};
const addFoto = (value) => {
    console.log(value);
};
/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = () => {
    (tipoDocumentoSelect.value == 0 | tipoDocumentoSelect.value == '')
    ? console.log("falta seleccionar un tipo de documento")
    : console.log(payload)
};


watch(tipoDocumentoSelect, addTipodocumento);
watch(numeroDocumento, addNumeroDocumento);
watch(nombres, addNombres);
watch(apellidos,addApellidos);
watch(correo, addCorreo);


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
