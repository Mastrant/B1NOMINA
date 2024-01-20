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
                <Suspense>
                    <template #default>
                        <CardSociedad  :name="item.nombre" :id="item.id" :icon="`${item.icon}`"/>
                    </template> 
                    <template  #fallback>
                        <cargarSociedad />
                    </template>
                </Suspense> 
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios';
import cargarSociedad from '@/components/splashscreen/Carga-sociedad.vue'
import { defineAsyncComponent } from 'vue';


export default {
    //componentes
    components:{
        cargarSociedad,
        CardSociedad: defineAsyncComponent(() => new Promise(
            (resolve) => {
                setTimeout(
                    () => {
                        resolve(import("@/components/CardSociedad.vue"))
                    }, 2500 //tiempo de carga
                )
            }
        ))
    },
    data() {
        return {
            SociedadesAccesibles: []
        }
    },


    //al momento de crear el componente verifica el toquen y pide las sociedades disponibles
    async mounted() {
        // Verifica que el token existe y si este es valido
        if(localStorage.getItem('token') && this.validateToken(`${localStorage.getItem('token')}`) ){

            //si es valido solicita la lista de sociedade
            await axios.get('/list_sociedad')
            .then( res => {
                this.SociedadesAccesibles = res.data
            })
            .catch( error => {
                console.log(error)
            })
        }else{
            this.$router.push("/login")
        }
    },
    methods: {
        async validateToken(TOKEN) {
            await axios.post(`/validate?token=${TOKEN}`)
            .then( respuesta => {
                if (respuesta.status==201){
                    return true
                }
            })
            .catch( error => {
                console.log(error)
                return false
                
            })
            return
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