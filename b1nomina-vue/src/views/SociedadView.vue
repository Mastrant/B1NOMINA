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
        <div  class="sociedadView-fondo-cards">
            <div v-for="(item) in SociedadesAccesibles" :key="item.id">
                <CardSociedad  :data="item"/> 
            </div>    
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
                {id: 1, name: 'Sociedad 1', icon:''},
                {id: 2, name: 'Sociedad 2', icon:''},
                {id: 3, name: 'Sociedad 3', icon:''},
            ]
        }
    },

    //al momento de crear el componente verifica el toquen y pide las sociedades disponibles
    async mounted() {
        if(localStorage.getItem('token')){
            await axios.get(`/user/${localStorage.getItem('userId')}`, { headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                console.log(res)
            })
            .catch( error => {
                console.log(error)
            })
        }else{
            this.$router.push("/login")
        }
    },
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