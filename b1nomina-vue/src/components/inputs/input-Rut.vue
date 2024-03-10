<template>
    <div class="input-line-contend">
        <input
            class="input-template" 
            :class="{ 'input-error': isError }"
            ref="rutRef" 
            id="rut" 
            type="text" 
            v-model="numeroDocumento" 
            @input="checkRutFormato"
            :disabled="Deshabilitar"
            :minlength="minimoCaracteres"
            :maxlength="maximoCaracteres"
            :required="requerido"
            :placeholder="Placeholder"
        />
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Define los eventos que el componente puede emitir
const emit = defineEmits(['update:modelValue']);

defineProps({
    //props de funcionamiento
    modelValue: {
        type: [String, Number],
        default: '',
    },
    Deshabilitar: {
        type: Boolean,
        default:false,
    },
    minimoCaracteres: {
        type: [Number, String],
        default: 3
    },
    maximoCaracteres: {
        type:[Number, String],
        default: 100
    },
    requerido: {
        type: Boolean,
        default: false
    },
    //props de formato y estilos
    Placeholder : {
        type: String,
        default: 'Datos del campo',
    },
});


const numeroDocumento = ref('');
const isError = ref(false); // Variable reactiva para controlar la clase de error

// Crear referencias para los elementos del DOM
const rutRef = ref(null);

// Función para verificar el formato del RUT
const checkRutFormato = () => {
    const rut = rutRef.value;

    // Obtener el valor del RUT y realizar las validaciones
    const valor = rut.value.replace('.', '').replace('-', '');
    const cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    rut.value = cuerpo + '-' + dv;

    // Validaciones del RUT
    if (valor.length > 9 || cuerpo.length < 7) {
        isError.value = true; // Marcar el input como error
        return;
    }

    // Cálculo del dígito verificador
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
        const index = multiplo * valor.charAt(cuerpo.length - i);
        suma += index;
        multiplo = (multiplo < 7) ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    dv = (dv === 'K') ? 10 : dv;
    dv = (dv === 0) ? 11 : dv;

    if (dvEsperado !== dv) {
        isError.value = true; // Marcar el input como error
        console.log('Emitiendo valor actualizado:', numeroDocumento.value); // Agrega esta línea
        emit('update:modelValue', numeroDocumento.value);
        return;
    }

    // Si todo está bien, no se muestra ningún mensaje de error
    isError.value = false; // Restablecer el estado de error

     // Emitir el valor actualizado al componente padre
    console.log('Emitiendo valor actualizado:', numeroDocumento.value); // Agrega esta línea
    emit('update:modelValue', numeroDocumento.value);

    return true;
};

</script>

<style scoped>
div.input-line-contend {
    border-bottom: 2.5px solid #000741 ;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    max-height: 66px;
    align-self: center;
}

input.input-template {
    margin-top: 0px;
    color: #1A245B; 
    font-size: 18px;
    border: none;
    height: 40px;
}

input.input-template:focus {
    outline: none;
}

.input-error {
    background-color:  rgba(61, 23, 23, 0.158); /* Cambiar el color del borde a rojo cuando hay un error */
}
</style>
