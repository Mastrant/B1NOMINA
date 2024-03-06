<template>
    <form class="formulario" id="Form3" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros.tipocontrato" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato">
                <template v-slot>
                    <ListaTemplateLineal  
                         v-model="TerminoContrato"
                        :options="parametros.terminocontrato" 
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Contratacion"
                v-model="FechaContratacion"
                @update:modelValue="FechaContratacion = $event"
            />
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Finalizacion de contrato"
                v-model="FechaFinalizacionContrato"
                @update:modelValue="FechaFinalizacionContrato = $event"
                :Deshabilitar="TerminoContrato == 0"
            />
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Salario base">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="parametros.tiposalario" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion 
                Placeholder="$..." 
                Titulo="Valor del salario" 
                v-model="MontoSalario"
                @update:modelValue="MontoSalario = $event"
            />
        </div>

        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="parametros.sede" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="parametros.departamento" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Cargo">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Cargo" 
                        :options="parametros.cargos" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="parametros.grupos" 
                        optionsSelected="Sin Asignar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Modalidad">
                <template v-slot>
                    <InterruptorButton
                        v-model="Modalidad"
                        Objid="Teletrabajo"
                        Texto="Teletrabajo"
                        :Estado="(false)? true :false"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <h2 class="titulo-form">Días de descanso</h2>

        <div class="row-form">
            <InputCheckbox Objid="1" @update="DiasLibres" texto="Lunes" />
            <InputCheckbox Objid="2" @update="DiasLibres" texto="Martes" />
            <InputCheckbox Objid="3" @update="DiasLibres" texto="Miércoles" />
            <InputCheckbox Objid="4" @update="DiasLibres" texto="Jueves" />
            <InputCheckbox Objid="5" @update="DiasLibres" texto="Viernes" />
            <InputCheckbox Objid="6" @update="DiasLibres" texto="Sábado" />
            <InputCheckbox Objid="7" @update="DiasLibres" texto="Domingo" />
        </div>
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InterruptorButton from '../inputs/Interruptor-button.vue';
import InputCheckbox from '../inputs/Input-Checkbox.vue';

import { ref, watch, reactive, defineProps, defineEmits} from 'vue';

// Define las propiedades que el componente espera recibir. En este caso, se espera una propiedad llamada EmpleadoID de tipo Number.
const props = defineProps({
  EmpleadoID: {
    type: [Number, String], // Especifica que el tipo de la propiedad es Number
  },
  parametros: {
        type: Object,
        default: {}
    }
});

// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta",
]);

const TipoDeContrato = ref(props.parametros.tipocontrato);
const TerminoContrato = ref(0);
const FechaContratacion = ref('');
const FechaFinalizacionContrato = ref('');
const SalarioBase = ref('');
const MontoSalario = ref(0);
const SedeDeTrabajo = ref('');
const Departamento = ref('');
const Cargo = ref('');
const Grupo = ref('');
const Modalidad = ref('');
const ListaDiasLibres = ref([]);

/**
 * Función para manejar la interacción con una lista de empleados seleccionados.
 * Esta función agrega o remueve un valor de la lista basado en si el valor ya está presente.
 *
 * @param {Number} value - El valor a agregar o remover de la lista.
 */
const DiasLibres = (value) => {
    // Verifica si el valor no es null
    if (value !== null) {
        // Verifica si el valor ya está en la lista
        if (ListaDiasLibres.value.includes(value)) {
            // Si el valor ya está en la lista, lo remueve
            // Encuentra el índice del valor en la lista
            const index = ListaDiasLibres.value.indexOf(value);
            // Verifica si el índice es válido (mayor que -1)
            if (index > -1) {
            // Remueve el valor de la lista usando splice
            ListaDiasLibres.value.splice(index, 1);
            }
        } else {
            // Si el valor no está en la lista, lo agrega
            // Agrega el valor al final de la lista
            ListaDiasLibres.value.push(value);
        }
    }
};

// payload de las peticion
const payload = reactive({
    TipoDeContrato: '',
    TerminoContrato: '',
    FechaContratacion: '',
    FechaFinalizacionContrato: '',
    SalarioBase: '',
    MontoSalario: '',
    SedeDeTrabajo: '',
    Departamento: '',
    Cargo: '',
    Grupo: '',
    Modalidad: '',
    DiasLibres : '',
});
const payload2 = reactive({
    SedeDeTrabajo: '',
    Departamento: '',
    Cargo: '',
    Grupo: '',
    Modalidad: '',
});
const payload3 = reactive([]);

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    console.log(payload)
};
//actualizar datos del payload2
const ActualizarPayload2 = (propiedad, valor) => {
    payload2[propiedad] = valor;
    console.log(payload2)
};
//actualizar datos del payload
const ActualizarDiasLaborales = (propiedad, valor) => {
    payload3[propiedad] = valor;
    console.log(payload3)
};

// Observar cambios en la variable
watch(TipoDeContrato, (nuevoValor) => ActualizarPayload('TipoDeContrato', nuevoValor));
watch(TerminoContrato, (nuevoValor) => ActualizarPayload('TerminoContrato', nuevoValor));
watch(FechaContratacion, (nuevoValor) => ActualizarPayload('FechaContratacion', nuevoValor));
watch(FechaFinalizacionContrato, (nuevoValor) => ActualizarPayload('FechaFinalizacionContrato', nuevoValor));
watch(SalarioBase, (nuevoValor) => ActualizarPayload('SalarioBase', nuevoValor));
watch(MontoSalario, (nuevoValor) => ActualizarPayload('MontoSalario', nuevoValor));
watch(SedeDeTrabajo, (nuevoValor) => ActualizarPayload2('SedeDeTrabajo', nuevoValor));
watch(Departamento, (nuevoValor) => ActualizarPayload2('Departamento', nuevoValor));
watch(Cargo, (nuevoValor) => ActualizarPayload2('Cargo', nuevoValor));
watch(Grupo, (nuevoValor) => ActualizarPayload2('Grupo', nuevoValor));
watch(Modalidad, (nuevoValor) => ActualizarPayload2('Modalidad', nuevoValor));
watch(ListaDiasLibres.value, (nuevoValor) => ActualizarDiasLaborales(nuevoValor));

const resetForm = () => {
    TipoDeContrato.value = '';
    TerminoContrato.value = '';
    FechaContratacion.value = '';
    FechaFinalizacionContrato.value = '';
    SalarioBase.value = '';
    MontoSalario.value = null;
    SedeDeTrabajo.value = '';
    Departamento.value = '';
    Cargo.value = '';
    Grupo.value = '';
    Modalidad.value = '';
    console.log(ListaDiasLibres.value)
    // Reinicia el payload
    Object.keys(payload).forEach(key => {
        payload[key] = '';
    });
    Object.keys(payload2).forEach(key => {
        payload[key] = '';
    });
}

defineExpose({
    resetForm
})
const NextModal = () => {
    emit('nextModal');
};
const sendRespuesta = (Data) => {
  emit("respuesta", Data); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

/**
 * Funcion emitida al enviar el formulario
 * 
 * @params {payload} Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {
    console.log("modal Datos Laborales")
    console.log("Datos User: " + props.EmpleadoID)
    console.log(payload)
    console.log(payload2)
    console.log(payload3)
    sendRespuesta({texto:"prueba 2", valor:true})
    NextModal()
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
