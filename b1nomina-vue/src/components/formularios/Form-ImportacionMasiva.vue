<template>
    <form class="formulario" ref="FormImport" id="FormImport" @submit.prevent="Enviar">
        <p>
            Descarga el formato de Excel que te ayudará a ingresar la información de tus empleados y luego cargarlo en nuestro sistema.
        </p>
        <div class="row-form">
            <TemplateButton2 
                text="Descargar formato Excel" 
                @click="()=> console.log('descargar documento')" 
            />  

        </div>

        <h2 class="titulo-form">
            Cargar Archivo
        </h2>
        <p>
            Luego de haber terminado de llenar el archivo con toda la información de los nuevos empleados, puedes cargarlo aquí:
        </p>
        <div class="row-form">
            <InputDocsForm
                @respuesta="checkFile"
                @actualizarDocumento="tomarData"
            />
        </div>
    </form>
</template>

<script setup>
import TemplateButton2 from '@/components/botones/Template-button2.vue'
import InputDocsForm from '@/components/inputs/Input-Docs-form.vue';
import { defineEmits, ref} from 'vue';
import axios from 'axios'

const DataDocumento = ref('')

const emit = defineEmits([
    'actualizarDocumento',
    'respuesta'
]);

const checkFile = (respuesta) => emit("respuesta", respuesta);

const tomarData = (datosDelDocumento) => DataDocumento.value = datosDelDocumento.value;

const cargarDocumentoDAtaMasiva = async (idCreator, Datos, ID_EMpleado) => {
    const formData = new FormData();
  formData.append('File', Datos); // Asume que 'Datos' es un objeto File
    axios.post(`/user/${ID_EMpleado}/upload_file_users?creatorUserId=${idCreator}`, formData, {
  headers: {
      'Content-Type': 'multipart/form-data',
  },
  })
  .then(
    // Maneja la respuesta exitosa.
    res => {
      // Verifica si la respuesta tiene un estado HTTP 200 (OK).
      if (res.status == 200 || res.status == 201 ){
        // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
        emit("respuesta", {'texto':res.data?.message, 'valor':true})        
        
      }
    }
  )
  .catch(
    // Maneja los errores de la solicitud.
    err => {
      // Verifica si la respuesta del error contiene un objeto de respuesta.
      if (err.response) { 
        // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
        emit("respuesta", {'texto':err.response.data?.message, 'valor':false})            
      }
    }
  );
}
const Enviar = () => {
    console.log(DataDocumento.value)
    cargarDocumentoDAtaMasiva(ID_USERMASTER, dataImagen)
    
};

</script>

<style scoped>
/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

div.row-form {
    display: flex;
    flex-direction: row;
    gap: 24px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin: 0px;
    color: black;
    font-size: 22px;
    font-family: Poppins;
    font-weight: 500;
    line-height: 32px;
    word-wrap: break-word;
} 

form > p {
font-family: Poppins;
font-size: 16px;
font-weight: 400;
line-height: 26px;
letter-spacing: 0em;
text-align: left;
margin: 0;

}
</style>