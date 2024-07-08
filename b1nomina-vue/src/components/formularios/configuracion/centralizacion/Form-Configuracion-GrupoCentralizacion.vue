<template>
    <form class="formulario" :id="FormID" @submit.prevent="Enviar">
        <p>
            Ingresa los parámetros y cuentas que determinarán lo valores en tu centro de costos.
        </p>

        <div class="row">
            <LayoutInputBorder textLabel="Validar eventos según" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="validacionEvento"
                    :options="parametros.regiones"
                    :requerido="RequiereActualizar"            
                    :preseleccion="validacionEvento"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Porcentaje"
                Titulo="% Tope cuota prestamo"
                name="TopeCuotaPrestamo"
                v-model="TopeCuotaPrestamo"
                @update:modelValue="TopeCuotaPrestamo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Porcentaje"
                Titulo="% Max. anticipo"
                name="Documento"
                v-model="PorcentajeAnticipo"
                @update:modelValue="PorcentajeAnticipo = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
            
        </div>
        
        <h4> Cuentas contables </h4>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Remunera"
                name="Remunera"
                v-model="Remunera"
                @update:modelValue="Remunera = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="AFP"
                name="AFP"
                v-model="AFP"
                @update:modelValue="AFP = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Previsión Salud"
                name="previsionSalud"
                v-model="previsionSalud"
                @update:modelValue="previsionSalud = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Gratificacion"
                name="Gratificacion"
                v-model="Gratificacion"
                @update:modelValue="Gratificacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="H. Extra"
                name="H.Extra"
                v-model="H_Extra"
                @update:modelValue="H_Extra = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="AFC"
                name="AFC"
                v-model="AFC"
                @update:modelValue="AFC = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Movilización"
                name="Movilizacion"
                v-model="Movilizacion"
                @update:modelValue="Movilizacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Colación"
                name="Colacion"
                v-model="Colacion"
                @update:modelValue="Colacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Otra Asignación"
                name="O_asignacion"
                v-model="O_asignacion"
                @update:modelValue="O_asignacion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            
        </div>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="SIS"
                name="SIS"
                v-model="SIS"
                @update:modelValue="SIS = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Mutual"
                name="Mutual"
                v-model="Mutual"
                @update:modelValue="Mutual = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Inpuesto único"
                name="I_unico"
                v-model="I_unico"
                @update:modelValue="I_unico = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            
        </div>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Asig. Familiar"
                name="Asig. Familiar"
                v-model="A_familiar"
                @update:modelValue="A_familiar = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Asig. Familiar x Pagar"
                name="A_Familiar_Pagar"
                v-model="A_Familiar_Pagar"
                @update:modelValue="A_Familiar_Pagar = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Imp.único x pagar"
                name="Imp.único x pagar"
                v-model="I_unico_pagar"
                @update:modelValue="I_unico_pagar = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            
        </div>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="AFC x Pagar"
                name="AFC x Pagar"
                v-model="AFC_Pagar"
                @update:modelValue="AFC_Pagar = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar número de cuenta"
                Titulo="Sueldos x Pagar"
                name="Sueldos x Pagar"
                v-model="sueldos_pagar"
                @update:modelValue="sueldos_pagar = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="0"
                :maximo-caracteres="100"
            />
        
            
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";

import { defineProps, ref, reactive, watch, defineEmits, onMounted, inject} from 'vue';

import peticiones_configuracion from '@/peticiones/configuracion/centralizacion.js';

const ID_Sociedad = ref(inject('SociedadID'))
const ID_USERMASTER = ref(localStorage.getItem('userId'))

const props = defineProps({
    FormID: {
        type: Text
    },
    Informacion: {
        type: Object,
        default: {}
    },
    parametros: {
        type: Object,
        default: {}
    },
})


