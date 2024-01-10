<template>
    <div v-for="sociedad in SociedadesAccesibles" :key="sociedad.id">
        <router-link :to="`/sociedad/${sociedad.name}/dashboard`">
             {{ sociedad.name }}
        </router-link>

        
    </div>
    <article>
       <router-view />

    </article>
</template>

<script>
export default {
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
    methods() {
        
        console.log(this.$route.params.sociedadId)
        
    }
}
</script>

<style scope>

</style>