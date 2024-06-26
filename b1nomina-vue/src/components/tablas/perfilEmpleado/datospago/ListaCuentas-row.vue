<template>
    <tr class="rowTabla cuerpo">
        <!--Nombre y apelidos-->
        <td class="colConcepto">
            <div>
                <slot name="banco"></slot>
            </div>                    
        </td>
        <!--Rut-->
        <td class="">
            <span>
                <slot name="tipoCuenta"></slot>
            </span>
        </td>
        <!--Cargo-->
        <td class="">
            <span class="">
                <slot name="NumeroCuenta"></slot>
            </span>
        </td>
        <!--Saladio / sueldo-->
        <td class="">
            <span>
                <slot name="Tercero"></slot>
            </span>
        </td>
        <td class="">
            <div>
                <slot name="Autorizacion"></slot>
            </div>                    
        </td><td class="">
            <div>
                <slot name="estado"></slot>
            </div>                    
        </td>
        <td class="acciones">
            <div>
                <slot name="ACCIONES"></slot>
            </div>
        </td>
    </tr>
</template>

<script setup>


</script>

<style scoped>

td {
 word-break: break-word;
 white-space: nowrap;
}

/**
 * Estilos para el cuerpo de la tabla
 * Define la altura de las filas y utiliza Flexbox para organizar el contenido
 */
 tr.cuerpo {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-self: end;
}

/**
 * Estilo general para las filas de la tabla
 * Define la altura y el ancho de las filas
 */
tr.rowTabla {
    width: 100%;
    box-sizing: content-box;
    height: 48px;
    display: table-row;
}

/* Estilos para cada celda de la tabla */
tr.cuerpo > td {
    width: auto; /* Ancho automático basado en el contenido */
    height: 48px;
    background: none; /* Sin fondo para una apariencia limpia */
    box-sizing: border-box; /* Para incluir padding y borde en el ancho total */
    padding: 12px; /* Espacio interno para mejorar la legibilidad */
    border:#FCFCFD; /* Borde superior para separar las filas */
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center; /* Centrado verticalmente */
    align-items: center; /* Centrado horizontalmente */
    text-align: center; /* Alineación del texto al centro */
    margin: auto; /* Margen automático para centrar el contenido */
}


/* Estilos para la primera columna, que puede contener checkboxes */
.filaCheckbox {
    max-width: 80px !important; /* Ancho máximo para mantener la consistencia */
    box-sizing: border-box;
    margin: auto; /* Margen automático para centrar */
}

/**
 * Estilos para la columna de nombres de empleados
 * Alinea el texto al inicio y limita el ancho máximo para evitar desbordamientos
 */
td.colConcepto > div {
    text-align: start;
    max-width: 290px;
}


/**
 * Estilos para la columna de estados
 * Utiliza Flexbox para organizar los elementos de estado y centrarlos
 */
td.estado > div {
    display: flex;
    gap: 10px; /* Espacio entre elementos de estado */
    justify-content: center;
    box-sizing: border-box;
    margin: 0px; /* Sin margen para una alineación precisa */
    align-self: center; /* Centrado verticalmente */
    align-items: center; /* Centrado horizontalmente */
    width: auto;
}

/* Estilos para la columna de acciones (iconos) */
.acciones > div {
    display: flex;
    gap: 12px; /* Espacio entre iconos */
    justify-content: center; /* Centrado de iconos */
    white-space: nowrap; /* Evita el salto de línea para iconos */
}

</style>