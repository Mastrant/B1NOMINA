<template>
    <form class="formulario" id="AddCuenta" @submit.prevent="Enviar">
        <div class="row-form">
            <LayoutInputLineal textLabel="Banco" :requerido=" true">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Banco" 
                        :options="Parametros.bancos" 
                        :requerido=" true"
                        :preseleccion="Banco"
                    />
                </template>
            </LayoutInputLineal>

            <!---->
            <LayoutInputLineal textLabel="Tipo de cuenta" :requerido=" true">
                <template v-slot>
                <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta" 
                        texto="Corriente" 
                        :valor="1"
                        id-radius="CCorriente"  
                        :requerido="true"                      
                    />
                    <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta"
                        texto="Ahorro"
                        :valor="2"
                        id-radius="CAhorro"  
                        :requerido="true"  
                    />
                    <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta"
                        texto="Vista"
                        :valor="3"
                        id-radius="CVista"  
                        :requerido="true"  
                    />
                </template>
            </LayoutInputLineal>            
        </div>
        <div class="row-form " :requerido="true">
            <InputLinealDescripcion 
                Placeholder="Ingrese Numero de Cuenta" 
                Titulo="N° Cuenta"
                v-model="NCuenta"
                @update:modelValue="NCuenta = $event"
                :minimo-caracteres="8"
                :requerido="true"
            />

            <LayoutInputLineal textLabel="Tercero" :requerido="false">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="(value) => {EstatusTercero = value}"
                        Objid="CuentaTercero"
                        Tipo="individual"
                        :Estado="(EstatusTercero == true)? true :false"
                        :requerido="false"
                        :-texto="(EstatusTercero == true)? 'activo' : 'inactivo'"
                    />
                </template>
            </LayoutInputLineal>
        </div>  
        
        <h2 v-show="EstatusTercero == 1" class="subtitulo-form">Datos de terceros</h2> 

        <p class="descripcion" v-show="EstatusTercero">
            A continuación introduce los datos de terceros para ser validados a través de su correo electrónico y poder autorizar el pago a esta cuenta.
        </p>

        <div class="row-form" v-show="EstatusTercero == 1  ">
            <InputLinealDescripcion 
                Placeholder="Nombres y Apellidos" 
                Titulo="Nombres y Apellidos"
                v-model="NombreTercero"
                @update:modelValue="NombreTercero = $event"
                :requerido="EstatusTercero == 1  "
            />

            <InputLinealDescripcion 
                Placeholder="Ingrese Rut" 
                Titulo="Rut"
                v-model="RutTercero"
                @update:modelValue="RutTercero = $event"
                :minimo-caracteres="3"
                :requerido="EstatusTercero == 1  "
            />

            <InputLinealDescripcion 
                Placeholder="Correo Electrónico" 
                Titulo="Correo Electrónico"
                v-model="emailTercero"
                @update:modelValue="emailTercero = $event"
                :minimo-caracteres="2"
                :requerido="EstatusTercero == 1 "
                -tipo="email"
            />
        </div>

        <div class="row-form status">
            <span>
                Autorizacion de cuenta bancaria
            </span>
            <StatusButton />
        </div>
    </form>
</template>

<script setup>
import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InputRadioButton from '@/components/botones/Input-Radio-button.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
import StatusButton from '@/components/botones/Status-button.vue';

import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';

import peticiones from '@/peticiones/p_empleado';

const DatosUsuario = reactive(inject('dataEmpleado'))
const parametros = reactive(inject('parametros'))
const Parametros = ref({});
const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

const payload = reactive({
    banco_id: '',
    tipo_cuenta: '',
    numero_cuenta: '',
    tercero: '0',
    nombre_Tercero: '',
    rut_tercero: '',
    email: '',
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

const Banco = ref('');
const TCuenta = ref('');
const Tercero = ref('');
const NCuenta = ref('');
const EstatusTercero = ref(false);

const NombreTercero = ref('');
const RutTercero = ref('');
const emailTercero = ref('');




watch(Banco, (nuevoValor) => ActualizarPayload('banco_id', nuevoValor));

watch(TCuenta, (nuevoValor) => ActualizarPayload('tipo_cuenta', Number( nuevoValor)));

watch(NCuenta, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));

watch(EstatusTercero, (nuevoValor) => {
    (nuevoValor == 1)
        ? ActualizarPayload('tercero', 1)
        : ActualizarPayload('tercero', 0)

});

watch(NombreTercero, (nuevoValor) => ActualizarPayload('nombre_Tercero', nuevoValor));
watch(RutTercero, (nuevoValor) => ActualizarPayload('rut_tercero', nuevoValor));
watch(emailTercero, (nuevoValor) => ActualizarPayload('email', nuevoValor));



watch(parametros, (nuevaInfo) => {     
    Parametros.value = nuevaInfo
})





const Enviar = async () => {
//si ID es nulo crea un usuario
console.log(payload)
/*

    const respuesta = await peticiones?.ActualizarDatosPago(DatosUsuario.value?.user_id, ID_USERMASTER.value, payload);
    
    if(respuesta.success == true){
        emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
    } else {
        console.error(respuesta?.error)
        emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false})
    }
*/
};


onBeforeMount(() => {
    Parametros.value = parametros.value
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

div.row-form.cut {
    max-width: 48%;
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
h2.subtitulo-form {
    margin-top:  24px;
    color: #1A2771;  
    font-size:  18px;  
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

div.status {

    padding: 32px 16px;
    box-sizing: border-box;
    background: #0974ff2a;
    border-radius: 8px;
    

}
div.status > span {
    color: #1A2771; 
    font-size:  18px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px; 
}
</style>