const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const validacionEvento = ref('');
const TopeCuotaPrestamo = ref('');
const PorcentajeAnticipo = ref('');
const Remunera = ref('');
const AFP = ref('');
const previsionSalud = ref('');
const Gratificacion = ref('');
const H_Extra = ref('');
const AFC = ref('');
const Movilizacion = ref('');
const Colacion= ref('');
const O_asignacion= ref('');
const SIS= ref('');
const Mutual= ref('');
const I_unico= ref('');
const A_familiar= ref('');
const A_Familiar_Pagar= ref('');
const I_unico_pagar= ref('');
const AFC_Pagar= ref('');
const sueldos_pagar= ref('');



//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({

});

//Contiene la información a enviar
const payload = reactive({

});

//Escuchar cambios en las variables
watch(validacionEvento, (nuevoValor) => ActualizarPayload('validar_evento', nuevoValor));
watch(TopeCuotaPrestamo, (nuevoValor) => ActualizarPayload('porcentaje_tope_cuota_prestamo', nuevoValor));
watch(PorcentajeAnticipo, (nuevoValor) => ActualizarPayload('porcentaje_maximo_anticipo', nuevoValor));
watch(Remunera, (nuevoValor) => ActualizarPayload('cuenta_remunera_deb', nuevoValor));
watch(AFP, (nuevoValor) => ActualizarPayload('cuenta_AFP_deb', nuevoValor));
watch(previsionSalud, (nuevoValor) => ActualizarPayload('cuenta_salud_deb', nuevoValor));
watch(Gratificacion, (nuevoValor) => ActualizarPayload('cuenta_gratificacion_deb', nuevoValor));
watch(H_Extra, (nuevoValor) => ActualizarPayload('cuenta_horas_ext_deb', nuevoValor));
watch(AFC, (nuevoValor) => ActualizarPayload('cuenta_seg_AFC_deb', nuevoValor));
watch(Movilizacion, (nuevoValor) => ActualizarPayload('cuenta_mov_deb', nuevoValor));
watch(Colacion, (nuevoValor) => ActualizarPayload('cuenta_col_deb', nuevoValor));
watch(O_asignacion, (nuevoValor) => ActualizarPayload('cuenta_otra_asig_deb', nuevoValor));
watch(SIS, (nuevoValor) => ActualizarPayload('cuenta_SIS_deb', nuevoValor));
watch(Mutual, (nuevoValor) => ActualizarPayload('cuenta_mut_deb', nuevoValor));
watch(I_unico, (nuevoValor) => ActualizarPayload('cuenta_impuesto_unico_deb', nuevoValor));
watch(A_familiar, (nuevoValor) => ActualizarPayload('cuenta_asignacion_fami_deb', nuevoValor));
watch(A_Familiar_Pagar, (nuevoValor) => ActualizarPayload('cuenta_asignacion_familiar_cred', nuevoValor));
watch(I_unico_pagar, (nuevoValor) => ActualizarPayload('cuenta_impuesto_unico_cred', nuevoValor));
watch(AFC_Pagar, (nuevoValor) => ActualizarPayload('cuenta_Afc_empresa_cred', nuevoValor));
watch(sueldos_pagar, (nuevoValor) => ActualizarPayload('cuenta_sueldo_pagar_cred', nuevoValor));



//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion, (nuevoValor) => { 
    
  MostrarValores(nuevoValor) 
});


//actualizar datos del payload a enviar
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    verificarCambios();
};

// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every(key => payload_old[key] == payload[key]);

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);

}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

    RequiereActualizar.value = false;


    validacionEvento.value = (DATA?.validar_evento == null)? '' :DATA?.porcentaje_tope_cuota_prestamo;
    payload_old.validar_evento = DATA?.validar_evento ?? '';
    payload.validar_evento = DATA?.validar_evento ?? '';

    // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
    // utilizando '' si DATA?.documento es null.
    TopeCuotaPrestamo.value = (DATA?.porcentaje_tope_cuota_prestamo == null)? '' :DATA?.porcentaje_tope_cuota_prestamo;
