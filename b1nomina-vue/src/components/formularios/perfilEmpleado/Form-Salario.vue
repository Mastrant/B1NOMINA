<template>    
    <form class="formulario" id="" @submit.prevent="">
        <h2 class="titulo-form">Datos Laborales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="{}" 
                        :requerido="false"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="formularioRequerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="UnidadSueldo" 
                        :options="{}" 
                        :requerido="false"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
            <InputLinealDescripcion 
                Placeholder="$..." 
                Titulo="Valor del salario" 
                v-model="MontoSalario"
                @update:modelValue="MontoSalario = $event"
                :requerido="formularioRequerido"
                Tipo="Number"
            />
        </div>
    </form>    
</template>

<script setup>
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';

    import {reactive, ref, defineProps, watch} from 'vue'

    const props = defineProps({
        ID_Empleado: {
            type: [String, Number],
            default: 0
        },
        parametos: {
            type: Object,
            default: {}
        }
    });

    const formularioRequerido = ref(false)

    // payload de las peticiones
    const payload = reactive({        
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


    //actualizar datos del payload
    const ActualizarPayload = (propiedad, valor) => {
        payload[propiedad] = valor;
        formularioRequerido.value = Object.values(payload).some(value => value !== "")
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
    color: #1A2771;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>
