<template>
    <form class="formulario">
        <h4>Datos básicos de tu empresa</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre"
                Titulo="Nombre de la empresa"
                name="Nombre"
                v-model="NombreEmpresa"
                @update:modelValue="NombreEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Rut"
                Titulo="Rut de la empresa"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"/>
            
            <InputBorderDescripcion
                Placeholder="Ingresar Correo Electrónico "
                Titulo="Email de contacto"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="email"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <h4>Ubicación de la empresa</h4>
        <div class="row">
            <InputBorderDescripcion 
                Placeholder="Ingresar nombre de la ciudad"
                Titulo="Ciudad"
                name="Ciudad"
                v-model="NombreEmpresa"
                @update:modelValue="NombreEmpresa = $event"
                :requerido="RequiereActualizar"
                :Deshabilitar="tipoDocumentoSelect != 2"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
            <LayoutInputBorder textLabel="Región" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Region"
                    :options="ListaRegiones"
                    :requerido="RequiereActualizar"            
                    :preseleccion="tipoDocumentoSelect"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>

              <LayoutInputBorder textLabel="Comuna" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Comuna"
                    :options="ListaComunas"
                    :requerido="RequiereActualizar"            
                    :preseleccion="tipoDocumentoSelect"  
                    optionsSelected="Seleccionar"
                  />
                </template>
              </LayoutInputBorder>
        </div>
        <div class="row">
            <InputBorderDescripcion 
                Placeholder="Ingresar dirección de la empresa"
                Titulo="Dirección de la empresa"
                name="Direccion"
                v-model="Direccion"
                @update:modelValue="Direccion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        </div>
        <div class="espacioBoto">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

div.row {
    display: flex;
    justify-content: space-between;
    gap:12px;
}

div.espacioBoto {
    width: 100%;
}

</style>