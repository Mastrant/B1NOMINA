<template>
  <form class="formulario" ref="Form1" id="Form1" @submit.prevent="Enviar">
    <h2 class="titulo-form">Datos básicos</h2>
    <!---->
    <div class="row-form">
      <LayoutInputLineal textLabel="Tipo de Documento" :requerido="true">
        <template v-slot>
          <ListaTemplateLineal
            requirido="true"
            v-model="tipoDocumentoSelect"
            :options="ListaTiposDocumentos"
            optionsSelected="Seleccionar"
            :requerido="true"
          />
        </template>
      </LayoutInputLineal>

      <InputLinealDescripcion
        :Deshabilitar="tipoDocumentoSelect == 0"
        Placeholder="Ejemplo:  1234567-8"
        Titulo="Número de documento"
        v-model="numeroDocumento"
        @update:modelValue="numeroDocumento = $event"
        :requerido="true"
        name="numeroDocumento"
        :minimo-caracteres="8"
      />
    </div>

    <div class="row-form">
      <InputLinealDescripcion
        Placeholder="Ejemplo: Juan"
        Titulo="Nombres"
        v-model="nombres"
        @update:modelValue="nombres = $event"
        :requerido="true"
        name="Nombres"
      />
      <InputLinealDescripcion
        Placeholder="Ejemplo: Peres"
        Titulo="Apellido Paterno"
        v-model="apellidos"
        @update:modelValue="apellidos = $event"
        :requerido="true"
        name="Apellidos"
      />
    </div>

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

      <LayoutInputLineal textLabel="Enviar invitación a B1 Nomina por Email">
        <template v-slot>
          <InputRadioButton
            v-model="invitacion"
            grupo="EnviarInvitacion"
            texto="No"
            :valor="0"
          />
          <InputRadioButton
            v-model="invitacion"
            grupo="EnviarInvitacion"
            texto="Si"
            :valor="1"
          />
        </template>
      </LayoutInputLineal>
    </div>

    <div class="multimedia">
      <span>Cargar foto de perfil</span>
      <div class="add-photo">
        <span>Arrastrar imagen aqui</span>
        <TemplateButton2 text="Seleccionar Archivo" />
      </div>
    </div>
  </form>
</template>

<script setup>
import InputLinealDescripcion from "../inputs/Input-Lineal-descripcion.vue";
import ListaTemplateLineal from "../listas/Lista-template-lineal.vue";
import TemplateButton2 from "../botones/Template-button2.vue";
import LayoutInputLineal from "../Layouts/LayoutInputLineal.vue";
import InputRadioButton from "../botones/Input-Radio-button.vue";

import { ref, watch, defineEmits, defineProps, reactive, defineExpose, onMounted } from "vue";
import axios from "axios";

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

// Define las propiedades que el componente espera recibir. En este caso, se espera una propiedad llamada EmpleadoID de tipo Number.
const props = defineProps({
  EmpleadoID: {
    type: [Number, String], // Especifica que el tipo de la propiedad es Number
  },
  parametros: {
    type: Object,
    default: {}
  },
});

// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta"
]);

// Método para reiniciar el formulario
const resetForm = () => {
  // Reinicia los campos a sus valores iniciales
  numeroDocumento.value = "";
  nombres.value = "";
  apellidos.value = "";
  tipoDocumentoSelect.value = 0;
  correo.value = "";
  foto.value = "";
  invitacion.value = 0;
  // Reinicia el payload
  Object.keys(payload).forEach((key) => {
    payload[key] = "";
  });
};

// Exponer la función de limpieza para que sea accesible desde el componente padre
defineExpose({
  resetForm,
});

// Función para manejar el cambio de modal. Recibe un idEpleadoCreado como parámetro y emite el evento 'nextModal' con este id.
const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};


// inicializacion de variables reactivas
const numeroDocumento = ref("");
const nombres = ref("");
const apellidos = ref("");
const tipoDocumentoSelect = ref(0); //Documento selecionado
const correo = ref("");
const foto = ref("");
const invitacion = ref(0);

// payload de la peticion
const payload = reactive({
  apellidos: "",
  correo: "",
  documento: "",
  nombres: "",
});

