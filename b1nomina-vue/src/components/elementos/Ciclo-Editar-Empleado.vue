<template>
    <TemplateModal 
    
    >
        <template>
            <div>
                <form v-if="true"></form>
                <form v-if="true"></form>
                <form v-if="true"></form>
                <form v-if="true"></form>
                <form v-if="true"></form>
                <form v-if="true"></form>                
                <form v-if="true"></form>
            </div>
        </template>
    </TemplateModal>
</template>

<script setup>
    //componentes
    import TemplateButton from '@/components/botones/Template-button.vue';
    import TemplateButton2 from '@/components/botones/Template-button2.vue'
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    //formularios
    import FormDatosBasicos from '@/components/formularios/Form-datosBasicos.vue';
    import FormDatosPersonalesVue from '@/components/formularios/Form-datosPersonales.vue';
    import FormDatosLaborales from '@/components/formularios/Form-datosLaborales.vue';
    import FormDatosPago from '@/components/formularios/Form-datosPago.vue';
    import FormImportacionMasiva from '@/components/formularios/Form-ImportacionMasiva.vue'

    //librerias
    import { ref, onMounted, reactive, toRefs, watch, inject  } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const DatosUsuario = reactive(inject('dataEmpleado'))

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

    //variable con el valor del formulario a mostrar
    const idFormularioActivo = ref(1);

    //parametros formularios
    const parametrosDP = ref({
        nacionalidad: [],
        estadocivil: [],
        regiones: [],
        localidad: [],
    });
    const parametrosDL = ref({
        tipocontrato: [],//
        terminocontrato: [],//
        tiposalario: [], //
        sede: [],//
        departamento: [],//
        cargos: [],//
        grupos: [],//
        nivelestudio: [],//
        unidadessueldo: [],

    });    
    const parametrosDPa = ref({
        bancos: [],        
    });
    
    // Realiza una solicitud GET a la API para obtener parámetros
    const pedirParametros = async () => {
        axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`)
        .then(
            (respuesta) => {              
                // Verifica y procesa los parámetros recibidos para cada categoría
                // Asegúrate de que las propiedades existan dentro de 'respuesta.data.parametros'

                // Mapeo de claves de respuesta.data.parametros a propiedades de destino
                const mapeoParametros = {
                    nacionalidad: 'nacionalidad',
                    estadocivil: 'estadocivil',
                    regiones: 'regiones',
                    localidad: 'localidad',
                    bancos: 'bancos',
                    tipocontrato: 'tipocontrato',
                    terminocontrato: 'terminocontrato',
                    tiposalario: 'tiposalario',
                    sede: 'sede',
                    departamentos: 'departamento',
                    cargos: 'cargos',
                    grupos: 'grupos',
                    unidadessueldo: 'unidadessueldo',
                    nivelestudio: 'nivelestudio'
                };

                // Función para asignar valores a los objetos de destino
                function asignarValores(parametros, objetoDestino) {
                    for (const clave in parametros) {
                        if (parametros.hasOwnProperty(clave) && mapeoParametros[clave]) {
                            const propiedadDestino = mapeoParametros[clave];
                            if (objetoDestino[propiedadDestino]) {
                                objetoDestino[propiedadDestino].push(...parametros[clave]);
                            }
                        }
                    }
                }

                // Asignación de valores
                asignarValores(respuesta.data.parametros, parametrosDP.value);
                asignarValores(respuesta.data.parametros, parametrosDPa.value);
                asignarValores(respuesta.data.parametros, parametrosDL.value);
            }
        )
        .catch(
            err => {
                // Maneja errores de la solicitud
                //console.log(err)
            }
        )
    }

// al montar el componente ejecuta las funciones
onMounted(async () => {
    await pedirParametros(); //solicita los parametros para crear usuarios
});
</script>

