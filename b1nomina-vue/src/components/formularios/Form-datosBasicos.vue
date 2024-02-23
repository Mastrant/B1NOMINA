<template>
    <form class="formulario">
        <h2 class="titulo-form">Datos básicos</h2>

        <div class="row-form">
            <ListaTemplateLineal 
                v-model="tipoDocumentoSelect" 
                :options="TiposDocumentos" 
                optionsSelected="Documento" 
                textLabel="Tipo de documento"
            />
            <InputLinealDescripcion 
                :Deshabilitar="tipoDocumentoSelect == 0 " 
                v-model="NumeroDocumento" 

                Placeholder="Ejemplo: 1234567-8" 
                Titulo="Número de documento"
            />
        </div>

        <div class="row-form">
            <InputLinealDescripcion Placeholder="Exaple: Juan" Titulo="Nombres"/>
            <InputLinealDescripcion Placeholder="Ejemplo: Peres" Titulo="Apellidos"/>
        </div>

        <div class="row-form">
            <InputLinealDescripcion Placeholder="Exaple@gmail.com" Titulo="Correo electrónico" />
            <div>
                <span>Enviar invitación a B1 Nomina por email</span> 
                <img src="" alt=" (?)">
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

import { ref, watch } from 'vue';

const TiposDocumentos = [
    {
        id: 1,
        nombre: "Pasaporte"
    },
    {
        id: 2,
        nombre: "RUT"
    }
]

//valores
    const nombres = ref('')
    const apellidos = ref('')
    const tipoDocumento = ref('')
    const numeroDocumento = ref('')
    const correo = ref('')
    const foto = ref('')
    const invitacion = ref(0)

const payload = {
    
    nombres: "Pedro",
    apellidos: '',
    tipoDocumento: "",
    numeroDocumento: "",
    correo: '',
    foto: '',
    invitacion: 0
}


</script>

<style scoped>
div.row-form {
    display: flex;
    flex-direction: row;
    gap:24px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

form.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px
}

div.multimedia {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

div.multimedia div.add-photo{
    border-radius: 6px;
    border: 0.5px #363855 dashed;
    border-width: 5px;
    box-sizing: border-box;
    padding: 12px 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;
}

h2.titulo-form {
    margin: 0px;
    color: black; 
    font-size: 22px; 
    font-family: Poppins; 
    font-weight: 500; 
    line-height: 32px; 
    word-wrap: break-word;
}

.add-photo > span {
    color: #C2C2C2;
    font-size: 18px;
    font-family: Poppins;
    font-weight: 600;
    line-height: 40px;
    word-wrap: break-word;
}
</style>