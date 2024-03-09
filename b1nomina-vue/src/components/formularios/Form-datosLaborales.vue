<template>
    <form class="formulario" id="Form3" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros.tipocontrato" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Nivel de Estudio" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros?.nivelestudio" 
                        :requerido="false"
                        optionsSelected="Seleccionar"  
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato">
                <template v-slot>
                    <ListaTemplateLineal  
                         v-model="TerminoContrato"
                        :options="parametros.terminocontrato" 
                        :requerido="formulario1Requerido"
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
                :requerido="formulario1Requerido"
            />
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Finalizacion de contrato"
                v-model="FechaFinalizacionContrato"
                @update:modelValue="FechaFinalizacionContrato = $event"
                :Deshabilitar="TerminoContrato == 0"
                :requerido="formulario1Requerido"
            />
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Salario base" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="parametros.tiposalario" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Unidad Sueldo Base" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="{}" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion 
                Placeholder="$..." 
                Titulo="Valor del salario" 
                v-model="MontoSalario"
                @update:modelValue="MontoSalario = $event"
                :requerido="formulario1Requerido"
            />
        </div>

        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo" :requerido="formulario2Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="parametros.sede" 
                        :requerido="formulario2Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento" :requerido="formulario2Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="parametros.departamento" 
                        :requerido="formulario2Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Cargo" :requerido="formulario2Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Cargo" 
                        :options="parametros.cargos" 
                        :requerido="formulario2Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo" :requerido="formulario2Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="parametros.grupos" 
                        :requerido="formulario2Requerido"
                        optionsSelected="Sin Asignar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Modalidad" :requerido="formulario2Requerido">
                <template v-slot>
                    <InterruptorButton
                        v-model="Modalidad"
                        Objid="Teletrabajo"
                        Texto="Teletrabajo"
                        :Estado="(false)? true :false"
                        :requerido="formulario2Requerido"
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

import axios from "axios";

import { ref, watch, reactive, defineProps, defineEmits, onMounted} from 'vue';

// Define las propiedades que el componente espera recibir. En este caso, se espera una propiedad llamada EmpleadoID de tipo Number.
const props = defineProps({
  EmpleadoID: {
    type: [Number, String], // Especifica que el tipo de la propiedad es Number
    default: -1
  },
  parametros: {
        type: Object,
        default: {}
  },
  selecionado: {
    Boolean,
    default: false,
  }
});

// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
]);

//inicialiacion de las varables
const formulario1Requerido = ref(false)
const formulario2Requerido = ref(false)

//variables del formaulario 1
const TipoDeContrato = ref('');
const TerminoContrato = ref(0);
const FechaContratacion = ref('');
const FechaFinalizacionContrato = ref('');
const SalarioBase = ref('');
const MontoSalario = ref('');
//variables del formularo 2
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

// payload de las peticiones
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

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    formulario1Requerido.value = Object.values(payload).some(value => value !== "")
};
//actualizar datos del payload2
const ActualizarPayload2 = (propiedad, valor) => {
    payload2[propiedad] = valor;
    console.log(payload2)
    formulario2Requerido.value = Object.values(payload2).some(value => value !== "")
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
    ListaDiasLibres.value = []
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
const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

const getData = async (ID_empleado) => {
    if(ID_empleado != null & ID_empleado >= 0){
      //solicita los datos personales
      axios.get(`/user/${ID_empleado}/precarga`, {'id': Number(ID_empleado)})
      .then(
        respuesta => {
          if(respuesta.data){
            console.log("Hay datos")
            return true;
          }
        }
      )
      .catch(
        error => {
          if(error.status == 422){
            console.log(error)
          } else if(error.status == 404 ){
            console.log("no hay datos")
            console.log(error)
            return false;
          }            
        }
      )
    }
}

/**
 * Funcion emitida al enviar el formulario
 * 
 * @params {payload} Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {

// si el ID es nulo crea un usuario
  if (props.EmpleadoID == null){
    console.log("enviar al formulario 1")
  }

  // si el ID no es nulo y existen datos
  if (props.EmpleadoID != null & props.EmpleadoID >= 0)  {
     let haydatosdelusuario = getData(props.EmpleadoID)

      //si existen datos del usuario
      if (haydatosdelusuario) {
         console.log("usar put")
         console.log("Datos Personales: " + props.EmpleadoID)

          let statuspay = Object.values(payload).some(value => value !== "")
          let statuspay2 = Object.values(payload2).some(value => value !== "")
          console.log(Object.values(payload).some(value => value !== ""));
          console.log(Object.values(payload2).some(value => value !== ""));
          if(statuspay){
              console.log(payload)
          }
          if(statuspay2){
              console.log(payload2)
          }

          if(statuspay2 || statuspay){
              console.log("enviar datos")
              console.log({texto:"prueba 4", valor:true})
          }
  
          NextModal(props.EmpleadoID)
      }
      if (!haydatosdelusuario){
          console.log("usar post")
          NextModal(props.EmpleadoID);
      }
  }
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
