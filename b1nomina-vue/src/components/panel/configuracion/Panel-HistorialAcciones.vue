<template>
    <div class="contend">
        <LayoutFondoBorder>
            <template #default>
                <div class="row-shear">
                    <InputShearch v-model="shearch" @update:modelValue="shearch = $event" />
                </div>
                <div>
                    <h3>Historial de cambios realizados a B1 Nómina</h3>
                    <p>
                        El historial de cambios de B1 Nómina fue diseñado para llevar un registro de los cambios efectuados en la configuración del sistema.
                    </p>
                    <HistorialAcciones 
                        :listaAcciones="listado"
                    />
                </div>
            </template>
        </LayoutFondoBorder>               
    </div>
</template>

<script setup>
import LayoutFondoBorder from '@/components/Layouts/LayoutFondoBorder.vue';

import { ref, inject, onMounted, watch } from 'vue';
import InputShearch from '@/components/inputs/Input-shearch.vue';
import peticiones_configuracion_datosEmpresa from '@/peticiones/configuracion/datos_empresa.js';

import HistorialAcciones from '@/components/tablas/configuracion/HistorialAcciones.vue';

// Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('Historial de Acciones');

const ID_Sociedad = ref(inject('SociedadID'))

const listado = ref([]);

//valor ingresado por el usuario
const shearch = ref('')

// Arreglo que contiene el arreglo original
let listadoOriginal = null;

const filtrar = (text) => {
    // Si la lista original no está establecida, guarda la lista actual como la original
        if (listadoOriginal === null) {
            listadoOriginal = [...listado.value];
        }

        // Si el texto es vacío, restablece la lista mostrada a la lista original
        if (text.trim() === '') {
            listado.value = [...listadoOriginal];
            return;
        }

        // Normaliza el texto de búsqueda
        let normalizarText = text?.toLowerCase().trim();

        // Filtra la lista original basándose en el texto de búsqueda
        const filtrado = listadoOriginal.filter(
            (Item) => Item?.nombre_creador?.toLowerCase().includes(normalizarText) ||
            Item?.fecha_registro?.toLowerCase().includes(normalizarText) ||
            Item?.rol_usuario_creador?.includes(normalizarText) ||
            Item?.accion?.toLowerCase().includes(normalizarText) ||
            Item?.observaciones?.includes(normalizarText)
        );

        // Actualiza la lista mostrada con los resultados filtrados
        listado.value = filtrado;
    };

watch(shearch, filtrar);

const SolicitarListadoDeAcciones = async (id = Number) => {
    const respuesta = await peticiones_configuracion_datosEmpresa?.getHistorialDeAcciones(id);
    if (respuesta.success) {
        //console.log(respuesta.data)
        listado.value = respuesta.data;
    } else {
        console.error(respuesta.error)
    }
}

onMounted(async () => {
    await SolicitarListadoDeAcciones(ID_Sociedad.value)
});

</script>

<style scoped>
.contend {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    gap: 12px;
    word-wrap: break-word;
    overflow: scroll;
}

.contend > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

h3 {
    color: black;
    font-size: 22px;
    font-weight: 500;
    line-height: 48px;
    word-wrap: break-word;
    margin: 0;
}

p {
    color: black;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    margin: 0;
}

div.row-shear{
    display: flex;
    justify-content: end;
    width: 100%;
    box-sizing: border-box;
}
</style>