<template>
    <form class="formulario" id="Form3" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros.tipocontrato" 
                        :requerido="RequiereActualizar"
                        :preseleccion="TipoDeContrato"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Nivel de Estudio" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="NivelEstudio" 
                        :options="parametros?.nivelestudio" 
                        :requerido="RequiereActualizar"
                        :preseleccion="NivelEstudio"
                        optionsSelected="Seleccionar"  
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TerminoContrato"
                        :options="parametros.terminocontrato" 
                        :requerido="RequiereActualizar"
                        :preseleccion="TerminoContrato"
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
                @update:modelValue="FechaContratacion = $event"
                :requerido="RequiereActualizar"
            />
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Finalizacion de contrato"
                v-model="FechaFinalizacionContrato"
                @update:modelValue="FechaFinalizacionContrato = $event"
                :Deshabilitar="TerminoContrato == 0"
                :requerido="TerminoContrato != 0"
            />
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Salario base" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="parametros.tiposalario" 
                        :requerido="RequiereActualizar"
                        :preseleccion="SalarioBase"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Unidad Sueldo Base" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="UnidadSueldo" 
                        :options="parametros.unidadessueldo" 
                        :requerido="false"
                        :preseleccion="UnidadSueldo"
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

        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="parametros.sede" 
                        :requerido="RequiereActualizar"
                        :preseleccion="SedeDeTrabajo"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="parametros.departamento" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Departamento"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Cargo" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Cargo" 
                        :options="parametros.cargos" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Cargo"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="parametros.grupos" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Grupo"
                        optionsSelected="Sin Asignar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="verEstado"
                        Objid="Teletrabajo"
                        Texto="Teletrabajo"
                        Tipo="individual"
                        :Estado="(EstatusModalidad)? true :false"
                        :requerido="RequiereActualizar"
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
import InputLinealDescripcion from  '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from  '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from  '@/components/Layouts/LayoutInputLineal.vue';
import InterruptorButton from  '@/components/inputs/Interruptor-button.vue';
import InputCheckbox from  '@/components/inputs/Input-Checkbox.vue';

import axios from "axios";
import { ref, watch, reactive, defineProps, defineEmits, inject, onMounted} from 'vue';

// Define las propiedades que el componente espera recibir. En este caso, se espera una propiedad llamada EmpleadoID de tipo Number.
const props = defineProps({
    EmpleadoID: {
       type: [Number, String], // Especifica que el tipo de la propiedad es Number
       default: null
    },
    parametros: {
        type: Object,
        default: {}
    },
    Informacion: {
        type: Object,
    }
});
// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta"
]);



const idSociedad = inject('IDsociedad');

const verEstado = (valor) => {
    (valor == true)
        ? Modalidad.value = 1
        : Modalidad.value = 0
}

//inicialiacion de las varables
const RequiereActualizar = ref(false)

//variables del formaulario 1
const TipoDeContrato = ref('');
const NivelEstudio = ref('')
const TerminoContrato = ref('');
const FechaContratacion = ref('');
const FechaFinalizacionContrato = ref('');
const SalarioBase = ref('');
const UnidadSueldo =ref('')
const MontoSalario = ref('');
//variables del formularo 2
const SedeDeTrabajo = ref('');
const Departamento = ref('');
const Cargo = ref('');
const Grupo = ref('');
const Modalidad = ref('');
const EstatusModalidad = ref(false);
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
const payload_old = reactive({

    tipo_contrato: '',
    nivel_estudio_id: '',
    termino_contrato: '',
    fecha_inicio: "",
    fecha_fin: "",
    periodo_salario: '',
    unidad_sueldo: "",
    salario_base: '',
    hora_ingreso: '',
    hora_egreso: '',
    jefatura: '',


    sede_id: '',
    departamento_id: '',
    cargo_id: '',    
    grupo_id: '',
    modalidad: '',

    user_id: '',
    sociedad_id: '',
    dias_descanso: '',

});

