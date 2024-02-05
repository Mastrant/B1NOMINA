<template>    
        <nav class="aside " id="aside" @mouseleave="desplegarMenu=false">
            <div class="head">
                <div class="profile" v-show="desplegarMenu">
                    <LogoTextVue />
                </div>
                <MenuButton @click="desplegarMenu = !desplegarMenu"/>
            </div>

            <div class="contend">
                <!--Botones superiores-->
                <div class="contend1">
                    <div class="options" v-for="modulo in listaModulos2" :key="modulo.idModulo">
                        <!--Dashboard-->
                        <NavButton v-if="modulo.asignado" @mouseover="cambiarEstado(modulo.idModulo)" >
                            <template #direccion>
                                <router-link :to="modulo.urlModulo">
                                    <CuboIcon />
                                    <span v-show="desplegarMenu">{{modulo.nombreModulo}}</span>
                                </router-link>
                                <div v-show="(showText==modulo.idModulo)">
                                    {{modulo.nombreModulo}}
                                </div> 
                            </template>               
                        </NavButton>
                    </div>
                    <div class="options">     
                        <!--Empleados-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="empleados">
                                    <TwoPersonIcon />
                                    <span v-show="desplegarMenu">Empleados</span>
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Eventos-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="eventos">
                                    <TableIcon />
                                    <span v-show="desplegarMenu">Eventos</span>
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Informes-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="informes">
                                    <AjustesIcon />
                                    <span v-if="desplegarMenu">Informes</span>
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
                                <router-link to="notificaciones">
                                    <CampanaIcon />
                                    <span v-if="desplegarMenu">
                                        Notificaciones
                                        <CantidadNotificaciones num="5"/>
                                    </span>
                                </router-link>
                            </template>
                        </NotificationButton>
                        <!-- Soporte y Asistencia-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="/help">
                                    <HelpCircleIcon />
                                    <span v-if="desplegarMenu">Soporte y Asistencia</span>
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Configuración-->
                        <NavButton>
                            <template #direccion>
                                <router-link to="configuracion">
                                    <TuerquitaIcon />
                                    <span v-if="desplegarMenu">Configuración</span>
                                </router-link>
                            </template>
                        </NavButton>
                    </div>
                </div>
            </div>

            <!--Parte inferior del navegados-->

            <!--Si el panel esta desplegado despliega esta parte-->
            <div class="perfil" v-if="desplegarMenu">
                <Avatar class="Avatar" @click="seleccion"/>
                <div class="perfil-text" >
                    <span class="text-perfil text-perfil-1">Nombre de Empresa</span>
                    <span class="text-perfil">Rut 0102030405</span>
                </div>
                <div v-if="desplegarMenu">
                    <TresPuntosIcon v-model="showOptios"/>
                </div>           
            </div>
            <!--Si el panel esta recogido despliega esta parte-->
            <div class="perfil-hidden" v-else>
                <Avatar class="Avatar" @click="seleccion"/>
            </div>
            <div v-show="showOptios">
                opciones mostrar
            </div> 
        </nav>       
</template>

<script setup>
// Componentes
import LogoTextVue from './logos/Logo-text.vue';
import MenuButton from './botones/Menu-button.vue';
import NavButton from './botones/Nav-button.vue';
import NotificationButton from './botones/Notification-button.vue';
import CantidadNotificaciones from './CantidadNotificaciones.vue';

//Iconos

import CuboIcon from './icons/Cubo-icon.vue';
import TwoPersonIcon from './icons/TwoPerson-icon.vue';
import TableIcon from './icons/Table-icon.vue';
import AjustesIcon from './icons/Ajustes-icon.vue';
import CampanaIcon from './icons/Campana-icon.vue';
import HelpCircleIcon from './icons/HelpCircle-icon.vue';
import TuerquitaIcon from './icons/Tuerquita-icon.vue';
import TresPuntosIcon from './icons/TresPuntos-icon.vue';

//Redireccion
import { useRouter } from 'vue-router';
const router = useRouter();

//AVATAR
import Avatar from './avatars/Avatar1.vue'

//axios
import axios from 'axios';

// Generar reactividad del componente
import {onMounted, ref, toRefs} from 'vue';

//controla si se a acionado el desplegar menú
const desplegarMenu = ref(false)

//Controla el texto mostrado al pasar el mouse
const { showOptios} = ref()

const showText = toRefs
//al pasar el mouse por el navegador
const cambiarEstado = (id) => {
    console.log(id)
    showOptios.value = id
    console.log(showOptios)
};

//valor por defecto
const listaModulos2 = ref([
{
    "idModulo": 1,
    "nombreModulo": "DashBoard",
    "urlModulo": "dashboard",
    "iconoModulo": "",
    "asignado": true,
  },
]);

//solicita los modulos disponibles
const OptenerModulos = () => {
    return axios.get(`user/${localStorage.getItem('userId')}/asignated_modules`, localStorage.getItem('userId'))
    .then(
        (respuesta) => {
            //asigna el valor de la consulta a la lista de modulos
            listaModulos2.value =respuesta.data
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )
}

//al selecionar el avatar
const seleccion = () => {
    //al selecionar
    router.push('/sociedad')
}

//al momento de  montar el componente
onMounted(() => {
    //ejecuta la peticion
    OptenerModulos()
});


</script>

<style scoped>

.aside {
    z-index: 5;
    height: 100%;
    width: fit-content;
    padding: 0 17.75px;
    background-color: #1A245B;
    color: #CDE0F1;
    justify-content: space-between;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-sizing: border-box;
}
.head {
    margin-top: 40px;
    display: flex;
    align-items: center;
    height: 52.5px;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 12px;
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


div.perfil {
    
    display: flex;
    justify-content: center;
    padding: 24px 0px;
    align-items: center;
    border-radius: 8px;
    border: 2px #4E5FBD solid;
    background: #1A2771;
    color: #CDE0F1;
    margin: 48px 0px;
    box-sizing: content-box;
    width: 100%;
    justify-content: space-evenly;

}

div.perfil-hidden{
    margin: 48px 0px;
    display: flex;
    justify-content: center;
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

.Name-page a {
    color: #1A2771;
    text-decoration: none;

}

.Avatar {
    cursor: pointer;
}

</style>