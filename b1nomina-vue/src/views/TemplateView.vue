<template>
    <!--Componente de acomodo de datos-->
    <LayoutCore>
        <!--Componente que contiene la pagina que se muestra segun la ruta navegada-->
        <template #body>
            <RouterView />
        </template>
        <!--Mantiene el navegador del lado derecho de la vista principal de la ruta-->
        <template #nav>
            <NavegadorVue />                 
        </template>
    </LayoutCore>
</template>

<script>
//importar componentes
import NavegadorVue from '@/components/Navegador.vue';
import LayoutCore from '@/components/Layouts/LayoutCore.vue';
import axios from 'axios';

export default {
    //componentes utilizados
    components: {
        NavegadorVue,
        LayoutCore,
    },
    //al montar el componente
    async mounted() {
        //si el token existe y la validacion en TRUE
        if(localStorage.getItem('token') && this.validateToken(`${localStorage.getItem('token')}`) ){
            //realizar peticiones
            console.log("pagina de persona")
        }else{
            //eliminar el token generado y enviar al login
            this.$router.push("/login")
        }
    },
    //metodos
    methods: {
        // funcion para realizar peticion y valiodar el token  optenido
        async validateToken(TOKEN) {
            //realiza la peticion POST a la api y envia el token 
            await axios.post(`/validate?token=${TOKEN}`)
            .then( respuesta => {
                //si es autorizado devuelve true
                if (respuesta.status==201){
                    return true
                }
            })
            .catch( error => {
                //muestra el error
                console.log(error)
                return false
                
            })
            //si no se logra la peticion devuelve false
            return false
        }
    }, 
    }
</script>
