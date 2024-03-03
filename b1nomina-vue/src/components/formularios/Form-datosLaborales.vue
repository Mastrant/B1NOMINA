<template>
    <form class="formulario" id="Form3" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="{}" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato">
                <template v-slot>
                    <ListaTemplateLineal  
                         v-model="TerminoContrato"
                        :options="{}" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Contratacion"
                v-model="FechaContratacion"
                @update:modelValue="variable = $event"
            />
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Finalizacion de contrato"
                v-model="FechaFinalizacionContrato"
                @update:modelValue="variable = $event"
                :Deshabilitar="TerminoContrato == 0"
            />
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Salario base">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="[{}]" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion 
                Placeholder="$..." 
                Titulo="Valor del salario" 
                v-model="MontoSalario"
                @update:modelValue="variable = $event"
            />
        </div>

        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="[{}]" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="{}" 
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
                        :options="{}" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="{}" 
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
            <InputCheckbox Objid="Lunes" @update="DiasLibres" texto="Lunes" />
            <InputCheckbox Objid="Martes" @update="DiasLibres" texto="Martes" />
            <InputCheckbox Objid="Miercoles" @update="DiasLibres" texto="Miércoles" />
            <InputCheckbox Objid="Jueves" @update="DiasLibres" texto="Jueves" />
            <InputCheckbox Objid="Viernes" @update="DiasLibres" texto="Viernes" />
            <InputCheckbox Objid="Sabado" @update="DiasLibres" texto="Sábado" />
            <InputCheckbox Objid="Domingo" @update="DiasLibres" texto="Domingo" />
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

const props = defineProps({
    EmpleadoID:{
        type: [Number, String],
    }
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'nextModal'
]);

//lista de nacionalidades
const variable = ref('');

const TipoDeContrato = ref(0);
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
        ListaDiasLibres.value.splice(index,   1);
        }
    } else {
        // Si el valor no está en la lista, lo agrega
        // Agrega el valor al final de la lista
        ListaDiasLibres.value.push(value);
    }
    }
};


// payload de la peticion

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

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    console.log(propiedad +" "+ valor)
    console.log(payload)
};

// Observar cambios en la variable
watch(TipoDeContrato, (nuevoValor) => ActualizarPayload('TipoDeContrato', nuevoValor));
watch(TerminoContrato, (nuevoValor) => ActualizarPayload('TerminoContrato', nuevoValor));
watch(FechaContratacion, (nuevoValor) => ActualizarPayload('FechaContratacion', nuevoValor));
watch(FechaFinalizacionContrato, (nuevoValor) => ActualizarPayload('FechaFinalizacionContrato', nuevoValor));
watch(SalarioBase, (nuevoValor) => ActualizarPayload('SalarioBase', nuevoValor));
watch(MontoSalario, (nuevoValor) => ActualizarPayload('MontoSalario', nuevoValor));
watch(SedeDeTrabajo, (nuevoValor) => ActualizarPayload('SedeDeTrabajo', nuevoValor));
watch(Departamento, (nuevoValor) => ActualizarPayload('Departamento', nuevoValor));
watch(Cargo, (nuevoValor) => ActualizarPayload('Cargo', nuevoValor));
watch(Grupo, (nuevoValor) => ActualizarPayload('Grupo', nuevoValor));
watch(Modalidad, (nuevoValor) => ActualizarPayload('Modalidad', nuevoValor));
watch(ListaDiasLibres.value, (nuevoValor) => ActualizarPayload('DiasLibres', nuevoValor));

const NextModal = () => {
    console.log("NextModal")
    emit('nextModal');
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
