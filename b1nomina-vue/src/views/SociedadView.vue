<template>
    <div class="sociedadView-fondo">
        <div class="sociedadView-fondo-body">
            <h1 class="titulo-sociedadview">Te damos la bienvenida</h1>
            <article>
                <p class="text-sociedadview">
                    Con los perfiles de B1 Nómina, puedes separar todas tus sociedades y configurar tus nóminas, empleados y eventos de forma individual.
                </p>
            </article>
        </div>
        <div class="sociedadView-fondo-cards">
            <CardSociedad  data="holi'"/>
            <CardSociedad  data="holi'"/>
            <CardSociedad  data="holi'"/>
            
        </div>
    </div>
 
</template>

<script>
import axios from 'axios';
import CardSociedad from '@/components/CardSociedad.vue';


export default {
    //componentes
    components:{
        CardSociedad,
    },
    data() {
        return {
            SociedadesAccesibles: [
                {id: 1, name: 1, icon:''},
                {id: 2, name: 2, icon:''},
                {id: 3, name: 3, icon:''},
                {id: 4, name: 4, icon:''},
            ]
        }
    },

    //al momento de crear el componente verifica el toquen y pide las sociedades disponibles
    async created() {
        /*
        const respuesta = await axios.get('validate');
        console.log(respuesta)
        */
    },
    methods() {
        
        console.log(this.$route.params.sociedadId)
        
    }
}
</script>

<style scope>
div.sociedadView-fondo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #E3F5FF;
    align-content: center;
    align-items: center;
}

div.sociedadView-fondo .sociedadView-fondo-body {

    align-items: center;
}

h1.titulo-sociedadview {
    text-align: center;
    color: #1A245B;
    font-size: 32px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word
}


article .text-sociedadview {
    text-align: center;
    color: #333333;
    font-size: 18px;
    font-family: Poppins;
    font-weight: 400;
    word-wrap: break-word;
    max-width: 800px;
}

div.sociedadView-fondo-cards{

    
    display: flex;
    justify-content: space-between;
}
</style>