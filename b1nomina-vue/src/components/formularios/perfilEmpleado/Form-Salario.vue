<template>    
    <form class="formulario" id="" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Salario Base" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="{}" 
                        :requerido="RequiereActualizar"            
                        :preseleccion="tipoDocumentoSelect" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
            <LayoutInputLineal textLabel="Unidad Sueldo Base" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="UnidadSueldo" 
                        :options="{}" 
                        :requerido="RequiereActualizar"            
                        :preseleccion="tipoDocumentoSelect" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
            <InputLinealDescripcion 
                Placeholder="$..." 
                Titulo="Valor del salario" 
                v-model="MontoSalario"
                @update:modelValue="MontoSalario = $event"
                :requerido="RequiereActualizar"
                Tipo="Number"
            />
        </div>
    </form>    
</template>

<script setup>
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';

    import {reactive, ref, watch, inject, onMounted} from 'vue';

    const DatosUsuario = reactive(inject('dataEmpleado'))
    const parametros = reactive(inject('parametros'))
    const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));


    const RequiereActualizar = ref(false)

    // payload de las peticiones
    const payload = reactive({        
        periodo_salario: '',
        unidad_sueldo: '',
        salario_base: '',
    });
    
    // payload de las peticiones
    const payload_old = reactive({        
        periodo_salario: '',
        unidad_sueldo: '',
        salario_base: '',
    });

    const SalarioBase = ref('');
    watch(SalarioBase, (nuevoValor) => ActualizarPayload('periodo_salario', Number(nuevoValor)));
    
    const UnidadSueldo = ref('')
    watch(UnidadSueldo, (nuevoValor) => ActualizarPayload('unidad_sueldo', String(nuevoValor)));

    const MontoSalario = ref('');
    watch(MontoSalario, (nuevoValor) =>  ActualizarPayload('salario_base', Math.abs(nuevoValor)));

    const MostrarValores = (DATA) => {
        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        SalarioBase.value = (DATA?.salario_base == null)? '' :DATA?.salario_base;
        payload_old.documento = DATA?.salario_base ?? '';
        payload.documento = DATA?.salario_base ?? '';
        
        UnidadSueldo.value = (DATA?.rut == null)? '' :DATA?.rut;
        payload_old.documento = DATA?.rut ?? '';
        payload.documento = DATA?.rut ?? '';
        
        MontoSalario.value = (DATA?.salario_base == null)? '' :DATA?.rut;
        payload_old.documento = DATA?.salario_base ?? '';
        payload.documento = DATA?.salario_base ?? '';

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
    const camposIguales = Object.keys(payload_old).every(key => payload_old[key] === payload[key]);

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}

    onMounted(() => {
        console.log(DatosUsuario.value);
        console.log(parametros);
    })

    /**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {
  //si ID es nulo crea un usuario
 
  if (RequiereActualizar) {

  }
};

onMounted(() => {
  MostrarValores(DatosUsuario.value)
});
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
