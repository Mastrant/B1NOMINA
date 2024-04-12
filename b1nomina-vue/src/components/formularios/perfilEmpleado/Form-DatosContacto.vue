<template>    
    <form class="formulario" id="" @submit.prevent="">
        <h2 class="titulo-form">Datos de Contacto</h2>
        <div class="row-form">
            <InputLinealDescripcion
                Placeholder="Ejemplo@gmail.com"
                Titulo="Correo electrónico"
                v-model="correo"
                @update:modelValue="correo = $event"
                Tipo="email"
                :requerido="true"
                name="CorreoElectronico"
            />
        </div>

        <div class="row-form">

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Celular" 
                v-model="telefonoCelular"
                @update:modelValue="telefonoCelular = $event"
                :minimo-caracteres="8"
                :maximo-caracteres="12"
                :requerido="formularioRequerido"
            />

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Local" 
                v-model="telefonoLocal"
                @update:modelValue="telefonoLocal = $event"
                :requerido="formularioRequerido"
            />
        </div>

        <h4 class="titulo-form">Dirección</h4>
        <div class="row-form">
            <LayoutInputLineal textLabel="Region" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="region" 
                        :options="parametros.regiones" 
                        optionsSelected="Seleccionar"
                        :requerido="formularioRequerido"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Localidad" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="localidad" 
                        :options="ListaLocalidad" 
                        optionsSelected="Seleccionar"
                        :requerido="formularioRequerido"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingresar dirección" 
                Titulo="Direccion" 
                v-model="direccion"
                @update:modelValue="direccion = $event"
                :requerido="formularioRequerido"
            />
        </div>

        
    </form>
</template>

<script setup>
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import InputCheckbox from '@/components/inputs/Input-Checkbox.vue';

    import { ref, watch, defineEmits, defineProps, reactive, defineExpose } from "vue";
    import axios from "axios";

    const props = defineProps({
        EmpleadoID: {
        type: [Number, String], // Especifica que el tipo de la propiedad es Number
        default: null
        },
        parametros: {
            type: Object,
            default: {}
        },
    });


    const payload = reactive({
        "correo": "",
        "region": "",
        "localidad": "",
        "direccion": "",
        "telefonoCelular": "",
        "telefonoLocal": '',

    });

    const ListaLocalidad = ref(''); //Los datos se asignan segun el idRegion


    const formularioRequerido = ref(false)



    const correo = ref("");
    const region = ref('');
    const localidad = ref('');
    const direccion = ref('');
    const telefonoCelular = ref('');
    const telefonoLocal = ref('');

    watch(region, (nuevoValor) => {
            filtroRegion(nuevoValor);
            ActualizarPayload1('region', nuevoValor);
        }
    );
    watch(localidad, (nuevoValor) => ActualizarPayload('localidad', nuevoValor));
    watch(direccion, (nuevoValor) => ActualizarPayload('direccion', nuevoValor));
    watch(telefonoCelular, (nuevoValor) => ActualizarPayload('telefonoCelular', nuevoValor));
    watch(telefonoLocal, (nuevoValor) => ActualizarPayload('telefonoLocal', nuevoValor));

    watch(correo, (nuevoValor) => ActualizarPayload("correo", nuevoValor?.toLowerCase()));

    //actualizar datos del payload a enviar
    const ActualizarPayload = (propiedad, valor) => {
        payload[propiedad] = valor;
        formularioRequerido.value = Object.values(payload).some(value => value !== "")
    };

    //filtra la lista de regiones segun el id
    const filtroRegion = (id) => {
        ListaLocalidad.value = props.parametros.localidad.filter(item => item.idregion == id)
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

h4.titulo-form {
    margin:  0px;
    color: #1A2771;  
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    word-wrap: break-word
}


</style>
