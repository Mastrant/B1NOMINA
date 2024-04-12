<template>
    
    <form class="formulario" id="" @submit.prevent="">
        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="parametros?.sede" 
                        :requerido="formularioRequerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="parametros?.departamento" 
                        :requerido="formularioRequerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Cargo" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Cargo" 
                        :options="parametros?.cargos" 
                        :requerido="formularioRequerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="parametros?.grupos" 
                        :requerido="formularioRequerido"
                        optionsSelected="Sin Asignar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Modalidad" :requerido="formularioRequerido">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="verEstado"
                        Objid="Teletrabajo"
                        Texto="Teletrabajo"
                        Tipo="individual"
                        :Estado="(EstatusModalidad)? true :false"
                        :requerido="formularioRequerido"
                    />
                </template>
            </LayoutInputLineal>
        </div>
    </form>
</template>

<script setup>
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
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

    const SedeDeTrabajo = ref('');
    const Departamento = ref('');
    const Cargo = ref('');
    const Grupo = ref('');
    const Modalidad = ref('');
    const EstatusModalidad = ref(false);


    // payload de las peticiones
    const payload = reactive({
        sede_id: '',
        departamento_id: '',
        cargo_id: '',    
        grupo_id: '',
        modalidad: '',

        user_id: '',
        sociedad_id: '',
        dias_descanso: '',
    });

    const verEstado = (valor) => {
    (valor == true)
        ? Modalidad.value = 1
        : Modalidad.value = 0
}

    //actualizar datos del payload
    const ActualizarPayload = (propiedad, valor) => {
        payload[propiedad] = valor;
        formularioRequerido.value = Object.values(payload).some(value => value !== "")
    };

    
    watch(SedeDeTrabajo, (nuevoValor) => ActualizarPayload('sede_id', Number(nuevoValor)));
    watch(Departamento, (nuevoValor) => ActualizarPayload('departamento_id', Number(nuevoValor)));
    watch(Cargo, (nuevoValor) => ActualizarPayload('cargo_id', Number(nuevoValor)));
    watch(Grupo, (nuevoValor) => ActualizarPayload('grupo_id', Number(nuevoValor)));
    watch(Modalidad, (nuevoValor) => ActualizarPayload('modalidad', Number(nuevoValor)));


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