/**
 * Actualiza el valor de una propiedad específica dentro del objeto 'payload'.
 *
 * @param {string} propiedad - El nombre de la propiedad a actualizar en el objeto 'payload'.
 * @param {any} valor - El nuevo valor que se asignará a la propiedad especificada.
 *
 * @example
 * // 'payload' es un objeto con una estructura predefinida.
 * const payload = {
 *   nombre: '',
 *   edad: 0
 * };
 *
 * // Llamando a ActualizarPayload para cambiar el nombre.
 * ActualizarPayload('nombre', variable);
 *
 * // Ahora, 'payload' se verá así:
 * // {
 * //   nombre: 'Pedro',
 * //   edad: 30
 * // }
 */
const ActualizarPayload = (propiedad, valor) => {
  // Asigna el nuevo valor a la propiedad especificada dentro del objeto 'payload'.
  payload[propiedad] = valor;
};

watch(numeroDocumento, (nuevoValor) => ActualizarPayload("documento", nuevoValor));
watch(nombres, (nuevoValor) => ActualizarPayload("nombres", nuevoValor));
watch(apellidos, (nuevoValor) => ActualizarPayload("apellidos", nuevoValor));
watch(correo, (nuevoValor) => ActualizarPayload("correo", nuevoValor));
/**
 * Valores en desarrollo
 * watch(invitacion, (nuevoValor) => ActualizarPayload('invitacion', nuevoValor));
 * watch(foto, (nuevoValor) => ActualizarPayload('foto', nuevoValor));
 */

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
            return null;
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
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = async () => {
  //si ID es nulo crea un usuario
  if (props.EmpleadoID == null){
      await axios.post('/user/create_preuser', payload )
        .then(
          res => {
            console.log(res)
            if (res.status == 201){
              console.log({'texto': res.data.message, 'valor':true});
              NextModal(res.data.newUserId);
            }            
          }
        )
        .catch(
          err => {
            if (err.response) { 
              if (err.response.status == 422){
                console.log({'texto': "no se puede procesar la solcitud", 'valor':false});
              } else {
                console.log(err);
              }
            }
          }
        );
  }

  // si el ID no es nulo y mayor o igual a 0
  if (props.EmpleadoID != null & props.EmpleadoID >= 0)  {
    console.log("actualizar datos del usuario")
    //verifica si hay datos
    let haydatosdelusuario = getData(props.EmpleadoID)
    console.log(haydatosdelusuario.value);
    //si existen datos usa el metodo para actualizar
    if (haydatosdelusuario) {
      console.log("usar put y actualizar datos")
      NextModal(props.EmpleadoID);
    }
    //si no existen datos del id ingresado crea un nuevo usuario con el id
    if (!haydatosdelusuario){
      await axios.post('/user/create_preuser', payload )
        .then(
          res => {
            console.log(res)
            if (res.status == 201){
              console.log({'texto': res.data.message, 'valor':true});
              NextModal(res.data.newUserId);
            }            
          }
        )
        .catch(
          err => {
            if (err.response) { 
              if (err.response.status == 422){
                console.log({'texto': "no se puede procesar la solcitud", 'valor':false});
              } else {
                console.log(err);
              }
            }
          }
        );
    }
    
  }
};




</script>

<style scoped>
  /* Establece el diseño de la fila del formulario, 
    usando flexbox para alinear elementos en filas y 
    espaciarlos uniformemente 
  */

div.row-form {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Contenedor para elementos multimedia, organizados 
en columnas con un espacio de  12px entre ellos */

div.multimedia {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

div.multimedia > span {
  color: #999999;
  font-size: 13px;
  font-family: Poppins;
  font-weight: 500;
  word-wrap: break-word;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo {
  border-radius: 6px;
  border: 0.5px #363855 dashed;
  border-width: 2px;
  box-sizing: border-box;
  padding: 12px 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
}

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
  margin: 0px;
  color: black;
  font-size: 22px;
  font-family: Poppins;
  font-weight: 500;
  line-height: 32px;
  word-wrap: break-word;
}

/* Estilo para el texto dentro del botón de añadir una foto, 
asegurando que el texto sea legible y coherente con el diseño */
.add-photo > span {
  color: #c2c2c2;
  font-size: 18px;
  font-family: Poppins;
  font-weight: 600;
  line-height: 40px;
  word-wrap: break-word;
}
</style>
