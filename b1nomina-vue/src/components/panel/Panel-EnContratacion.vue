<template>
    <div class="panel-inactivos">
        <AddUserEnContratacion  v-show="show"/>
        
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch 
                    v-model="shearch" 
                    @update:modelValue="shearch = $event" />
            </div>
        </div>

        <!--tabla con los datos-->
        <div class="cuerpo-tabla">
            <span class="NoEncontrado" v-if="(ListaEmpleados.length < 1)? true : false"
            >
                No hay datos asociados a los filtros
            </span>

            <EnContratacion v-else :listaEmpleados="ListaEmpleados"  
            />
            <AlertShort
                ref="notificacionStatus"
            />
        </div>
    </div>
</template>

<script setup>
import AddUserEnContratacion from '@/components/Add-User-enContratacion.vue';
import EnContratacion from '@/components/tablas/Empleados/EnContratacion.vue';
import InputShearch from '@/components/inputs/Input-shearch.vue';
import AlertShort from '@/components/alertas/Alert-short-template.vue';

import {ref, inject, watch, onMounted, toRef} from 'vue';
import axios from 'axios';

const show = ref(false)

// Inyectar el valor proporcionado por la url
const idSociedad = inject('IDsociedad');

const shearch = ref('');

const ListaEmpleados = toRef([]);

watch(shearch, (valor) => filtrar(valor));

/**
    * Solicita a la API los datos de los empleados y los almacena en el componente ListaTemplate como props.
    *
    * @async
    * @function pedirEmpleados
    * @param parametrosPeticionEmpleados Json con los datos de la consulta
    * @returns {Promise<void>} No devuelve nada, pero actualiza el valor de ListaEmpleados.
    *
    * @example
    * // Llamada a la función para obtener los datos de los empleados
    * pedirEmpleados();
    *
    * @throws {Error} Si ocurre un error durante la solicitud, se asigna un array vacío a ListaEmpleados.
    */
    const pedirEmpleados = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_no_empleados`)
        .then(
            (res) => {
                ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                ListaEmpleados.value = []; // si hay un error asigna un valor vacio
            }
        )
    };

// al montar el componente ejecuta las funciones
onMounted(async () => {
   await pedirEmpleados(); //solicita los empleados
});
</script>

<style scoped>

</style>