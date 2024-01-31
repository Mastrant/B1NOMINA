<template>
    
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

</template>

<script>
import axios from 'axios';
import cargarSociedad from '@/components/splashscreen/Carga-sociedad.vue'
import { defineAsyncComponent } from 'vue';

export default {
    components:{
        cargarSociedad,
        //componente async
        CardSociedad: defineAsyncComponent(() => new Promise(
            (resolve) => {
                setTimeout(
                    () => {
                        //importacion del componente
                        resolve(import("@/components/CardSociedad.vue"))
                    }, 1100 //tiempo de carga
                )
            }
        ))
    },
    data() {
        return {
            //data de las sociedades
            SociedadesAccesibles: []
        }
    },
    methods: {
        solicitarSociedad(){
            //si es valido solicita la lista de sociedades segun el usuario
            axios.get('/list_sociedad')
            .then( res => {
                //guarda la lista de dicionarios en la lista Sociedades accesibles definida
                this.SociedadesAccesibles = res.data
            })
            .catch( error => {
                //muestra el error al consultar las sociedades
                console.log(error + 'peticion de datos')
            })
        }
    },
    async mounted() {
        await this.solicitarSociedad()
    },
}


</script>