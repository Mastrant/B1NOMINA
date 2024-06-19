<template>
    <header class="Header">
        <router-link class="card-button" :to="{name: RutaName}">            
            <h2 class="Name-page">{{nombrePagina}}</h2>
        </router-link>
    </header>
</template>

<script>
export default {
    name: 'headerPage',
    props: [
        'nombrePagina',
        'RutaName'
    ]
}
</script>

<style scoped>
header.Header {
background: #F8F8F8;
color: #1A2771;
height: 81px;
padding: 20px 30px;
width: 100%;
border-bottom: 2px #CDE0F1 solid;
box-sizing: border-box;
display: flex;
align-items: center;
flex-grow: 1;

}

header.Header > * {
    text-decoration: none;
}

header.Header h2.Name-page {
    color: #1A2771;
    font-size: 28px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;

    
}
</style>