// payload de las peticiones
const payload = reactive({

    tipo_contrato: '',
    nivel_estudio_id: '',
    termino_contrato: '',
    fecha_inicio: "",
    fecha_fin: "",
    periodo_salario: '',
    unidad_sueldo: "",
    salario_base: '',
    hora_ingreso: '',
    hora_egreso: '',
    jefatura: '',


    sede_id: '',
    departamento_id: '',
    cargo_id: '',    
    grupo_id: '',
    modalidad: '',

    user_id: '',
    sociedad_id: '',
    dias_descanso: '',

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
    const camposIguales = Object.keys(payload_old).every(key => payload_old[key] === payload[key]);

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}


// Observar cambios en la variable
watch(TipoDeContrato, (nuevoValor) => ActualizarPayload('tipo_contrato', Number(nuevoValor)));
watch(NivelEstudio, (nuevoValor) => ActualizarPayload('nivel_estudio_id', nuevoValor));
watch(TerminoContrato, 
    (nuevoValor) => {
        ActualizarPayload('termino_contrato', Number(nuevoValor));
        if(nuevoValor == 0) {
            ActualizarPayload('fecha_fin', '1990-01-01')
        
        }
    }
);
watch(FechaContratacion, (nuevoValor) => ActualizarPayload('fecha_inicio', nuevoValor));
watch(FechaFinalizacionContrato, (nuevoValor) => ActualizarPayload('fecha_fin', nuevoValor));
watch(SalarioBase, (nuevoValor) => ActualizarPayload('periodo_salario', Number(nuevoValor)));
watch(UnidadSueldo, (nuevoValor) => ActualizarPayload('unidad_sueldo', String(nuevoValor)));
watch(MontoSalario, (nuevoValor) => { ActualizarPayload('salario_base', Math.abs(nuevoValor))});
watch(SedeDeTrabajo, (nuevoValor) => ActualizarPayload('sede_id', Number(nuevoValor)));
watch(Departamento, (nuevoValor) => ActualizarPayload('departamento_id', Number(nuevoValor)));
watch(Cargo, (nuevoValor) => ActualizarPayload('cargo_id', Number(nuevoValor)));
watch(Grupo, (nuevoValor) => ActualizarPayload('grupo_id', Number(nuevoValor)));
watch(Modalidad, (nuevoValor) => ActualizarPayload('modalidad', Number(nuevoValor)));

watch(() => props.Informacion, (nuevoValor) => { MostrarValores(nuevoValor)});

const resetForm = () => {
    TipoDeContrato.value = '';
    TerminoContrato.value = '';
    FechaContratacion.value = '';
    FechaFinalizacionContrato.value = '';
    SalarioBase.value = '';
    MontoSalario.value = '';
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
    /*
    Object.keys(payload2).forEach(key => {
        payload[key] = '';
    });*/
}

defineExpose({
    resetForm,
})
const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {
    //console.log(DATA)
    // Variables del formulario 1
    TipoDeContrato.value = (DATA?.termino_contrato_id == null) ? '' : DATA?.termino_contrato_id;
    NivelEstudio.value = (DATA?.nivel_estudio == null) ? '' : DATA?.nivel_estudio;
    TerminoContrato.value = (DATA?.termino_contrato_id == null) ? '' : DATA?.termino_contrato_id;
    FechaContratacion.value = (DATA?.fecha_inicio == null) ? '' : DATA?.fecha_inicio;
    FechaFinalizacionContrato.value = (DATA?.FechaFinalizacionContrato == null) ? '' : DATA?.FechaFinalizacionContrato;
    
    SalarioBase.value = (DATA?.SalarioBase == null) ? '' : DATA?.SalarioBase;
    UnidadSueldo.value = (DATA?.UnidadSueldo == null) ? '' : DATA?.UnidadSueldo;
    MontoSalario.value = (DATA?.salario_base == null) ? '' : DATA?.salario_base;

    // Variables del formulario 2
    SedeDeTrabajo.value = (DATA?.id_sede == null) ? '' : DATA?.id_sede;
    Departamento.value = (DATA?.Departamento == null) ? '' : DATA?.Departamento;
    Cargo.value = (DATA?.id_cargo == null) ? '' : DATA?.id_cargo;
    Grupo.value = (DATA?.id_grupo == null) ? '' : DATA?.id_grupo;
    Modalidad.value = (DATA?.Modalidad == null) ? '' : DATA?.Modalidad;
    EstatusModalidad.value = (DATA?.EstatusModalidad == null) ? false : DATA?.EstatusModalidad;
}

const crearDatoslaborales = async (ID_USERMASTER, Data) => {
    await axios.post(`create_datos_laborales?userCreatorId=${ID_USERMASTER}`,Data)
    .then(
        // Maneja la respuesta exitosa.
        res => {
        // Verifica si la respuesta tiene un estado HTTP 201 (Creado).
        if (res.status == 201){
            // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
            emit("respuesta", {'texto':res?.data?.message, 'valor':true})
            // Llama a la función NextModal pasando el ID del nuevo usuario.
            NextModal(props.EmpleadoID);
        }            
        }
    )
    .catch(
        // Maneja los errores de la solicitud.
        err => {
            ////console.log(err)
            // Verifica si la respuesta del error contiene un objeto de respuesta.
            if (err) { 
                // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
                if (err?.status == 422){
                    emit({'texto': "no se puede procesar la solcitud", 'valor':false});
                }else if (err.response.status == 521) {
                    actualizadDatosLaborales(Data)
                }  else {
                    // Imprime el error completo.
                    console.error(err?.response);
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                    emit("respuesta", {'texto':err?.response?.data?.message, 'valor':false})                    
                }                                   
            }
        }
    );
}

const actualizadDatosLaborales = async (Data) => {
    console.log("actualizar datos")
    if(Data){
        await axios.put(`datos_laborales/${props.EmpleadoID}/update`,Data)
        .then(
            // Maneja la respuesta exitosa.
            (res) => {
                // Verifica si la respuesta tiene un estado HTTP 200 (OK).
                if (res.status == 200 || res.status == 201 ) {
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.                    
                    emit("respuesta", { texto: res.data?.message, valor: true });
                    NextModal(props.EmpleadoID);
                } else {
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
                    emit("respuesta", { texto: res, valor: true });
                    NextModal(props.EmpleadoID);
                }

            }
        )
        .catch(
            // Maneja los errores de la solicitud.
            (err) => {
                console.log(err)
                // Verifica si la respuesta del error contiene un objeto de respuesta.
                if (err.response) {
                    // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
                    if (err.status == 422) {
                        emit("respuesta", {texto: "no se puede procesar la solcitud", valor: false });
                    } else {
                        // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                        emit("respuesta", { texto: err.response.data.message, valor: false });
                    }                    
                }
            }
        );
    }
}

const getData = async (ID_empleado) => {
    return new Promise(async (resolve, reject) => {
        if (ID_empleado != null && ID_empleado >= 0) {
            try {
                // Solicita los datos personales
                const respuesta =  await axios.get(`/user/${ID_empleado}/datos_labores`)
                //console.log(respuesta)
                if (respuesta) {
                    //console.log(respuesta)
                    // Resuelve la promesa con true si hay datos
                    resolve({ success: true, data: respuesta.data });
                } else {
                    //console.log(respuesta)
                    // Resuelve la promesa con false si no hay datos
                    resolve({ success: false, data: {} });
                }
            } catch (error) {
                //console.log(error)
                if (error?.response?.status == 404) {
                    // Resuelve la promesa con false si no hay datos
                    resolve({ success: false, data: {} });
                } else {
                    // Rechaza la promesa si hay un error distinto de 404
                    reject(error);
                }
            }
        } else {
            // Rechaza la promesa si el ID es inválido
            reject(new Error('ID de empleado inválido'));
        }
    });
}

 
/**
 * Funcion emitida al enviar el formulario
 * 
 * @params {payload} Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {  
    console.log(payload)
/*
        //si uno de los payload tiene cambios
        if (Object.values(payload).some(value => value !== "")){
            //verifica que el id pasado sea diferente de nulo y mayor que 0
            if (props.EmpleadoID != null && props.EmpleadoID > 0) {

                //Almacena si hay datos Laboras o no del usuario en el sistema
                console.log(payload)
                let respuestaGetData = await getData(props.EmpleadoID);

                // Recuperar el objeto como una cadena de texto y convertirlo de nuevo a un objeto
                let ID_USUARIO = JSON.parse(localStorage.getItem('userId'));
                
                //console.log(respuestaGetData?.success)

                if(respuestaGetData.success != null){

                    if(respuestaGetData.success == true){
                        let DataLaborales = respuestaGetData.data
                        //actualizar datos laborales
                    } else {
                        if(ID_USUARIO > 0){
                            payload.user_id = props.EmpleadoID                        
                            payload.sociedad_id = Number(idSociedad)
                            
                            if (ListaDiasLibres.value.length >= 1) {
                                payload.dias_descanso = ListaDiasLibres.value.join(",")
                            } else {
                                payload.dias_descanso = '6,7';
                            }

                            if (payload.modalidad == ''){
                                payload.modalidad = 0
                            }

                            payload.hora_ingreso = "08:00";
                            payload.hora_egreso = "18:00";
                            payload.jefatura = 0;

                            crearDatoslaborales(ID_USUARIO, payload)

                        } else {
                            console.error("usuario no autorizado")
                        }                    
                    }
                } else {
                    emit("nextModal", {"texto":"error al verificar los datos del empleado", "valor": false})
                }

                
            } else {
                emit("respuesta", {'texto':"Error al validar el ID del usuario", 'valor':false})  
            }
        } else {//no hay modificaciones en los payloads
            NextModal(props.EmpleadoID)
        }

*/
};



onMounted(() => {
  MostrarValores(props.Informacion);
  console.log(props.Informacion)
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
    color: black;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>
