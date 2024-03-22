<template>
    <div class="contend">
        <div class="foto-empleado">
            <slot name="Imagen"></slot>
            
            <button class="edit">

            </button>
        </div>
        <div class="acciones">
            <span>
                <slot name="Rol"></slot>
            </span>
            <h2>
                <slot name="Nombre"></slot>
            </h2>
            <p>
                <slot name="Cargo"></slot>
            </p>
            <div class="botones">
                <slot name="Botones">

                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
div.contend {
    padding: 24px; 
    background: white; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); 
    justify-content: flex-start; 
    align-items: center; 
    gap: 24px; 
    display: inline-flex;
    width: 100%;
    max-height: 230px;
    box-sizing: border-box;
    gap: 12px;
}

div.foto-empleado {
    position: relative;
    width: 10rem;
    height: 10rem;
    max-width: 10rem;
    max-height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999999px;
    border: #1A245B solid 1px;
    z-index: 1;
}

button.edit {
    position: absolute;
    z-index: 2;
    top: 112px; /* Posiciona el elemento 20px desde el borde superior del ancestro posicionado más cercano */
    left: 111px; /* Posiciona el elemento 30px desde el borde izquierdo del ancestro posicionado más cercano */
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background-color: #1A245B;
}

div.acciones {
    flex-grow: 1;
    box-sizing: border-box;
    gap: 12px;
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

div.acciones > div.info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
    align-items: stretch;
}

div.acciones > span {
    margin: 0;
    width: fit-content;
    box-sizing: border-box;
    padding: 4px 8px;
    background: rgba(42, 227, 116, 0.50); 
    border-radius: 6px; 
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    gap: 10px; 
    display: inline-flex;

    color: rgba(0, 0, 0, 0.60);
    font-size: 13.46px;
    font-weight: 500; 
    line-height: 19.23px; 
    word-wrap: break-word;
}

div.acciones > h2 {
    color: black;
    font-size: 24px;
    font-family: Poppins; 
    font-weight: 500; 
    line-height: 34px; 
    word-wrap: break-word;
    margin: 0;
}

div.acciones > p {
    margin: 0;
    color: black; 
    font-size: 13.46px; 
    font-weight: 500; 
    line-height: 19.23px; 
    word-wrap: break-word;
}

.botones {
    background: white;
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
    height: 49px;
    align-items: center;
    justify-content: start;
}
</style>