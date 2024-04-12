<template>
    
    <form class="formulario" id="" @submit.prevent="">
        <h2 class="titulo-form">Datos de Contrato</h2>
        
        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros?.tipocontrato" 
                        :requerido="formularioRequerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Nivel de Estudio" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="NivelEstudio" 
                        :options="parametros?.nivelestudio" 
                        :requerido="formularioRequerido"
                        optionsSelected="Seleccionar"  
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TerminoContrato"
                        :options="parametros?.terminocontrato" 
                        :requerido="formularioRequerido"
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
                :requerido="formularioRequerido"
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
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import InputCheckbox from '@/components/inputs/Input-Checkbox.vue';
    import {reactive, ref, defineProps, watch} from 'vue'

    const props = defineProps({
        ID_Empleado: {
            type: [String, Number],
            default: 0
        },
        parametros: {
            type: Object,
            default: {}
        }
    });

    const formularioRequerido = ref(false);

    //variables del formaulario 1
    const TipoDeContrato = ref('');
    const NivelEstudio = ref('')
    const TerminoContrato = ref('');
    const FechaContratacion = ref('');
    const FechaFinalizacionContrato = ref('');
    const SalarioBase = ref('');
    const UnidadSueldo =ref('')
    const MontoSalario = ref('');


    // payload de las peticiones
    const payload = reactive({


        user_id: '',
        sociedad_id: '',
        dias_descanso: '',
    });

    //actualizar datos del payload
    const ActualizarPayload = (propiedad, valor) => {
        payload[propiedad] = valor;
        formularioRequerido.value = Object.values(payload).some(value => value !== "")
    };

    const ListaDiasLibres = ref([]);
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

