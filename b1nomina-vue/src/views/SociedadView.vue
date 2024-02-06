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
        <listaSociedades v-if="autorizado" :sociedades="SociedadesAccesibles"/> 
    </div> 
</template>

<script>
import axios from 'axios';
import { defineAsyncComponent } from 'vue';


export default {
    //componentes
    components:{
        listaSociedades: defineAsyncComponent(()=> new Promise(
            (resolve) => {
                setTimeout(
                    () => {
                        resolve(import("@/components/listas/Lista-sociedades.vue"))
                    }, 1000//tiempo de carga
                )
            }
        ))
    },
    data() {
        return {
            //data de las sociedades
            SociedadesAccesibles: [{}],
            autorizado: {
                type: Boolean,
                default: false
            }
        }
    },
    methods: {
        //realiza una comprobacion del token ingresado
        async validateToken(TOKEN) {
            await axios.post(`/validate?token=${TOKEN}`)

            .then( respuesta => {
                //si es authorizado devuelve verdadero
                if (respuesta.status==201 || respuesta.status==202){
                    return true
                }
            })
            //captura el error
            .catch( error => {
                return false
            })
        },
        //solicita las sociedades a las que puede acceder el usuario por su id
        async solicitarSociedad() {
            await axios.get('/list_sociedad')
            .then( res => {
                this.SociedadesAccesibles = res.data
            })
            .catch( error => {
                (error.status == 403)?location.reload():console.log(""); 
                console.log(error + ' peticion de datos')
                //si la peticion da error recarga la pagina
                window.location.reload()
            })
        }
    }, 
    //al momento de crear el componente verifica el toquen y pide las sociedades disponibles
    async mounted() {
        
        // Verifica que el token existe y si este es valido
        if(localStorage.getItem('token') != null && this.validateToken(`${localStorage.getItem('token')}`)){
            
            this.autorizado = true;
            

            this.solicitarSociedad()

        }else{
            //elimina el token y devuleve al login
            this.autorizado = false;
            this.$router.push("login")
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