payload_old.porcentaje_tope_cuota_prestamo = DATA?.porcentaje_tope_cuota_prestamo ?? '';
payload.porcentaje_tope_cuota_prestamo = DATA?.porcentaje_tope_cuota_prestamo ?? '';

    PorcentajeAnticipo.value = (DATA?.porcentaje_maximo_anticipo == null)? '' :DATA?.porcentaje_maximo_anticipo;
payload_old.porcentaje_maximo_anticipo = DATA?.porcentaje_maximo_anticipo ?? '';
payload.porcentaje_maximo_anticipo = DATA?.porcentaje_maximo_anticipo ?? '';

    Remunera.value = (DATA?.cuenta_remunera_deb == null)? '' :DATA?.cuenta_remunera_deb;
payload_old.cuenta_remunera_deb = DATA?.cuenta_remunera_deb ?? '';
payload.cuenta_remunera_deb = DATA?.cuenta_remunera_deb ?? '';

    AFP.value = (DATA?.cuenta_AFP_deb == null)? '' :DATA?.cuenta_AFP_deb;
payload_old.cuenta_AFP_deb = DATA?.cuenta_AFP_deb ?? '';
payload.cuenta_AFP_deb = DATA?.cuenta_AFP_deb ?? '';

    previsionSalud.value = (DATA?.cuenta_salud_deb == null)? '' :DATA?.cuenta_salud_deb;
payload_old.cuenta_salud_deb = DATA?.cuenta_salud_deb ?? '';
payload.cuenta_salud_deb = DATA?.cuenta_salud_deb ?? '';

    Gratificacion.value = (DATA?.cuenta_gratificacion_deb == null)? '' :DATA?.cuenta_gratificacion_deb;
payload_old.cuenta_gratificacion_deb = DATA?.cuenta_gratificacion_deb ?? '';
payload.cuenta_gratificacion_deb = DATA?.cuenta_gratificacion_deb ?? '';

    H_Extra.value = (DATA?.cuenta_horas_ext_deb == null)? '' :DATA?.cuenta_horas_ext_deb;
payload_old.cuenta_horas_ext_deb = DATA?.cuenta_horas_ext_deb ?? '';
payload.cuenta_horas_ext_deb = DATA?.cuenta_horas_ext_deb ?? '';

    AFC.value = (DATA?.cuenta_seg_AFC_deb == null)? '' :DATA?.cuenta_seg_AFC_deb;
    payload_old.cuenta_seg_AFC_deb = DATA?.cuenta_seg_AFC_deb ?? '';
    payload.cuenta_seg_AFC_deb = DATA?.cuenta_seg_AFC_deb ?? '';

    Movilizacion.value = (DATA?.cuenta_mov_deb == null)? '' :DATA?.cuenta_mov_deb;
payload_old.cuenta_mov_deb = DATA?.cuenta_mov_deb ?? '';
payload.cuenta_mov_deb = DATA?.cuenta_mov_deb ?? '';

    Colacion.value = (DATA?.cuenta_col_deb == null)? '' :DATA?.cuenta_col_deb;
    payload_old.cuenta_col_deb = DATA?.cuenta_col_deb ?? '';
    payload.cuenta_col_deb = DATA?.cuenta_col_deb ?? '';

    O_asignacion.value = (DATA?.cuenta_otra_asig_deb == null)? '' :DATA?.cuenta_otra_asig_deb;
payload_old.cuenta_otra_asig_deb = DATA?.cuenta_otra_asig_deb ?? '';
payload.cuenta_otra_asig_deb = DATA?.cuenta_otra_asig_deb ?? '';

    SIS.value = (DATA?.cuenta_SIS_deb == null)? '' :DATA?.cuenta_SIS_deb;
