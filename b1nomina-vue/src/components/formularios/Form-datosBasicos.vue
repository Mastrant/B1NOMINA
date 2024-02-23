<template>
    <form class="formulario">
        <h2 class="titulo-form">Datos básicos</h2>

        <div class="row-form">
            <ListaTemplateLineal />
            <InputLinealDescripcion Placeholder="" Titulo="Número de documento"/>
        </div>

        <div class="row-form">
            <InputLinealDescripcion Placeholder="" Titulo="Nombres"/>
            <InputLinealDescripcion Placeholder="" Titulo="Apellidos"/>
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