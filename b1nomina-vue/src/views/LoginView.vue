<template>
    <main>
        <section class="login-section">
            <div class="login-box">
                <InfoLogin />
            </div>

            <div class="contend-actionsLogin">
                <div class="login-box">
                    <ActionsLogin/>
                </div> 
            </div>
        </section>
    
    </main>
</template>

<script setup>
import InfoLogin from '@/components/InfoLogin.vue';
import ActionsLogin from '@/components/ActionsLogin.vue'

onMounted(() => {
    this.$router.replace('Login')
}),

</script>

<style scoped>
.login-section {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: auto;
    align-items: center;

}

div.contend-actionsLogin {
    width: 100%;
    justify-content: center;
    display: flex;
}

.login-box {
    justify-content: center;
    width: 70%;
    height: 100vh;
}
</style>