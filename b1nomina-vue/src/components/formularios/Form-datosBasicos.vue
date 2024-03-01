<template>
    <form class="formulario" id="datosBasicos" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos básicos</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de Documento">
                <template v-slot>
                    <ListaTemplateLineal 
                        required 
                        v-model="tipoDocumentoSelect" 
                        :options="ListaTiposDocumentos" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion  
                :Deshabilitar="tipoDocumentoSelect == 0"
                Placeholder="Ejemplo:  1234567-8"  
                Titulo="Número de documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
            />
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ejemplo: Juan" 
                Titulo="Nombres"
                v-model="nombres"
                @update:modelValue="nombres = $event"
            />
            <InputLinealDescripcion 
                Placeholder="Ejemplo: Peres" 
                Titulo="Apellidos"
                v-model="apellidos"
                @update:modelValue="apellidos = $event"
                
            />
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ejemplo@gmail.com" 
                Titulo="Correo electrónico" 
                v-model="correo"
                @update:modelValue="correo = $event"
                Tipo="email"
            />
            <div>
                <span>Enviar invitación a B1 Nomina por email</span> 
                <img src="" alt=" (?)">
                <div>
                    <InputRadioButton name="SendInvitacion" :value="0"/> <span> Si</span>
                    <InputRadioButton name="SendInvitacion" :value="1"/> <span> No</span>
                </div>
            </div>
        </div>

        <div class="multimedia">
            <span>Cargar foto de perfil</span>
            <div class="add-photo">
                <span>Arrastrar imagen aqui</span>
                <TemplateButton2 text="Seleccionar Archivo"/>
            </div>
        </div>
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import TemplateButton2 from '../botones/Template-button2.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InputRadioButton from '../botones/Input-Radio-button.vue';


import { ref, watch } from 'vue';
import axios from 'axios';

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

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'closeModal'
]);

const close = () => {
    console.log("cerrar modal")
    emit('closeModal');
};

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
    
  "apellidos": "",
  "correo": "",
  "documento": "",
  "nombres": ""

}

const addNombres = (value) => {
    payload.nombres = value.toLowerCase();
};
const addApellidos = (value) => {
    payload.apellidos = value.toLowerCase();
};
const addNumeroDocumento = (value) => {
    payload.documento = value;
};
const addCorreo = (value) => {
    payload.correo = value.toLowerCase();
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
    axios.post('/user/create_preuser', payload )
        .then(
            res => {
            if (res.response){
                payload = {
                    "apellidos": "",
                    "correo": "",
                    "documento": "",
                    "nombres": ""
                }
                numeroDocumento, nombres, apellidos, correo.value = '';
                
            }            
        })
        .catch(err => {
            if (err.response) { 
                console.log(err.message)
            }

        //error 522 usuario ya creado o existente
    });
    close();
};

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

div.multimedia > span {
    color: #999999;
    font-size: 13px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo{
    border-radius:  6px;
    border:  0.5px #363855 dashed;
    border-width:  2px;
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
