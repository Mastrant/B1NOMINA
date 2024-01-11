<template>
    <div class="cardsociedad">
        <div class="cardsociedad-body">
            <h3 class="cardsociedad-titulo">{{ data.name }}</h3>
            <img class="cardAvatar" :href="data.icon" alt="ICON sociedad">
            <router-link class="cardsociedad-button" :to="`/sociedad/${data.id}/dashboard`">
                    Iniciar Sección
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          
        }
    },
    props: [
        'data'
    ],
}
</script>

<style scope>

div.cardsociedad {
    padding: 48px; 
    background: white; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); 
    border-radius: 6px; 
    border: 1px #363855 solid;
    flex-direction: column;
    justify-content: center;
    align-items: flex;
    gap: 12px;
    display: inline-flex;
    width: 220px;
    height: 200px;
    margin: 24px;
}

.cardsociedad-body {
    max-width: 220px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cardsociedad h3.card-titulo {
    color: black;
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    word-wrap: break-word;
    margin-bottom: 12px;
    margin: 0;
    height: 34px;
    align-items: center;
}

.cardsociedad-button{
    width: 160px;
    height: 50px;

    background: #1A2771;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    display: inline-flex;

    /* tipografia*/
    color: #F8F8F8;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    text-decoration:none;
}

img.cardAvatar {
    width: 96px;
    height: 96px;
}

</style>