payload_old.cuenta_SIS_deb = DATA?.cuenta_SIS_deb ?? '';
payload.cuenta_SIS_deb = DATA?.cuenta_SIS_deb ?? '';

    Mutual.value = (DATA?.cuenta_mut_deb == null)? '' :DATA?.cuenta_mut_deb;
payload_old.cuenta_mut_deb = DATA?.cuenta_mut_deb ?? '';
payload.cuenta_mut_deb = DATA?.cuenta_mut_deb ?? '';

    I_unico.value = (DATA?.cuenta_impuesto_unico_deb == null)? '' :DATA?.cuenta_impuesto_unico_deb;
payload_old.cuenta_impuesto_unico_deb = DATA?.cuenta_impuesto_unico_deb ?? '';
payload.cuenta_impuesto_unico_deb = DATA?.cuenta_impuesto_unico_deb ?? '';

    A_familiar.value = (DATA?.cuenta_asignacion_fami_deb == null)? '' :DATA?.cuenta_asignacion_fami_deb;
   payload_old.cuenta_asignacion_fami_deb = DATA?.cuenta_asignacion_fami_deb ?? '';
   payload.cuenta_asignacion_fami_deb = DATA?.cuenta_asignacion_fami_deb ?? '';

    A_Familiar_Pagar.value = (DATA?.cuenta_asignacion_familiar_cred == null)? '' :DATA?.cuenta_asignacion_familiar_cred;
   payload_old.cuenta_asignacion_familiar_cred = DATA?.cuenta_asignacion_familiar_cred ?? '';
   payload.cuenta_asignacion_familiar_cred = DATA?.cuenta_asignacion_familiar_cred ?? '';

    I_unico_pagar.value = (DATA?.cuenta_impuesto_unico_cred == null)? '' :DATA?.cuenta_impuesto_unico_cred;
    payload_old.cuenta_impuesto_unico_cred = DATA?.cuenta_impuesto_unico_cred ?? '';
    payload.cuenta_impuesto_unico_cred = DATA?.cuenta_impuesto_unico_cred ?? '';

    AFC_Pagar.value = (DATA?.cuenta_Afc_empresa_cred == null)? '' :DATA?.cuenta_Afc_empresa_cred;
payload_old.cuenta_Afc_empresa_cred = DATA?.cuenta_Afc_empresa_cred ?? '';
payload.cuenta_Afc_empresa_cred = DATA?.cuenta_Afc_empresa_cred ?? '';

    sueldos_pagar.value = (DATA?.cuenta_sueldo_pagar_cred == null)? '' :DATA?.cuenta_sueldo_pagar_cred;
    payload_old.cuenta_sueldo_pagar_cred = DATA?.cuenta_sueldo_pagar_cred ?? '';
    payload.cuenta_sueldo_pagar_cred = DATA?.cuenta_sueldo_pagar_cred ?? '';

    
    payload_old.TopeCuotaPrestamo = DATA?.dato ?? '';
    payload.TopeCuotaPrestamo = DATA?.dato ?? '';
}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
    
    if (RequiereActualizar.value == true) {        
        const respuesta = await peticiones_configuracion.ActualizarConfiguracionGrupoCentralizacion(
            ID_USERMASTER.value, ID_Sociedad.value, payload
        );

        if(respuesta.success == true){
            emit('DataNotificacion', {'texto':respuesta?.data?.message, 'valor': true})
        } else {
            console.error(respuesta?.error)
            emit('DataNotificacion', {'texto': respuesta?.error, 'valor': false})
        }
    } else {
        emit('DataNotificacion', {'texto': "No se requiere actualizar", 'valor': true});
    }
};

onMounted(async () => {
    await MostrarValores(props.Informacion)
});

</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
    
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
color: #1A245B;

}

div.row {
    display: flex;
    justify-content: space-between;
    gap:12px;
    box-sizing: border-box;
}


p {
font-size: 16px;
font-weight: 400;
line-height: 26px;
text-align: justified;
margin: 0;
}

</style>