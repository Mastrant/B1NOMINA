<template>
    <form class="formulario" id="ActualizarDatosPago" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos de Pago</h2> 
        <div class="row-form">
            <LayoutInputLineal textLabel="Medio de pago" :requerido="RequiereActualizar">
                <template v-slot>
                    <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Transferencia" 
                        id-radius="Transferencia"
                        :valor="1"
                        :class="{ selected: MedioPago == 1 }"
                    />
                   <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Cheque" 
                        id-radius="Cheque"
                        :valor="2"
                        :class="{ selected: MedioPago == 2 }"
                    />
                    <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Al contado" 
                        id-radius="Alcontado"
                        :valor="3"
                        :class="{ selected: MedioPago == 3 }"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form" v-show="Expancion1">
            <LayoutInputLineal textLabel="Banco" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Banco" 
                        :options="Parametros.bancos" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Banco"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

             <!---->
            <LayoutInputLineal textLabel="Tipo de cuenta" :requerido="RequiereActualizar">
                <template v-slot>
                   <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta" 
                        texto="Corriente" 
                        :valor="1"
                        id-radius="CCorriente"  
                        :requerido="RequiereActualizar"                      
                    />
                    <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta"
                        texto="Ahorro"
                        :valor="2"
                        id-radius="CAhorro"  
                        :requerido="RequiereActualizar"  
                    />
                    <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta"
                        texto="Vista"
                        :valor="3"
                        id-radius="CVista"  
                        :requerido="RequiereActualizar"  
                    />
                </template>
            </LayoutInputLineal>            
        </div>

        <div class="row-form " v-show="Expancion1" :requerido="RequiereActualizar">
            <InputLinealDescripcion 
                Placeholder="Ingrese Numero de Cuenta" 
                Titulo="N° Cuenta"
                v-model="NCuenta"
                @update:modelValue="NCuenta = $event"
                :minimo-caracteres="8"
                :requerido="RequiereActualizar"
            />
            <LayoutInputLineal textLabel="Tercero" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="verEstado"
                        Objid="CuentaTercero"
                        Tipo="individual"
                        :Estado="(EstatusTercero == true)? true :false"
                        :requerido="RequiereActualizar"
                        :-texto="(EstatusTercero = true)? 'activo' : 'inactivo'"
                    />
                </template>
            </LayoutInputLineal>

        </div>  

        <h2 v-show="Expancion2" class="titulo-form">Datos de Pago</h2> 

        <p v-show="Expancion2">
            A continuación introduce los datos de terceros para ser validados a través de su correo electrónico y poder autorizar el pago a esta cuenta.
        </p>

        <div class="row-form" v-show="Tercero == 1 && MedioPago == 1">
            <InputLinealDescripcion 
                Placeholder="Nombre y Apellido" 
                Titulo="Nombre y Apellido"
                v-model="NombreTercero"
                @update:modelValue="NombreTercero = $event"
                :requerido="Tercero == 1 && MedioPago == 1"
            />
            <InputLinealDescripcion 
                Placeholder="Ingrese Rut" 
                Titulo="RUT"
                v-model="RutTercero"
                @update:modelValue="RutTercero = $event"
                :minimo-caracteres="3"
                :requerido="Tercero == 1 && MedioPago == 1"
            />
            <InputLinealDescripcion 
                Placeholder="Correo Electrónico" 
                Titulo="Correo Electrónico"
                v-model="emailTercero"
                @update:modelValue="emailTercero = $event"
                :minimo-caracteres="2"
                :requerido="Tercero == 1 && MedioPago == 1"
                -tipo="email"
            />
        </div>

        
    </form>
</template>

<script setup>
import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InputRadioButton from '@/components/botones/Input-Radio-button.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';

import {reactive, ref, watch, inject, onMounted, defineEmits, onBeforeMount} from 'vue';

import peticiones from '@/peticiones/p_empleado';

import almacen from '@/store/almacen';

const DatosUsuario = reactive(inject('dataEmpleado'))
const parametros = reactive(inject('parametros'))
const Parametros = ref({});

const ID_USERMASTER  = ref(almacen?.userID)

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    "respuestaServidor",
]);

// inicializacion de variables reactivas
const MedioPago = ref('');
const Banco = ref('');
const TCuenta = ref('');
const NCuenta = ref('');

const Tercero = ref('');
const EstatusTercero = ref(false);
const NombreTercero = ref('');
const RutTercero = ref('');
const emailTercero = ref('');


const Expancion1 = ref(false)
const Expancion2 = ref(false)

// payload de la peticion
const payload = reactive({
    "banco_id": '',
    "medio": '',
    "tipo_cuenta": '',
    "numero_cuenta": '',
    "user_id": '',
});

const payload_old = reactive({
    "banco_id": '',
    "medio": '',
    "tipo_cuenta": '',
    "numero_cuenta": '',
    "user_id": '',
});

//verifica los campos
const RequiereActualizar = ref(false)

//control de envio
const Hay_cambios = ref(false)

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    if (propiedad == "medio" && (valor == 2 || valor == 3)) {
        //Si el medio es diferente de transferencia, se borran los otros campos al enviar
        verificarMediodePago(valor);
    } else {
        verificarCambios();
    }

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
    RequiereActualizar.value = !(camposIguales);
    Hay_cambios.value = !(camposIguales && !alMenosUnValorVacio)

}

