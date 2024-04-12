<template>
    <div class="contend">
        
        <div class="elementos">

            <div class="boton-position">
                <slot name="boton1"></slot>
            </div>
            <h3><slot name="titulo1"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-1"></slot></span>
                    <h4><slot name="text-1"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-2"></slot></span>
                    <h4><slot name="text-2"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-3"></slot></span>
                    <h4><slot name="text-3"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-4"></slot></span>
                    <h4><slot name="text-4"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton2"></slot>
            </div>
            <h3><slot name="titulo2"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-5"></slot></span>
                    <h4><slot name="text-5"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-6"></slot></span>
                    <h4><slot name="text-6"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-7"></slot></span>
                    <h4><slot name="text-7"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-8"></slot></span>
                    <h4><slot name="text-8"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton3"></slot>
            </div>
            <h3><slot name="titulo3"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-9"></slot></span>
                    <h4><slot name="text-9"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-10"></slot></span>
                    <h4><slot name="text-10"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-11"></slot></span>
                    <h4><slot name="text-11"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-12"></slot></span>
                    <h4><slot name="text-12"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton4"></slot>
            </div>
            <h3><slot name="titulo4"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-13"></slot></span>
                    <h4><slot name="text-13"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-14"></slot></span>
                    <h4><slot name="text-14"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-15"></slot></span>
                    <h4><slot name="text-15"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-16"></slot></span>
                    <h4><slot name="text-16"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton5"></slot>
            </div>
            <h3><slot name="titulo5"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-17"></slot></span>
                    <h4><slot name="text-17"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-18"></slot></span>
                    <h4><slot name="text-18"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-19"></slot></span>
                    <h4><slot name="text-19"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-20"></slot></span>
                    <h4><slot name="text-20"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton6"></slot>
            </div>
            <h3><slot name="titulo6"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-22"></slot></span>
                    <h4><slot name="text-22"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-23"></slot></span>
                    <h4><slot name="text-23"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-24"></slot></span>
                    <h4><slot name="text-24"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-25"></slot></span>
                    <h4><slot name="text-25"></slot></h4>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
div.contend {
    display: flex;
    flex-direction:row-reverse;
    padding-left: 24px;
    box-sizing: border-box;
}

div.boton-position {
    display: flex;
    width: 100%;
    justify-content: end;
    box-sizing: border-box;
}

div.elementos {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
}

div.row-elementos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    gap: 12px;
    box-sizing: border-box;
    justify-content: space-between;
}

div.row-elementos > div.box {

    width: max-content;
    flex-grow: 1;
}

div.row-elementos > div.box > span {
    color: #363855;
    font-size: 14px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 24px;
    word-wrap: break-word;
}

h3 {
    color: #1A2771;
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    word-wrap: break-word;
    margin: 0;
}

div.row-elementos > div.box > h4 {
    margin: 0;
    color: #000842;
    font-size: 20px;
    font-weight: 400;
    word-wrap: break-word;
}
</style>