<template>
    
    <form class="formulario" id="" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Principales</h2>
        <div class="row-form">
            <InputLinealDescripcion
                Placeholder="Ejemplo: Juan"
                Titulo="Nombres"
                v-model="nombres"
                @update:modelValue="nombres = $event"
                :requerido="formularioRequerido"
                name="Nombres"
            />
            <InputLinealDescripcion
                Placeholder="Ejemplo: Peres"
                Titulo="Apellido Paterno"
                v-model="apellidos"
                @update:modelValue="apellidos = $event"
                :requerido="formularioRequerido"
                name="Apellidos"
            />
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de Documento" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal
                        v-model="tipoDocumentoSelect"
                        :options="ListaTiposDocumentos"
                        optionsSelected="Seleccionar"
                        :requerido="formularioRequerido"
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion
                Placeholder="Ejemplo: 1234567-8"
                Titulo="Número de documento"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="formularioRequerido"
                :Deshabilitar="tipoDocumentoSelect != 2"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        </div>

        <div class="row-form">
            

            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de nacimiento"
                v-model="fechaNacimiento"
                @update:modelValue="fechaNacimiento = $event"
                :requerido="formularioRequerido"
            />

            <LayoutInputLineal textLabel="Género" :requerido="formularioRequerido">
                <template v-slot>
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Masculino" 
                        :valor="1"
                        id-radius="Masculino"  
                    />
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Femenino" 
                        :valor="2"
                        id-radius="Femenino"  
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="nacionalidad" 
                        :options="ListaNacionalidad" 
                        :requerido="formularioRequerido"    
                        optionsSelected="Seleccionar"                    
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Estado civil" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="estadoCivil" 
                        :options="parametros?.estadocivil" 
                        optionsSelected="Seleccionar"
                        :requerido="formularioRequerido"
                    />
                </template>
            </LayoutInputLineal>
        </div>
    </form>
    
</template>

<script setup>
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InputRadioButton from '@/components/botones/Input-Radio-button.vue';

    import {reactive, ref, defineProps, watch} from 'vue'

    const props = defineProps({
        ID_Empleado: {
            type: [String, Number],
            default: 0
        },
        parametros: {
            type: Object,
            default: {}
        }
    });

    
    //lista de
    const ListaTiposDocumentos = [
    {
        id: 1,
        nombre: "Pasaporte",
    },
    {
        id: 2,
        nombre: "RUT",
    },
    ];

    //lista de nacionalidades
    const ListaNacionalidad = [
        {
            id: 1,
            nombre: "Nacional"
        },
        {
            id: 2,
            nombre: "Extrangero"
        },
    ]

    const payload = reactive({
        nacionalidad: "",
        genero: "",
        fechaNacimiento: "",
        estadoCivil: "",
        apellidos: "",
        documento: "",
        nombres: "",
    });


    const formularioRequerido = ref(false);

    const numeroDocumento = ref("");
    const nombres = ref("");
    const apellidos = ref("");
    const tipoDocumentoSelect = ref(""); //Documento selecionado
    const nacionalidad = ref('');
    const genero = ref('');
    const fechaNacimiento = ref('');
    const estadoCivil = ref(''); 


    watch(numeroDocumento, (nuevoValor) => ActualizarPayload("documento", nuevoValor));
    watch(nombres, (nuevoValor) => ActualizarPayload("nombres", nuevoValor.toUpperCase()));
    watch(apellidos, (nuevoValor) => ActualizarPayload("apellidos", nuevoValor.toUpperCase()));


    watch(nacionalidad, (nuevoValor) => ActualizarPayload('nacionalidad', nuevoValor));
    watch(genero, (nuevoValor) => ActualizarPayload('genero', nuevoValor));
    watch(fechaNacimiento, (nuevoValor) => ActualizarPayload('fechaNacimiento', nuevoValor));
    watch(estadoCivil, (nuevoValor) => ActualizarPayload('estadoCivil', nuevoValor));


    //actualizar datos del payload a enviar
    const ActualizarPayload = (propiedad, valor) => {
        payload[propiedad] = valor;
        formularioRequerido.value = Object.values(payload).some(value => value !== "")
    };

    const Enviar = () => {
        console.log(payload)
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
