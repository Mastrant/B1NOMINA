<template>
        <ASide class="aside " id="aside">
            <div class="contend1">
                <div class="head">
                    <div class="profile">
                        <LogoTextVue />
                    </div>
                    <MenuIconvue />
                </div>


                <div class="options">
                    <NavButton>
                        <template #direccion>
                            <router-link to="">
                                "icon"
                                Dashboard
                            </router-link>
                        </template>
                    </NavButton>

                    <NavButton>
                        <template #direccion>
                            <router-link to="">
                                "icon"
                                Gestión de Nómina
                            </router-link>
                        </template>
                    </NavButton>

                    <NavButton>
                        <template #direccion>
                            <router-link to="">
                                "icon"
                                Empleados
                            </router-link>
                        </template>
                    </NavButton>
                    <NavButton>
                        <template #direccion>
                            <router-link to="">
                                "icon"
                                Eventos
                            </router-link>
                        </template>
                    </NavButton>
                    <NavButton>
                        <template #direccion>
                            <router-link to="">
                                "icon"
                                Informes
                            </router-link>
                        </template>
                    </NavButton>
                    
                </div>   
            </div>
    
            <div class="contend2">
                <div class="options">

                    <div class="contend-option">
                        <a href="">
                            <img class="icon">
                            <span class="option">Notificaciones <span class="badge bg-secondary">12</span></span>
                        </a>
                    </div>
                    <div class="contend-option">
                        <a href="">
                            <img class="icon" >
                            <span class="option">Soporte y Asistencia</span>
                        </a>
                    </div>
                    <div class="contend-option">
                        <a href="../configuracion/configuracion.html">
                            <img class="icon" >
                            <span class="option">Configuración</span>
                        </a>
                    </div>
                </div>
            </div>
        </ASide>       
</template>

<script>
import LogoTextVue from './logos/Logo-text.vue';
import MenuIconvue from '@/components/icons/Menu-icon.vue';
import NavButton from './botones/Nav-button.vue';

export default {
    components: {
        LogoTextVue,
        MenuIconvue,
        NavButton,
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

.aside {
    z-index: 5;
    height: 90%;
    width: 300px;
    padding: 40px 17.75px;
    background-color: #1A245B;
    color: #CDE0F1;
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.4s ease;
    display: flex;
}

.head {
    display: flex;
    align-items: center;
    height: 52.5px;
    justify-content: space-between;
    margin-bottom: 32px;
}

.head > img {
    cursor: pointer;
}

.profile img {
    display: flex;
    width: 188.978px;
    height: 34.514px;
    padding: 1px 0px;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
}

.buscar {
    position: relative;
    width: auto; 
    margin-bottom: 32px;   
}

.shearh {
    box-sizing: border-box;
    padding: 15px 16px 15px 35px;
    height: 52px;
    font-size: 16px;

    border-radius: 8px;
    border: 2px #4E5FBD solid;
    background: #1A2771 !important;
    color: #CDE0F1;
    width: 100%;
}

.shearh::placeholder {
    color: #CDE0F1; 
}

.input-icon {
    color: #191919;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
}

.options div {
    display: flex;    
    align-items: center;
    padding: 14px;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 1.1rem;
    font-size: 16px;
}

.options div:hover {
    background-color: #1A2771;
    transition: all 0.3s ease-in-out;
}

.options img {
    margin-right: 16px;
}

.options a {
    font-family: 'Poppins' , helvetica;
    color: #CDE0F1;
    text-decoration: none;
}

.perfil {
    display: flex;
    justify-content: center;
    padding: 24px 16px;
    align-items: center;
    border-radius: 8px;
    border: 2px #4E5FBD solid;
    background: #1A2771;
    color: #CDE0F1;
    width: 100%;
    margin-top: 32px;

}

.avatar {
    margin-right: 16px;
    cursor: pointer;
}

.text-perfil {
    font-size: 12px;
}

.text-perfil-1 {
    font-size: 14px;
}

.perfil-text {
    display: flex;
    flex-direction: column;
}

.icon {
    height: 20.5px;
    width: 20.5px;
    cursor: pointer;
}

/* AL cerrar el menú */

.aside.activate {
    width: 88px;
    transition: all 0.4s ease;
}

.aside.activate .option,
.aside.activate .profile,
.aside.activate .perfil-text,
.aside.activate .icon-options {
    display: none;
}

.aside.activate .perfil {
    border-style: none;
    background: none;
}

.aside.activate .head img,
.aside.activate .perfil img,
.aside.activate .icon {
    margin: auto;
}

.aside.activate .contend-option,
.aside.activate .head {
    border-radius: 8px;
}

.aside.activate .head {
    background-color: #1A2771;
}

.Name-page a {
    color: #1A2771;
    text-decoration: none;

}

</style>