<template>
    
    <form class="formulario" id="Actualizar-CentralizacionCamposAdicionales" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>
        
        <div class="row-form" >
            <InputLinealDescripcion
                Placeholder="Ingrese texto" 
                :Titulo="parametros.camposadicionales[0].nombre" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="RequiereActualizar"
                Tipo="String"
            />
            <InputLinealDescripcion
            Placeholder="Ingrese texto" 
                :Titulo="parametros.camposadicionales[1]?.nombre" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="RequiereActualizar"
                Tipo="String"
                :Deshabilitar="parametros.camposadicionales[1].estado"
            />
            
        </div>
        <div class="row-form" >
            <InputLinealDescripcion
            Placeholder="Ingrese texto" 
                :Titulo="parametros.camposadicionales[2]?.nombre" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="RequiereActualizar"
                Tipo="String"
            />
            <InputLinealDescripcion
                
                Placeholder="Ingrese texto" 
                :Titulo="parametros.camposadicionales[3]?.nombre" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="RequiereActualizar"
                Tipo="String"
            />
            
        </div>
        
        <div class="row-form cut">
            <InputLinealDescripcion
            Placeholder="Ingrese texto" 
                :Titulo="parametros.camposadicionales[4]?.nombre" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="RequiereActualizar"
                Tipo="String"
            />
        </div>
        <div class="row-form cut">
            <LayoutInputLineal textLabel="Grupo de centralización" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="variable" 
                        :options="parametros?.variable" 
                        :requerido="false"
                        optionsSelected="Seleccionar"
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

import {reactive, ref, watch, inject, onMounted, defineEmits} from 'vue';

import peticiones from '@/peticiones/p_empleado';

const DatosUsuario = reactive(inject('dataEmpleado'))
const parametros = reactive(inject('parametros'))


console.log(parametros.value.camposadicionales)

const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

const ShowCampo1 = ref(false)
const ShowCampo2 = ref(false)
const ShowCampo3 = ref(false)
const ShowCampo4 = ref(false)
const ShowCampo5 = ref(false)

const variable = ref('');

const RequiereActualizar = ref(false)

// payload de las peticiones
const payload = reactive({        

});

// payload de las peticiones
const payload_old = reactive({        

});

const PeriodoSalario = ref('');
watch(PeriodoSalario, (nuevoValor) => ActualizarPayload('salario_base', nuevoValor));

const UnidadSueldo = ref('')
watch(UnidadSueldo, (nuevoValor) => ActualizarPayload('unidad_sueldo', nuevoValor));

watch(DatosUsuario, (nuevaInfo) => {
    MostrarValores(nuevaInfo)        
})

const MostrarValores = (DATA) => {
    RequiereActualizar.value = false;
    // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
    PeriodoSalario.value = (DATA?.periodo_sueldo == null)? '' :DATA?.periodo_sueldo;
    payload_old.salario_base = DATA?.periodo_sueldo ?? '';
    payload.salario_base = DATA?.periodo_sueldo ?? '';

}

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

verificarCambios();

};

// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every( key => payload_old[key] == payload[key]);

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}

const MostrarCampos = (ListaCampos) => {
    console.log(ListaCampos[0].estado == 1)
    
    ShowCampo1.value = ListaCampos[0]?.estado == 0
    /*
    ShowCampo2.value = ListaCampos.1?.activo == 1
    ShowCampo3.value = ListaCampos[0]?.activo == 1
    ShowCampo4.value = ListaCampos[0]?.activo == 1
    ShowCampo5.value = ListaCampos[0]?.activo == 1
    */
}

onMounted(async () => {
    await MostrarValores(DatosUsuario.value)
});

MostrarCampos(parametros.value?.camposadicionales)

const emit = defineEmits([
    'respuestaServidor',
]);

/**
* Funcion emitida al enviar el formulario
* @params payload Contiene los datos que se pasaran
* Ejecuta la peticion con axios
*/
const Enviar = async () => {
//si ID es nulo crea un usuario

    if (RequiereActualizar.value == true) {
        const respuesta = await peticiones.ActualizarSalario(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
        if(respuesta.success == true){
            emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
        } else {
            console.error(respuesta?.error)
            emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false})
        }

    } else {
    emit('respuestaServidor', {'texto': "No se requiere actualizar", 'valor':true});
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

div.row-form.cut {
    max-width: 48.5%;
}


</style>
