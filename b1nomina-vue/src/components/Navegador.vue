<template>
        <ASide class="aside " id="aside">
            <div class="head">
                <div class="profile">
                    <LogoTextVue />
                </div>
                <MenuIconvue />
            </div>

            <div class="contend">
                <!--Botones superiores-->
                <div class="contend1">
                    <div class="options">
                        <!--Dashboard-->
                        <NavButton>
                            <template #direccion>
                                <CuboIcon />
                                <router-link to="">
                                    Dashboard
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Gestion de Nomina-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="">
                                    "icon"
                                    Gestión de Nómina
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Empleados-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="">
                                    "icon"
                                    Empleados
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Eventos-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="">
                                    "icon"
                                    Eventos
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Informes-->
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
                <!--Botones inferiores-->
                <div class="contend2">
                    <div class="options">
                        <!--Notificaciones-->
                        <NotificationButton>
                            <template #direccion>
                                <router-link to="">
                                    "icon"
                                    Notificaciones
                                </router-link>
                            </template>
                            <template #notification>
                                <CantidadNotificaciones num="5"/>
                            </template>
                        </NotificationButton>
                        <!-- Soporte y Asistencia-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="">
                                    "icon"
                                    Soporte y Asistencia
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Configuración-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="">
                                    "icon"
                                    Configuración
                                </router-link>
                            </template>
                        </NavButton>
                    </div>
                </div>
            </div>
            
            <div class="perfil">
                <img class="avatar" id="avatar"  alt="avatar">
                <div class="perfil-text">
                    <span class="text-perfil text-perfil-1">Nombre de Empresa</span>
                    <span class="text-perfil">Rut 0102030405</span>
                </div>
                <div>
                <img  class="icon icon-options dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Cambiar Sociedad</a></li>
                    <li><a class="dropdown-item" href="../login/login.html">Cerrar sesión</a></li>
                </ul>
                </div>            
            </div>
        </ASide>       
</template>

<script>
import LogoTextVue from './logos/Logo-text.vue';
import MenuIconvue from '@/components/icons/Menu-icon.vue';
import NavButton from './botones/Nav-button.vue';
import NotificationButton from './botones/Notification-button.vue';
import CantidadNotificaciones from './CantidadNotificaciones.vue';

//Iconos

import CuboIcon from './icons/Cubo-icon.vue';
import DolarIconBlanco from './icons/Dolar-icon-blanco.vue';
import TwoPersonIcon from './icons/TwoPerson-icon.vue';

export default {
    components: {
        LogoTextVue,
        MenuIconvue,
        NavButton,
        NotificationButton,
        CantidadNotificaciones,

        CuboIcon,
        DolarIconBlanco,
        TwoPersonIcon,


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
    height: 100%;
    width: 300px;
    padding: 0 17.75px;
    background-color: #1A245B;
    color: #CDE0F1;
    justify-content: space-between;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-sizing: content-box;
}
.head {
    margin-top: 40px;
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
div.contend {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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