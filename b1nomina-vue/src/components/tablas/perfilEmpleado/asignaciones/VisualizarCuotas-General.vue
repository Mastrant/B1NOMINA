<template>
    <!-- Contenedor principal de la tabla -->
    <div class="conted"> 
        <!-- Tabla que contiene los datos de las cuotas de préstamo -->
        <table class="TablaEmpleados">

            <!-- Encabezado de la tabla con nombres de columnas -->
            <tr class="rowTabla encabezado">
                <th>N°</th> <!-- Columna para el número de la cuota -->
                <th>MONTO</th> <!-- Columna para el monto de la cuota -->
                <th>FECHAS DE PAGO</th> <!-- Columna para las fechas de pago -->
                <th>CUOTAS DE PAGO</th> <!-- Columna para las cuotas de pago -->
                <th>ACCIONES</th> <!-- Columna para acciones disponibles -->
            </tr>

            <!-- Componente CuotasPrestamo iterado por cada cuota en listadoCuotas -->
            <CuotasPrestamo v-for="cuota in listadoCuotas" :key="cuota?.id">

                <!-- Plantilla personalizada para mostrar el número de la cuota -->
                <template #row1>           
                    {{ cuota?.numero_cuota }} <!-- Muestra el número de la cuota -->
                </template>

                <!-- Plantilla personalizada para mostrar el monto de la cuota -->
                <template #row2>                        
                    {{ parseFloat(cuota?.monto_cuota?.toFixed(2)) }} $ <!-- Formatea y muestra el monto de la cuota -->
                </template>

                <!-- Plantilla personalizada para mostrar el período de la cuota -->
                <template #row3>                        
                    {{ cuota?.periodo }} <!-- Muestra el período de la cuota -->
                </template>

                <!-- Plantilla personalizada para mostrar el estado de la cuota -->
                <template #row4>                     
                    <!-- Botón de estado que muestra "Por cobrar" si el estado es 0 -->
                    <StatusButton v-show="cuota?.estado == 0"
                        texto="Por cobrar"
                        color1="#1A245B"
                        color2="#CDE0F1"
                    />

                    <!-- Botón de estado que muestra "Pagada" si el estado es 1 -->
                    <StatusButton v-show="cuota?.estado == 1"
                        texto="Pagada"
                    />
                </template>

                <!-- Plantilla personalizada para mostrar acciones disponibles para la cuota -->
                <template #row5>                        
                    <!-- Icono de reloj con texto "Reprogramar" -->
                    <RelojIcon 
                        text="Reprogramar"
                        Stroke="#1A245B"
                    />
                </template>
            </CuotasPrestamo>
        </table>
    </div>
</template>

<script setup>
    // Importa funciones y componentes necesarios de Vue y otros archivos
    import { ref, defineProps, watchEffect } from 'vue';
    import CuotasPrestamo from '@/components/tablas/perfilEmpleado/asignaciones/VisualizarCuotas-row.vue';
    import StatusButton from '@/components/botones/Status-button.vue';
    import RelojIcon from '@/components/icons/Reloj-icon.vue';

    // Define las propiedades que el componente puede recibir desde su padre
    const props = defineProps({
    Listado: {
        type: Array,
        default: () => [] // Proporciona un array vacío como valor predeterminado si no se pasa ninguna lista
    }
    });

    // Crea una referencia reactiva para almacenar y manipular la lista de cuotas
    const listadoCuotas = ref(props.Listado);

    // Observa cambios en las propiedades pasadas al componente y actualiza la referencia reactiva
    watchEffect(() => {
        // Actualiza el valor de la referencia reactiva con el valor actualizado de las propiedades
        listadoCuotas.value = props.Listado;
    });
</script>


<style scoped>
/* Estilos generales para la tabla de empleados */
.TablaEmpleados {
    width: 100%; /* Asegura que la tabla ocupe el ancho completo del contenedor */
    box-sizing: border-box;
    overflow-y: scroll; /* Permite desplazamiento vertical si el contenido excede el alto disponible */
}

/**
 * Contenedor general de la tabla
 * Utiliza Flexbox para organizar elementos en una columna y alinearlos al final
 */
.conted {
    display: flex;
    flex-direction: column;
    justify-content: end; /* Alinea los elementos al final del contenedor */
    gap: 24px; /* Espacio entre elementos dentro del contenedor */
}

/**
 * Estilos para el encabezado de la tabla
 * Define el fondo, borde, y estilos de fuente para el encabezado
 */
.rowTabla.encabezado {
    background: #FCFCFD;
    border-bottom: 0.96px solid #EAECF0;
    color: #667085;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word; /* Permite que el texto se ajuste dentro de las celdas */
}

/**
 * Estilos para las celdas del encabezado
 * Asegura que el texto se ajuste dentro de las celdas sin sobrepasar los límites
 */
th {
    word-break: break-word;
    white-space: nowrap;
}

/**
 * Estilos para la columna de acciones
 * Organiza los elementos de acción en un contenedor flex para centrarlos
 */
.acciones > div {
    display: flex;
    gap: 12px; /* Espacio entre iconos o botones de acción */
    justify-content: center; /* Centrado de iconos o botones de acción */
    white-space: nowrap; /* Evita el salto de línea para iconos o botones de acción */
}
</style>
