<template>
    <!--contenedor-->
    <div class="Add-user-button">
            <TemplateModal 
                @closeModal="showModal" 
                :activarModal="mostrarModal"
                :FormId="'Form'+idFormularioActivo"
                :DataNotification="dataNotificacion"
                NombreAccion="Retomar Información" 
                textSubmit="Actualizar"
                :ModalActivo="1"
            >
                <template #default>
                
                    <p class="decripcion-modal">
                        ESTA ES LA CONTINUACION DEL LLENADO DE INFORMACIÒN DEL EMPLEADO
                    </p>
                    
                    <NavForm 
                        :edit="true"
                        :idFormularioActivo="idFormularioActivo"
                        @-show-modal="editModal"
                    />
                    
                    <FormRDatosBasicos 
                        @nextModal="avanzarForm"
                        @respuesta="activarNotificacionModal" 
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :Informacion="Data_Usuario"                 
                        v-if="idFormularioActivo == 1"
                        ref="Form1" 
                    />
                    
                    <FormDatosPersonalesVue 
                        @nextModal="avanzarForm"
                        @respuesta="activarNotificacionModal"
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :parametros="parametrosDP"
                        v-if="idFormularioActivo == 2"
                        ref="Form2"   
                    />
                    
                    <FormDatosLaborales 
                        @nextModal="avanzarForm"
                        @respuesta="activarNotificacionModal"
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :parametros="parametrosDL"
                        v-if="idFormularioActivo == 3"
                        ref="Form3"
                    />

                    <FormDatosPago
                        @closeModal="showModal"
                        @respuesta="activarNotificacionModal"
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :parametros="parametrosDPa"
                        v-if="idFormularioActivo == 4"
                        ref="Form4"
                    />

                </template>
                
                <template #boton>
                    <TemplateButton2 
                        text="Atras" 
                        @click="retrocederForm" 
                        v-show="idFormularioActivo > 1"
                    />        
                </template>
            </TemplateModal>
    </div><!--final contenedor add user-->
</template>

<script setup>
    //componentes
    import TemplateButton2 from '@/components/botones/Template-button2.vue'
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    import NavForm from '@/components/navs/Nav-form.vue'
    //formularios
    import FormRDatosBasicos from '@/components/formularios/enContratacion/Form-R-datosBasicos.vue';
    import FormDatosPersonalesVue from '@/components/formularios/Form-datosPersonales.vue';
    import FormDatosLaborales from '@/components/formularios/Form-datosLaborales.vue';
    import FormDatosPago from '@/components/formularios/Form-datosPago.vue';

    //librerias
    import { ref, onMounted, defineEmits, reactive} from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import peticiones_EnContratacion from '@/peticiones/g_empleado';

    const emit = defineEmits([
        "Notificacion",
    ])

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

    //variable con el valor del formulario a mostrar
    const idFormularioActivo = ref(1);

     //arreglo con la data
    const dataNotificacion = ref({})
    
    const activarNotificacionModal = (DATA) => {
        dataNotificacion.value = DATA //asigna el valor
    }    

    const ID_Empleado_Selecionado = ref('');
    const Data_Usuario = ref({}); // almacena la información de usuario dada por la api

    // Crear referencias a los componentes hijos
    const Form1 = ref(null);
    const Form2 = ref(null);
    const Form3 = ref(null);
    const Form4 = ref(null);

    const limpiarFormularios = () => {
    // Llamar a las funciones de limpieza de cada componente hijo
        Form1.value?.resetForm();
        Form2.value?.resetForm();
        Form3.value?.resetForm();
        Form4.value?.resetForm();
        ID_Empleado_Selecionado.value = null;
    };

    const PedirInfo = async (ID_Empleado) => {
        console.log(ID_Empleado)
        //let respuesta = await peticiones_EnContratacion?.PedirDatosProspecto(ID_Empleado)
        if (true){ //(respuesta.success){
            ID_Empleado_Selecionado.value = ID_Empleado
            //Data_Usuario.value = respuesta.data
            Data_Usuario.value = {
                'documento': '12345678',
                'nombres': 'test',
                'apellidos': 'TEST2',
                'correo': 'EXAPLE@gmail.com',
                'nacionalidad': '1',
                'genero': '1',
                'fechaNacimiento': '1990-01-01',
                'estadoCivil': '1',
                'region': '13',
                'localidad': '13106',
                'direccion': 'alguna dirección dos',
                'telefonoCelular': 'null',
                'telefonoLocal': 'null'
            }
            showModal(1)
        } else {
            ID_Empleado_Selecionado.value = -1;
        }
    }

    const mostrarModal = ref(false)

    const editModal = (idModal) => {
        console.log(idModal)
        idFormularioActivo.value = idModal
    }
    /**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
    const showModal = (Id_modal = 0) => {
        
        mostrarModal.value = !mostrarModal.value;
        if(Id_modal == 1){
            
            if(idFormularioActivo.value != 1 && mostrarModal.value == true){
                showN({
                    'Titulo': "Información Modificada con exito", 
                    'Descripcion': "El proceso de actualización del usuario se ha realizazo con éxito"
                })
            }
            idFormularioActivo.value = 1;
        } else {
            idFormularioActivo.value = 0;
        }
        limpiarFormularios();
    }

    const retrocederForm = () => {
        if(idFormularioActivo.value > 1){
            idFormularioActivo.value--
        }
        
    };

    const avanzarForm = (idEmpleadoCreado) => {
        ID_Empleado_Selecionado.value = idEmpleadoCreado;
        if(idFormularioActivo.value < 4){
            idFormularioActivo.value++
        }
    };

    const showN = (Data) => {
        emit('Notificacion',Data);
    }

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
                const asignarValores = (parametros, objetoDestino) => {
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
                console.error(err?.response.data)
            }
        )
    }

    defineExpose({
        PedirInfo,
    })
    
// al montar el componente ejecuta las funciones
onMounted(async () => {
    await pedirParametros(); //solicita los parametros para crear usuarios
});

</script>