watch(Banco, (nuevoValor) => ActualizarPayload('banco_id', nuevoValor));
watch(MedioPago, (nuevoValor) => {

    console.log(nuevoValor)
    ActualizarPayload('medio', String(nuevoValor))
    if (nuevoValor == 1) {
        Expancion1.value = true
    } else {
        Expancion1.value = false
        Expancion2.value = false
    }
});

watch(TCuenta, (nuevoValor) => ActualizarPayload('tipo_cuenta', Number( nuevoValor)));
watch(NCuenta, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));

watch(Tercero, (nuevoValor) => {
    ActualizarPayload('numero_cuenta', nuevoValor);
    if (Tercero == true){
        Expancion2.value = true
    }
});
watch(EstatusTercero, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));
watch(NombreTercero, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));
watch(NCuenta, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));

watch(() => DatosUsuario.value, 
    (nuevoValor) => {
        MostrarValores(nuevoValor.value);
    }
);

watch(parametros, (nuevaInfo) => {     
        Parametros.value = nuevaInfo
    })

const verificarMediodePago = (medio) => {
    if(medio != 1){
        payload.numero_cuenta = '';
        payload.banco_id = 0;
        payload.tipo_cuenta = 0; 
        RequiereActualizar.value = false;

        payload.terceros = '';
        payload.rut_tercero = '';
        payload_old.email_tercero = '';

    }
}

const verEstado = (valor) => {
    (valor == true)
        ? Tercero.value = 1
        : Tercero.value = 0
}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => { 

    MedioPago.value = (DATA?.medio_pago == null || DATA?.medio_pago.toLowerCase() == 'no asignado' || DATA?.medio_pago == '') ? 1 : DATA?.medio_pago;
    payload_old.medio = (DATA?.medio_pago == null || DATA?.medio_pago == '') ? 1 : DATA?.medio_pago;
    payload.medio = (DATA?.medio_pago == null || DATA?.medio_pago == '') ? 1 : DATA?.medio_pago;

    Banco.value = (DATA?.banco_id == null || DATA?.banco_id == "No Asignado") ? 0 : DATA?.banco_id;
    payload_old.banco_id = Number(DATA?.banco_id == "No Asignado") ?? 0;
    payload.banco_id = Number(DATA?.banco_id) ?? '';

    TCuenta.value =  (DATA?.tipo_cuenta == null) ? 0 : DATA?.tipo_cuenta;
    payload_old.tipo_cuenta = DATA?.tipo_cuenta ?? 0;
    payload.tipo_cuenta = DATA?.tipo_cuenta ?? 0;

    NCuenta.value =  (DATA?.numero_cuenta == null || DATA?.numero_cuenta.toLowerCase() == 'no asignado') ? '0' : DATA?.numero_cuenta;
    payload_old.numero_cuenta = (DATA?.numero_cuenta == null || DATA?.numero_cuenta.toLowerCase() == 'no asignado') ? '0' : DATA?.numero_cuenta;
    payload.numero_cuenta = (DATA?.numero_cuenta == null || DATA?.numero_cuenta.toLowerCase() == 'no asignado') ? '0' : DATA?.numero_cuenta;

    Tercero.value = (DATA?.Tercero == null  || DATA?.Tercero.toLowerCase() == "no tercero")? '0' : DATA?.Tercero;
    payload_old.terceros = (DATA?.Tercero == null  || DATA?.Tercero.toLowerCase() == "no tercero")? '0' : DATA?.Tercero;
    payload.terceros = (DATA?.Tercero == null  || DATA?.Tercero.toLowerCase() == "no tercero")? '0' : DATA?.Tercero;
    
    payload_old.rut_tercero = DATA?.rut_tercero ?? '';
    payload.rut_tercero = DATA?.rut_tercero ?? '';
    
    payload_old.nombre_tercero = DATA?.nombre_tercero ?? '';
    payload.nombre_tercero = DATA?.nombre_tercero ?? '';
    
    payload_old.en_uso = (DATA?.en_uso == null || DATA?.en_uso == "No Asignado") ? 0 : DATA?.en_uso;
    payload.en_uso = (DATA?.en_uso == null || DATA?.en_uso == "No Asignado") ? 0 : DATA?.en_uso;
    
    payload_old.email_tercero = DATA?.email_tercero ?? '';
    payload.email_tercero = DATA?.email_tercero ?? '';
    
    payload_old.user_id = DATA?.user_id ?? '';
    payload.user_id = DATA?.user_id ?? '';

    RequiereActualizar.value = false
    Expancion1.value = (DATA?.medio_pago == null || DATA?.medio_pago.toLowerCase() == 'no asignado' || DATA?.medio_pago == '')? true : false;
    Expancion2.value = (Tercero.value == 1 && MedioPago.value == 1)

}

const Enviar = async () => {
  //si ID es nulo crea un usuario
 
  if (Hay_cambios.value == true) {
    const respuesta = await peticiones?.ActualizarDatosPago(DatosUsuario.value?.user_id, ID_USERMASTER.value, payload);
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


onBeforeMount(() => {
        Parametros.value = parametros.value
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
