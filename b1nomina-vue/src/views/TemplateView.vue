<template>
    <LayoutCore>
        <template #body>
            <RouterView />
        </template>
        <template #nav>
            <NavegadorVue />                 
        </template>
    </LayoutCore>
</template>

<script>
import NavegadorVue from '@/components/Navegador.vue';
import LayoutCore from '@/components/Layouts/LayoutCore.vue';
import axios from 'axios';

export default {
        components: {
        NavegadorVue,
        LayoutCore,
    },
    async mounted() {
        if(localStorage.getItem('token') && this.validateToken(`${localStorage.getItem('token')}`) ){
            console.log("pagina de persona")
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

<style scoped>
</style>