<template>
    <!-- Contenedor para el input de radio y su etiqueta -->
    <div class="conted-radius">        
        <!-- Input de radio con varias propiedades vinculadas -->
        <input 
            :name="grupo"
            type="radio"
            :id="idRadius"
            :value="Valor"
            :checked="Selecionado"
            :required="requerido"
            @change="onChange"
        >
        <!-- Etiqueta asociada al input de radio -->
        <label :for="idRadius">{{ texto }}</label>
    </div>
</template>

<script setup>
// Importa defineProps y defineEmits de Vue para definir las propiedades y eventos del componente
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';

// Define las propiedades del componente
const props = defineProps({
    // Nombre del grupo de radio
    grupo: {
        type: String,
        default: "Radium"
    },
    // Valor del radio
    valor: {
        type: [String, Number],
        default: 0
    },
    // Texto de la etiqueta
    texto: {
        type: String,
        default: ''
    },
    // Valor del modelo vinculado
    modelValue: {
        default: null
    },
    // ID único para el radio
    idRadius: {
        type: String,
        default: 'Radio'
    },
    preseleccion:{
        type: [Number, String]
    },
    
    requerido: { type: Boolean, default: false }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(['update:modelValue']);

// Propiedad computada para manejar el v-model
const ModelValue = ref(props.modelValue);
const Valor = ref(props?.valor);
const Selecionado = ref(false);

// Método para manejar el cambio de valor del radio
const onChange = () => {
    // Emite el evento update:modelValue con el nuevo valor
    emit('update:modelValue', Valor.value);
    Selecionado.value = ModelValue.value == Valor.value;
};

// Observa los cambios en ModelValue y los imprime en la consola
watch(() => ModelValue.value, (newValue) => {
    console.log(newValue);
});


onMounted(() => {
    console.log()
    onChange;
})
</script>

<style scoped>
/* Estilos para el contenedor del radio */
.conted-radius {
    display: flex;
    align-self: center;
    gap: 10px; /* Espacio entre el radio y su etiqueta */
}

/* Estilos para el input de radio */
input {
    margin: 0; /* Elimina el margen predeterminado del navegador */
}

/* Estilos para la etiqueta del radio */
.conted-radius > label {
    color: #12013D; /* Color del texto de la etiqueta */
    font-size: 16px; /* Tamaño de fuente del texto */
    font-family: Poppins; /* Fuente del texto */
    font-weight: 400; /* Pesantez del texto */
    line-height: 26px; /* Altura de línea del texto */
    word-wrap: break-word; /* Permite el salto de línea de palabras largas */
}
</style>
